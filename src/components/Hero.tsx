
import { useState, useEffect } from "react";
import Logo from "./Logo";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background video with overlay */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/images/background-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Dynamic background elements with enhanced animation */}
      <div className="absolute inset-0 z-10">
        <div className="absolute w-full h-full">
          {/* Grid lines with subtle movement */}
          <div className="absolute inset-0 grid grid-cols-6 opacity-20">
            {Array.from({ length: 7 }).map((_, i) => (
              <div 
                key={`v-${i}`} 
                className="h-full w-px bg-white/30 transform translate-x-full animate-pulse"
                style={{ animationDuration: `${8 + i * 0.5}s`, animationDelay: `${i * 0.2}s` }}
              ></div>
            ))}
          </div>
          <div className="absolute inset-0 grid grid-rows-6 opacity-20">
            {Array.from({ length: 7 }).map((_, i) => (
              <div 
                key={`h-${i}`} 
                className="w-full h-px bg-white/30 transform translate-y-full animate-pulse"
                style={{ animationDuration: `${7 + i * 0.5}s`, animationDelay: `${i * 0.2}s` }}
              ></div>
            ))}
          </div>
          
          {/* Enhanced floating elements with more dynamic animations */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full border border-white/20 opacity-50 animate-float-slow" 
               style={{ animationDuration: '15s' }}></div>
          <div className="absolute bottom-1/3 right-1/5 w-48 h-48 rounded-full border border-white/10 opacity-30 animate-float-reverse"
               style={{ animationDuration: '20s' }}></div>
          <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full border border-white/30 opacity-40 animate-pulse"
               style={{ animationDuration: '12s' }}></div>
          
          {/* Additional animated elements */}
          <div className="absolute top-2/3 left-1/3 w-16 h-16 rounded-full bg-white/5 animate-ping" style={{ animationDuration: '8s' }}></div>
          <div className="absolute bottom-1/4 right-1/3 w-20 h-20 rounded-full border border-white/15 animate-float-slow" style={{ animationDuration: '18s', animationDelay: '2s' }}></div>
          
          {/* Drone paths with enhanced animation */}
          <div className="absolute inset-0">
            <svg width="100%" height="100%" className="opacity-30">
              <path
                d="M0,100 Q200,300 400,150 T800,300"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1"
                fill="none"
                className="path-animation"
                style={{ animationDuration: '25s' }}
              />
              <path
                d="M100,50 Q300,200 500,100 T900,200"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1"
                fill="none"
                className="path-animation-reverse"
                style={{ animationDuration: '32s' }}
              />
              <path
                d="M50,200 Q150,100 300,250 T600,150"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="1"
                fill="none"
                className="path-animation"
                style={{ animationDuration: '28s' }}
              />
            </svg>
            
            {/* Animated drone points with different timings */}
            <div className="absolute h-2 w-2 bg-white rounded-full left-1/4 top-1/4 animate-ping" style={{ animationDuration: '4s' }}></div>
            <div className="absolute h-3 w-3 bg-white rounded-full right-1/3 bottom-1/3 animate-ping" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
            <div className="absolute h-2 w-2 bg-white rounded-full left-2/3 top-1/2 animate-ping" style={{ animationDuration: '6s', animationDelay: '2s' }}></div>
            
            {/* New animated elements */}
            <div className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full border border-white/5 animate-spin" style={{ animationDuration: '40s' }}></div>
            <div className="absolute top-1/2 left-1/2 w-80 h-80 rounded-full border border-white/5 animate-spin" style={{ animationDuration: '50s', animationDirection: 'reverse' }}></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={`relative z-20 text-center px-4 transition-all duration-1000 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="mb-6 flex justify-center">
          <Logo size="lg" />
        </div>
        <div className="w-24 h-px bg-white mx-auto mb-6 transition-all duration-1000 delay-300 transform" style={{ width: loaded ? '6rem' : '0' }}></div>
        <p className="text-lg md:text-xl font-light text-white/80 max-w-2xl mx-auto mb-10 transition-all duration-1000 delay-500 transform" style={{ opacity: loaded ? 1 : 0 }}>
          Capturando perspectivas únicas: Fotografía y videografía con drones
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <a 
            href="#panorámicas" 
            className="inline-block px-8 py-3 border border-white/30 hover:bg-white/10 text-white transition-all duration-500 transform hover:-translate-y-1"
          >
            EXPLORAR PORTFOLIO
          </a>
          <a 
            href="#about" 
            className="inline-block px-8 py-3 bg-white/10 hover:bg-white/20 text-white transition-all duration-500 transform hover:-translate-y-1"
          >
            SOBRE MÍ
          </a>
        </div>
      </div>
    </section>
  );
}
