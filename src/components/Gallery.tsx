
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, X, Video, Image } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface GalleryProps {
  title: string;
  images: { id: number; url: string; alt: string; thumbnailUrl?: string; }[];
  aspectRatio: string;
  mediaType?: "image" | "video";
}

export default function Gallery({ title, images, aspectRatio, mediaType = "image" }: GalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isHovering, setIsHovering] = useState<number | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  const visibleImages = 3;
  const totalSlides = Math.ceil(images.length / visibleImages);
  
  const nextSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % totalSlides;
      return nextIndex;
    });
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 800); // Smoother transition with shorter duration
  };
  
  const prevSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => {
      const nextIndex = (prevIndex - 1 + totalSlides) % totalSlides;
      return nextIndex;
    });
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 800); // Smoother transition with shorter duration
  };

  // Opens the fullscreen image/video viewer
  const openImageViewer = (imageIndex: number) => {
    // For vertical images, don't open the viewer
    if (aspectRatio.includes("aspect-[3328/7936]")) {
      return;
    }
    setSelectedImage(imageIndex);
  };

  // Navigate to previous media in fullscreen viewer
  const prevImage = () => {
    if (selectedImage === null) return;
    setSelectedImage((prev) => (prev === null ? null : (prev - 1 + images.length) % images.length));
  };

  // Navigate to next media in fullscreen viewer
  const nextImage = () => {
    if (selectedImage === null) return;
    setSelectedImage((prev) => (prev === null ? null : (prev + 1) % images.length));
  };

  // Close the fullscreen media viewer
  const closeImageViewer = () => {
    setSelectedImage(null);
  };

  // Determine the appropriate gap based on viewport width
  const getGapClass = () => {
    return "gap-3 md:gap-4 lg:gap-6";
  };

  // Handle keyboard navigation in the image viewer
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (selectedImage === null) return;
    
    if (e.key === "ArrowRight") nextImage();
    else if (e.key === "ArrowLeft") prevImage();
    else if (e.key === "Escape") closeImageViewer();
  };

  // Determine if media is clickable (not for vertical images)
  const isMediaClickable = !aspectRatio.includes("aspect-[3328/7936]");
  
  // Render the appropriate media element (image or video)
  const renderMedia = (url: string, alt: string, index: number, inGallery = true) => {
    const isVideo = mediaType === "video" || url.match(/\.(mp4|webm|ogg)$/i);
    
    if (isVideo) {
      return (
        <video 
          src={url}
          title={alt}
          className="w-full h-full object-cover transition-all duration-700 
                   filter hover:grayscale-0"
          muted
          loop
          playsInline
          autoPlay={!inGallery || isHovering === index}
          controls={!inGallery}
          onMouseOver={(e) => {
            e.currentTarget.play().catch(err => console.log("Video play error:", err));
            setIsHovering(index);
          }}
          onMouseOut={(e) => {
            if (inGallery) {
              e.currentTarget.pause();
              setIsHovering(null);
            }
          }}
        />
      );
    }
    
    return (
      <img 
        src={url} 
        alt={alt}
        loading={inGallery ? "lazy" : "eager"}
        className={cn(
          "w-full h-full object-cover transition-all duration-700",
          inGallery ? "filter grayscale hover:grayscale-0 hover:scale-105" : "grayscale-0 scale-100"
        )}
      />
    );
  };

  return (
    <section 
      id={title.toLowerCase()}
      className="py-24 bg-drone-black relative"
    >
      <div ref={ref} className="container mx-auto px-4">
        {/* Section header */}
        <div className={cn(
          "mb-12 transition-all duration-700 transform",
          inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        )}>
          <h2 className="text-3xl md:text-4xl font-light tracking-wider mb-4 flex items-center">
            {title}
            {mediaType === "video" && <Video size={24} className="ml-2 text-white/70" />}
          </h2>
          <div className="w-16 h-px bg-white/40"></div>
        </div>
        
        {/* Gallery with navigation */}
        <div className="relative" ref={galleryRef}>
          <div className={cn(
            "grid grid-cols-1 md:grid-cols-3", 
            getGapClass(),
            "transition-all duration-700 ease-out", // Smoother transition
            inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
          )}>
            {images
              .slice(currentIndex * visibleImages, currentIndex * visibleImages + visibleImages)
              .map((image, index) => (
                <div 
                  key={image.id} 
                  className={cn(
                    "overflow-hidden relative group",
                    isMediaClickable ? "cursor-pointer" : "cursor-default",
                    aspectRatio,
                    "transition-all duration-700 ease-out animate-fade-in", // Smoother transition
                    "transform hover:z-10", // Slight emphasis on hover
                  )}
                  onClick={() => isMediaClickable && openImageViewer(currentIndex * visibleImages + index)}
                >
                  {renderMedia(image.url, image.alt, index)}
                  
                  {/* Media type indicator */}
                  {mediaType === "video" && (
                    <div className="absolute top-2 right-2 bg-black/50 p-1 rounded-full">
                      <Video size={16} className="text-white" />
                    </div>
                  )}
                </div>
              ))}
          </div>
          
          {/* Navigation buttons */}
          {images.length > visibleImages && (
            <>
              <button
                onClick={prevSlide}
                disabled={isAnimating}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 md:-translate-x-6 z-10 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center transition-all backdrop-blur-sm"
                aria-label="Previous images"
              >
                <ChevronLeft size={24} className="text-white/90" />
              </button>
              
              <button
                onClick={nextSlide}
                disabled={isAnimating}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 md:translate-x-6 z-10 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center transition-all backdrop-blur-sm"
                aria-label="Next images"
              >
                <ChevronRight size={24} className="text-white/90" />
              </button>
            </>
          )}
          
          {/* Pagination indicators */}
          {totalSlides > 1 && (
            <div className="flex justify-center mt-6 space-x-2">
              {Array.from({ length: totalSlides }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => !isAnimating && setCurrentIndex(idx)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-500",
                    idx === currentIndex ? "bg-white w-4" : "bg-white/30",
                  )}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen Media Viewer */}
      <Dialog open={selectedImage !== null} onOpenChange={(open) => !open && closeImageViewer()}>
        <DialogContent 
          className="max-w-[95vw] w-full h-[90vh] p-0 border-none bg-transparent"
          onKeyDown={handleKeyDown}
          aria-describedby="media-viewer-desc"
        >
          {/* Add accessible title and description */}
          <DialogTitle>
            <VisuallyHidden>{selectedImage !== null ? images[selectedImage]?.alt || 'Media viewer' : 'Media viewer'}</VisuallyHidden>
          </DialogTitle>
          <div id="media-viewer-desc" className="sr-only">Gallery media viewer showing full-size media content</div>
          
          <div className="relative w-full h-full flex items-center justify-center">
            {selectedImage !== null && (
              <div className="animate-fade-in w-full h-full flex items-center justify-center">
                {renderMedia(images[selectedImage].url, images[selectedImage].alt, selectedImage, false)}
              </div>
            )}
            
            <button 
              onClick={closeImageViewer}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center transition-all backdrop-blur-sm z-10"
              aria-label="Close image viewer"
            >
              <X size={24} className="text-white/90" />
            </button>
            
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center transition-all backdrop-blur-sm"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} className="text-white/90" />
            </button>
            
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center transition-all backdrop-blur-sm"
              aria-label="Next image"
            >
              <ChevronRight size={24} className="text-white/90" />
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
