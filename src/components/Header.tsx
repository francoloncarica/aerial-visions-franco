import { useState, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import Logo from "./Logo";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio("/ambient-chillout.mp3"));
  
  // Set audio volume
  useEffect(() => {
    audio.volume = 0.4; // Set volume to 40%
    audio.loop = true;
    
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio]);
  
  // Toggle audio play/pause
  const toggleAudio = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };
  
  // Header scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? "py-3 glass-overlay" : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#" className="hover:opacity-80 transition-opacity">
          <Logo size={isScrolled ? "sm" : "md"} />
        </a>
        
        <div className="flex items-center">
          {/* Audio control */}
          <button
            onClick={toggleAudio}
            className="mr-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
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
              Sobre Mí
            </a>
          </nav>
          
          {/* Mobile menu button (unchanged) */}
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
