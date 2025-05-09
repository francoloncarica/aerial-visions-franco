
import { useState, useEffect, useRef } from "react";
import { Play, Pause, Instagram, Mail } from "lucide-react";
import Logo from "./Logo";
import { toast } from "sonner";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element with correct path
  useEffect(() => {
    const audio = new Audio();
    audio.src = "/cancion.mp4"; // Changed extension from mp4 to mp3
    audioRef.current = audio;

    // Set audio volume and loop
    audio.volume = 0.4;
    audio.loop = true;

    // Handle audio loading events
    audio.addEventListener("canplaythrough", () => {
      setAudioLoaded(true);
      console.log("Audio loaded successfully");
    });

    audio.addEventListener("error", (e) => {
      console.error("Audio error:", e);
      toast.error("No se pudo cargar la música", {
        description: "Verifica que el archivo 'ambient-chillout.mp3' existe en la carpeta 'public'."
      });
    });

    return () => {
      audio.pause();
      audio.currentTime = 0;
      audio.removeEventListener("canplaythrough", () => setAudioLoaded(true));
      audio.removeEventListener("error", () => {});
    };
  }, []);
  
  // Toggle audio play/pause
  const toggleAudio = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // Try to play and handle any promise rejection
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            console.log("Audio playing successfully");
          })
          .catch(error => {
            console.error("Error playing audio:", error);
            toast.error("No se pudo reproducir la música", {
              description: "Verifica que el archivo existe en la carpeta public"
            });
          });
      }
    }
  };
  
  // Header scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Check if audio is already playing from Index.tsx and sync state
  useEffect(() => {
    const checkAudioPlaying = () => {
      // If loading is complete and audio is playing from Index,
      // we should reflect that in our local state
      if (audioRef.current && !audioRef.current.paused) {
        setIsPlaying(true);
      }
    };

    // Check periodically in case audio was started elsewhere
    const interval = setInterval(checkAudioPlaying, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? "py-3 glass-overlay" : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#" className="hover:opacity-80 transition-opacity flex items-center">
          <Logo size={isScrolled ? "sm" : "md"} />
        </a>
        
        <div className="flex items-center gap-4">
          {/* Social icons */}
          <div className="hidden md:flex items-center gap-4">
            <a 
              href="https://www.instagram.com/francoloncarica/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-all"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a 
              href="mailto:francoloncarica@hotmail.com"
              className="text-white/70 hover:text-white transition-all"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
          
          {/* Audio control */}
          <button
            onClick={toggleAudio}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
            aria-label={isPlaying ? "Pause music" : "Play music"}
          >
            {isPlaying ? (
              <Pause size={18} className="text-white" />
            ) : (
              <Play size={18} className="text-white" />
            )}
          </button>
          
          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            {["Panorámicas", "Verticales", "Inmobiliarias", "Videos", "Hyperlapses", "Fotos"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-white/80 hover:text-white transition-colors text-sm tracking-wider"
              >
                {item}
              </a>
            ))}
            <a 
              href="#about"
              className="text-white/80 hover:text-white transition-colors text-sm tracking-wider"
            >
              Portfolio
            </a>
          </nav>
          
          {/* Contact button */}
          <a
            href="#about"
            className="hidden md:flex px-4 py-2 border border-white/30 hover:bg-white/10 text-white text-sm transition-all duration-300 transform hover:-translate-y-1"
          >
            CONTÁCTAME
          </a>
          
          {/* Mobile menu button */}
          <button
            className="md:hidden w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex flex-col items-center justify-center gap-1.5 transition-all"
            aria-label="Menu"
          >
            <span className="w-5 h-px bg-white rounded-full"></span>
            <span className="w-5 h-px bg-white rounded-full"></span>
          </button>
        </div>
      </div>
    </header>
  );
}
