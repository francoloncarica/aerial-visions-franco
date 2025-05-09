
import { useEffect, useState, useRef } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import AboutUs from "@/components/AboutUs";
import Footer from "@/components/Footer";
import { photoCategories } from "@/data/photos";
import { Loader } from "lucide-react";
import Logo from "@/components/Logo";
import { toast } from "sonner";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [audioFailed, setAudioFailed] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Set the document title
    document.title = "F.L | Fotografía y Video con Drones";

    // Initialize and attempt to play background music
    const audio = new Audio("/ambient-chillout.mp3"); // Changed extension from mp4 to mp3
    audio.volume = 0.4;
    audio.loop = true;
    audioRef.current = audio;

    const playAudio = async () => {
      try {
        await audio.load(); // Add this to ensure file is loaded before playing
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
          await playPromise;
          console.log("Audio playing successfully during loading");
        }
      } catch (error) {
        console.warn(
          "Autoplay failed. User interaction required to play audio:",
          error
        );
        setAudioFailed(true); // Show fallback button
        toast.error("No se pudo reproducir la música automáticamente", {
          description: "Haz clic en el botón para activar la música"
        });
      }
    };

    playAudio();

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
      const imagesToPreload = photoCategories.map(
        (category) => category.images[0]?.url
      ).filter(Boolean);

      imagesToPreload.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    };

    preloadImages();

    // Smooth scroll functionality
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href") || "");
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
          });
        }
      });
    });

    return () => {
      clearInterval(timer);
      audio.pause();
      audio.currentTime = 0;
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.removeEventListener("click", function (e) {
          e.preventDefault();
        });
      });
    };
  }, []);

  const handlePlayAudio = () => {
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setAudioFailed(false); // Hide fallback button
        toast.success("Música activada");
      }).catch(error => {
        console.error("Error playing audio:", error);
        toast.error("No se pudo reproducir la música", {
          description: "Verifica que el archivo 'ambient-chillout.mp3' existe"
        });
      });
    }
  };

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
            <p className="text-white/80 font-light">
              Cargando experiencia visual...
            </p>
          </div>

          <p className="text-white/50 text-sm">{progress}%</p>

          {audioFailed && (
            <button
              onClick={handlePlayAudio}
              className="mt-4 px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition"
            >
              Activar Música
            </button>
          )}
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
};

export default Index;
