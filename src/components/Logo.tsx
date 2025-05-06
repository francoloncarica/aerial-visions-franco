
import React from "react";

interface LogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
}

const Logo = ({ variant = "light", size = "md" }: LogoProps) => {
  const textColor = variant === "light" ? "text-white" : "text-drone-black";
  
  const sizeClasses = {
    sm: "text-xl md:text-2xl",
    md: "text-2xl md:text-3xl",
    lg: "text-3xl md:text-4xl"
  };
  
  return (
    <div className="flex items-center">
      {/* Drone icon */}
      <div className={`mr-2 ${textColor}`}>
        <svg 
          width={size === "sm" ? "24" : size === "md" ? "32" : "40"} 
          height={size === "sm" ? "24" : size === "md" ? "32" : "40"} 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M12 12a6 6 0 0 0 6-6H6a6 6 0 0 0 6 6z" />
          <path d="M12 12a6 6 0 0 1 6 6H6a6 6 0 0 1 6-6z" />
          <line x1="12" y1="6" x2="12" y2="18" />
          <line x1="6" y1="12" x2="18" y2="12" />
        </svg>
      </div>
      
      {/* Logo text */}
      <div className={`font-light tracking-widest ${textColor} ${sizeClasses[size]} flex items-baseline`}>
        <span className="font-medium text-2xl md:text-3xl lg:text-4xl tracking-tight">F.</span>
        <span className="font-medium text-2xl md:text-3xl lg:text-4xl tracking-tight">L</span>
        <span className="text-sm mx-2 opacity-70">•</span>
        <span className="font-light text-sm md:text-base tracking-wider opacity-80">PORTFOLIO</span>
      </div>
    </div>
  );
};

export default Logo;
