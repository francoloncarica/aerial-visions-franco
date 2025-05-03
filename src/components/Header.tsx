
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Pause, Play } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(() => new Audio("/ambient-chillout.mp3"));
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    // Configure audio
    audio.loop = true;
    audio.volume = 0.4;
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      audio.pause();
    };
  }, [scrolled, audio]);

  const toggleAudio = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(error => {
        console.error("Audio playback error:", error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500 py-6",
        scrolled ? "glass-overlay py-4" : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex justify-between items-center px-4 md:px-6">
        <div className="text-xl md:text-2xl font-light tracking-widest text-white">
          FRANCO LONCARICA
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleAudio}
            className="w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center transition-all backdrop-blur-sm"
            aria-label={isPlaying ? "Pause music" : "Play music"}
          >
            {isPlaying ? (
              <Pause size={20} className="text-white/90" />
            ) : (
              <Play size={20} className="text-white/90" />
            )}
          </button>
          
          <nav className="hidden md:flex space-x-6">
            {["Panorámicas", "Verticales", "Inmobiliarias", "Fotos", "Hyperlapses", "Videos"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-sm uppercase tracking-wider text-gray-300 hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
