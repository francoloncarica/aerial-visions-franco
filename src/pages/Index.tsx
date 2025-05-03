
import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import AboutUs from "@/components/AboutUs";
import Footer from "@/components/Footer";
import { photoCategories } from "@/data/photos";

const Index = () => {
  useEffect(() => {
    // Set the document title
    document.title = "Franco Loncarica | Portfolio";
    
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
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', function (e) {
          e.preventDefault();
        });
      });
    };
  }, []);

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
