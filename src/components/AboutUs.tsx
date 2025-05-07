
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";
import { Instagram, Mail } from "lucide-react";

export default function AboutUs() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section id="about" className="py-24 bg-drone-black relative overflow-hidden">
      {/* Animated background with drone patterns */}
      <div className="absolute inset-0 opacity-5">
        <div className="drone drone-1"></div>
        <div className="drone drone-2"></div>
        <div className="drone drone-3"></div>
      </div>
      
      <div ref={ref} className="container mx-auto px-4 relative z-10">
        <div className={cn(
          "mb-12 transition-all duration-700 transform",
          inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        )}>
          <h2 className="text-3xl md:text-4xl font-light tracking-wider mb-4">Portfolio</h2>
          <div className="w-16 h-px bg-white/40"></div>
        </div>
        
        <div className={cn(
          "grid grid-cols-1 md:grid-cols-2 gap-8 items-center",
          "transition-all duration-700 transform",
          inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
        )}>
          <div className="space-y-6">
            <p className="text-lg text-white/80">
              Fotografía y videografía especializada en capturas aéreas con drones. 
              Captando la belleza del mundo desde ángulos únicos y perspectivas que solo 
              la tecnología de drones nos permite alcanzar.
            </p>
            <p className="text-lg text-white/80">
              Con años de experiencia en el sector inmobiliario, turístico y publicitario, 
              ofreciendo servicios profesionales que destacan por su calidad técnica y visión artística.
            </p>
            
            <div className="pt-6 space-y-6">
              <h3 className="text-2xl font-light mb-4">Servicios</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {["Fotografía Aérea", "Videografía", "Hyperlapses", "Tours Virtuales", "Panorámicas 360°", "Edición Profesional"].map((service) => (
                  <div key={service} className="px-4 py-3 bg-white/5 hover:bg-white/10 transition-all rounded text-center">
                    {service}
                  </div>
                ))}
              </div>
              
              <h3 className="text-2xl font-light mb-4 pt-4">Contáctame</h3>
              <div className="flex flex-col md:flex-row gap-4">
                <a 
                  href="mailto:francoloncarica@hotmail.com" 
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 transition-all rounded text-center flex items-center justify-center gap-2"
                >
                  <Mail size={18} />
                  <span>Email</span>
                </a>
                <a 
                  href="https://www.instagram.com/francoloncarica/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 transition-all rounded text-center flex items-center justify-center gap-2"
                >
                  <Instagram size={18} />
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>
          <div className="relative aspect-square md:aspect-auto md:h-[500px] rounded-md overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-drone-gray/20 to-drone-black/80 mix-blend-overlay"></div>
            <img 
              src="https://images.unsplash.com/photo-1508614589041-895b88991e3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
              alt="Photographer with drone" 
              className="w-full h-full object-cover animate-slow-pan"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
