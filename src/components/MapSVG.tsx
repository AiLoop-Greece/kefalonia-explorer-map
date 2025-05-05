
import React, { useRef, useEffect, useState } from "react";
import { locations, gpsToSvgCoordinates, categories } from "@/data/kefalonia-data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface MapSVGProps {
  width: number;
  height: number;
  selectedPinId: number | null;
  onPinClick: (id: number) => void;
  activeCategories: string[];
}

const MapSVG: React.FC<MapSVGProps> = ({ 
  width, 
  height, 
  selectedPinId, 
  onPinClick,
  activeCategories 
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const pinsRef = useRef<(SVGGElement | null)[]>([]);
  
  // Animate pins when component mounts
  useEffect(() => {
    if (pinsRef.current.length === 0) return;

    // Initialize animations for pins
    gsap.fromTo(
      pinsRef.current,
      { opacity: 0, y: 20, scale: 0 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.05,
        duration: 0.4,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: svgRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  // Handle pin hover effect
  const handlePinHover = (index: number, isHovering: boolean) => {
    if (!pinsRef.current[index]) return;
    
    gsap.to(pinsRef.current[index], {
      scale: isHovering ? 1.2 : 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  // Get color for categories
  const getCategoryColor = (category: string) => {
    const foundCategory = categories.find(c => c.name === category);
    return foundCategory ? foundCategory.color : "#808080";
  };

  return (
    <div className="relative" style={{ width: width, height: height }}>
      {/* Map Image Background */}
      <img 
        src="/lovable-uploads/c78a6dff-2961-40ab-bb10-5f14a47f6651.png" 
        alt="Kefalonia Island Map" 
        className="absolute top-0 left-0 w-full h-full object-contain"
      />
      
      <svg 
        ref={svgRef}
        width={width} 
        height={height} 
        viewBox={`0 0 ${width} ${height}`}
        className="svg-map absolute top-0 left-0 w-full h-full"
        style={{ pointerEvents: "none" }}
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Location pins */}
        {locations.map((location, index) => {
          // Only show pins for active categories
          if (!activeCategories.includes(location.category)) {
            return null;
          }

          const { x, y } = gpsToSvgCoordinates(location.lat, location.lng, width, height);
          const isSelected = selectedPinId === location.id;
          const categoryColor = getCategoryColor(location.category);

          return (
            <g
              key={location.id}
              ref={(el) => (pinsRef.current[index] = el)}
              className="pin"
              transform={`translate(${x}, ${y})`}
              onClick={() => onPinClick(location.id)}
              onMouseEnter={() => handlePinHover(index, true)}
              onMouseLeave={() => handlePinHover(index, false)}
              filter={isSelected ? "url(#glow)" : "none"}
              style={{ pointerEvents: "all" }}
            >
              <circle 
                r={isSelected ? 10 : 8}
                fill={categoryColor} 
                stroke="#FFF" 
                strokeWidth="2"
                className={isSelected ? "animate-pulse-glow" : ""}
              />
              <text
                x="0"
                y="-12"
                fill="#37474F"
                stroke="#FFF"
                strokeWidth="0.5"
                fontSize="10"
                fontWeight="bold"
                textAnchor="middle"
                dominantBaseline="middle"
                opacity={isSelected ? 1 : 0.8}
              >
                {location.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default MapSVG;
