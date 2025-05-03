
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function Footer() {
  const [year, setYear] = useState("");
  
  useEffect(() => {
    setYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer className="py-12 bg-drone-black border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="text-xl font-light tracking-widest text-white/80">
              FRANCO LONCARICA
            </div>
            <div className="mt-2 text-sm text-white/40">
              Capturando el mundo desde perspectivas únicas
            </div>
          </div>
          
          <div className="text-sm text-white/40">
            &copy; {year} Franco Loncarica. Todos los derechos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
}
