
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    // Trigger animation after component mount
    setLoaded(true);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background video */}
      <div className="absolute inset-0 bg-drone-black">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover opacity-70"
          id="bgVideo"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-flying-over-a-foggy-forest-at-dawn-22251-large.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Video controls */}
      <div className="absolute bottom-10 right-10 z-10">
        <button 
          onClick={() => {
            const video = document.getElementById("bgVideo") as HTMLVideoElement;
            if (video.paused) {
              video.play();
            } else {
              video.pause();
            }
          }}
          className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center backdrop-blur-sm transition-all"
          aria-label="Play/Pause background video"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
          </svg>
        </button>
      </div>

      {/* Hero content */}
      <div className="container mx-auto relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
        <h1 className={cn(
          "text-4xl md:text-6xl lg:text-7xl font-light tracking-widest text-shadow transition-all duration-1000 transform",
          loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        )}>
          FRANCO LONCARICA
        </h1>
        
        <div className={cn(
          "h-px w-24 bg-white/40 my-6 transition-all duration-1000 delay-300",
          loaded ? "w-24 opacity-100" : "w-0 opacity-0"
        )}></div>
        
        <h2 className={cn(
          "text-xl md:text-3xl font-extralight tracking-wide text-white/80 text-shadow mb-2 transition-all duration-1000 delay-500",
          loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        )}>
          PORTFOLIO
        </h2>
        
        <p className={cn(
          "max-w-lg text-base md:text-lg font-light text-white/60 text-shadow transition-all duration-1000 delay-700",
          loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        )}>
          Capturando el mundo desde perspectivas únicas
        </p>
        
        <div className={cn(
          "mt-12 transition-all duration-1000 delay-1000",
          loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        )}>
          <a 
            href="#panorámicas"
            className="px-8 py-3 border border-white/20 hover:border-white/40 rounded-full text-sm uppercase tracking-widest transition-all duration-300 hover:bg-white/5"
            aria-label="Explorar portfolio"
          >
            Explorar
          </a>
        </div>
      </div>
    </section>
  );
}
