import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import AboutUs from "@/components/AboutUs";
import Footer from "@/components/Footer";
import { photoCategories } from "@/data/photos";
import { Loader } from "lucide-react";
import Logo from "@/components/Logo";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Set the document title
    document.title = "Franco Loncarica | Fotografía y Video con Drones";
    
    // Loading animation with progress
    const totalTime = 2000; // 2 seconds
    const updateInterval = 20; // Update every 20ms
    const increments = totalTime / updateInterval;
    
    let counter = 0;
    const timer = setInterval(() => {
      counter++;
      setProgress(Math.min(100, Math.floor((counter / increments) * 100)));
      
      if (counter >= increments) {
        clearInterval(timer);
        setLoading(false);
      }
    }, updateInterval);
    
    // Preload key images
    const preloadImages = () => {
      // Get first image from each category for preloading
      const imagesToPreload = photoCategories.map(category => category.images[0]?.url).filter(Boolean);
      
      imagesToPreload.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    };
    
    preloadImages();
    
    // Smooth scroll functionality
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href') || "");
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
    
    return () => {
      clearInterval(timer);
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', function (e) {
          e.preventDefault();
        });
      });
    };
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-drone-black flex items-center justify-center z-50">
        <div className="text-center">
          <div className="mb-8">
            <Logo size="lg" />
          </div>
          
          <div className="w-64 h-1 bg-white/20 rounded-full mb-6 overflow-hidden">
            <div 
              className="h-full bg-white rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="flex items-center justify-center mb-2">
            <Loader size={24} className="text-white animate-spin mr-2" />
            <p className="text-white/80 font-light">Cargando experiencia visual...</p>
          </div>
          
          <p className="text-white/50 text-sm">{progress}%</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-drone-black text-white font-['Montserrat',sans-serif]">
      <Header />
      <Hero />
      
      <main>
        {photoCategories.map((category) => (
          <Gallery 
            key={category.id}
            title={category.title}
            images={category.images}
            aspectRatio={category.aspectRatio}
            mediaType={category.mediaType || "image"}
          />
        ))}
        <AboutUs />
      </main>
      
      <Footer />
    </div>
  );
}

export default Index;
