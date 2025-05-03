
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import AboutUs from "@/components/AboutUs";
import Footer from "@/components/Footer";
import { photoCategories } from "@/data/photos";
import { Loader } from "lucide-react";

const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set the document title
    document.title = "Franco Loncarica | Portfolio";
    
    // Loading animation
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
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
      clearTimeout(timer);
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
          <Loader size={50} className="text-white mx-auto animate-spin mb-4" />
          <h2 className="text-2xl md:text-3xl font-light tracking-widest text-white animate-pulse">
            FRANCO LONCARICA
          </h2>
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
          />
        ))}
        <AboutUs />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
