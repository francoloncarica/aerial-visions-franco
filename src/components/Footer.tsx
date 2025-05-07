
import Logo from "./Logo";
import { Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-drone-black py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo and copyright */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <Logo size="md" />
            <p className="text-white/50 text-sm">© {new Date().getFullYear()} F.L Portfolio. Todos los derechos reservados.</p>
          </div>
          
          {/* Contact section */}
          <div className="text-center md:text-right">
            <h3 className="text-xl font-light mb-4">Contáctanos</h3>
            <div className="flex flex-col gap-2">
              <a 
                href="mailto:francoloncarica@hotmail.com" 
                className="text-white/70 hover:text-white transition-colors"
              >
                francoloncarica@hotmail.com
              </a>
              
              <a 
                href="https://www.instagram.com/francoloncarica/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center md:justify-end text-white/70 hover:text-white transition-colors gap-2"
              >
                <Instagram size={18} />
                <span>@francoloncarica</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
