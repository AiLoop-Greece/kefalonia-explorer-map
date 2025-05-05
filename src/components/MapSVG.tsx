
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
  const [islandPath, setIslandPath] = useState<string>("");

  // Create a simplified path shape of Kefalonia
  useEffect(() => {
    // This is a simplified path of Kefalonia's coastline
    const kefaloniaSvgPath = `
      M130,50 
      C150,40 180,35 200,40 
      C220,45 240,60 250,80 
      C260,100 265,130 260,150 
      C255,170 245,190 235,205 
      C225,220 215,240 205,260 
      C195,280 190,300 180,320 
      C170,340 160,360 140,370
      C120,380 100,385 80,380
      C60,375 40,360 30,340
      C20,320 15,290 20,270
      C25,250 35,230 40,210
      C45,190 50,170 60,150
      C70,130 80,110 90,90
      C100,70 110,60 130,50Z
    `;
    setIslandPath(kefaloniaSvgPath);
  }, []);

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
    <svg 
      ref={svgRef}
      width={width} 
      height={height} 
      viewBox={`0 0 ${width} ${height}`}
      className="svg-map"
    >
      {/* Sea background */}
      <rect x="0" y="0" width={width} height={height} fill="#1E88E5" />
      
      {/* Island shape with texture */}
      <path 
        d={islandPath} 
        fill="#C5E1A5" 
        stroke="#37474F" 
        strokeWidth="3" 
      />
      <path 
        d={islandPath} 
        fill="url(#islandTexture)" 
        fillOpacity="0.4" 
      />
      
      {/* Add sun rays effect in the sea */}
      <circle cx={width * 0.15} cy={height * 0.15} r={width * 0.2} fill="white" fillOpacity="0.2" />
      
      {/* Textures and patterns */}
      <defs>
        <pattern id="islandTexture" patternUnits="userSpaceOnUse" width="20" height="20">
          <path d="M0,10 L20,10 M10,0 L10,20" stroke="#A5D6A7" strokeWidth="0.5" />
        </pattern>
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
  );
};

export default MapSVG;
