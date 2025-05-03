
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";

interface GalleryProps {
  title: string;
  images: { id: number; url: string; alt: string }[];
  aspectRatio: string;
}

export default function Gallery({ title, images, aspectRatio }: GalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
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
    }, 600); // Match this with your animation duration
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
    }, 600); // Match this with your animation duration
  };

  // Determine the appropriate gap based on viewport width
  const getGapClass = () => {
    return "gap-3 md:gap-4 lg:gap-6";
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
          <h2 className="text-3xl md:text-4xl font-light tracking-wider mb-4">{title}</h2>
          <div className="w-16 h-px bg-white/40"></div>
        </div>
        
        {/* Gallery with navigation */}
        <div className="relative" ref={galleryRef}>
          <div className={cn(
            "grid grid-cols-1 md:grid-cols-3", 
            getGapClass(),
            "transition-all duration-700 transform",
            inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
          )}>
            {images
              .slice(currentIndex * visibleImages, currentIndex * visibleImages + visibleImages)
              .map((image, index) => (
                <div 
                  key={image.id} 
                  className={cn(
                    "overflow-hidden relative group",
                    aspectRatio,
                    "transition-all duration-500 ease-out animate-fade-in",
                  )}
                >
                  <img 
                    src={image.url} 
                    alt={image.alt}
                    loading="lazy"
                    className="w-full h-full object-cover hover-scale"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <p className="text-white text-shadow text-sm md:text-base">{image.alt}</p>
                  </div>
                </div>
              ))}
          </div>
          
          {/* Navigation buttons */}
          {images.length > visibleImages && (
            <>
              <button
                onClick={prevSlide}
                disabled={isAnimating}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 md:-translate-x-6 z-10 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 flex items-center justify-center transition-all backdrop-blur-sm"
                aria-label="Previous images"
              >
                <ChevronLeft size={24} className="text-white/90" />
              </button>
              
              <button
                onClick={nextSlide}
                disabled={isAnimating}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 md:translate-x-6 z-10 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 flex items-center justify-center transition-all backdrop-blur-sm"
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
                    "w-2 h-2 rounded-full transition-all",
                    idx === currentIndex ? "bg-white w-4" : "bg-white/30",
                  )}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
