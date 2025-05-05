
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
    <svg 
      ref={svgRef}
      width={width} 
      height={height} 
      viewBox="0 0 1152 768"
      className="svg-map"
    >
      {/* Sea background */}
      <rect width="100%" height="100%" fill="#3398db" />
      
      {/* Kefalonia island shape */}
      <path 
        d="M 288,101 L 287,101 L 286,101 L 284,100 L 281,100 L 280,99 L 278,97 L 278,96 L 277,95 L 277,93 L 276,92 L 275,91 L 274,90 L 273,90 L 271,90 L 270,91 L 269,91 L 268,91 L 267,91 L 266,90 L 266,89 L 267,87 L 267,86 L 268,85 L 268,84 L 267,84 L 266,83 L 264,83 L 263,82 L 262,81 L 260,80 L 259,79 L 259,78 L 259,77 L 259,75 L 258,74 L 257,73 L 256,72 L 254,71 L 253,70 L 251,70 L 249,70 L 248,70 L 247,71 L 246,72 L 245,73 L 244,74 L 243,75 L 242,76 L 241,76 L 240,76 L 239,76 L 238,76 L 237,75 L 236,74 L 234,73 L 233,72 L 232,72 L 231,72 L 230,72 L 228,73 L 227,74 L 226,75 L 225,77 L 224,78 L 224,79 L 223,80 L 223,81 L 222,82 L 221,82 L 219,82 L 218,82 L 217,83 L 216,83 L 215,84 L 213,85 L 212,85 L 211,85 L 210,85 L 209,84 L 208,83 L 207,83 L 206,83 L 204,83 L 203,84 L 202,85 L 202,86 L 201,87 L 200,88 L 199,89 L 198,90 L 196,91 L 195,92 L 194,93 L 193,93 L 192,94 L 191,94 L 189,93 L 188,93 L 187,93 L 186,93 L 185,93 L 184,93 L 182,94 L 181,95 L 180,96 L 179,98 L 179,99 L 179,100 L 179,101 L 179,102 L 178,103 L 177,103 L 175,102 L 174,101 L 172,101 L 170,100 L 169,100 L 168,101 L 168,102 L 168,103 L 169,104 L 170,105 L 171,106 L 172,107 L 172,108 L 172,109 L 172,110 L 171,111 L 170,111 L 169,111 L 168,111 L 166,111 L 165,111 L 164,112 L 163,113 L 162,114 L 162,115 L 161,116 L 161,117 L 162,119 L 163,120 L 165,121 L 166,122 L 168,123 L 169,124 L 170,125 L 171,126 L 171,127 L 171,128 L 170,129 L 169,130 L 168,130 L 167,130 L 166,130 L 165,130 L 164,130 L 163,131 L 162,132 L 162,133 L 162,134 L 162,135 L 162,136 L 162,137 L 163,138 L 165,139 L 166,140 L 168,141 L 170,141 L 171,142 L 173,143 L 174,144 L 175,145 L 176,146 L 177,147 L 178,148 L 179,149 L 180,150 L 180,151 L 180,152 L 180,153 L 180,154 L 181,155 L 181,156 L 181,157 L 182,158 L 183,158 L 184,158 L 186,157 L 187,157 L 188,157 L 189,158 L 190,159 L 191,160 L 192,160 L 194,161 L 195,161 L 196,161 L 197,160 L 198,160 L 199,159 L 200,159 L 202,158 L 203,158 L 204,158 L 205,158 L 206,159 L 207,159 L 208,159 L 209,158 L 210,157 L 211,157 L 212,157 L 213,157 L 214,157 L 215,158 L 217,159 L 218,160 L 219,161 L 220,162 L 221,163 L 222,163 L 223,163 L 224,163 L 225,163 L 226,162 L 227,161 L 228,160 L 229,159 L 230,158 L 231,158 L 232,157 L 233,157 L 234,157 L 235,157 L 236,158 L 237,159 L 238,160 L 239,160 L 240,160 L 241,160 L 242,160 L 243,160 L 244,159 L 245,158 L 246,157 L 247,156 L 248,155 L 250,154 L 251,153 L 253,152 L 254,151 L 255,150 L 257,149 L 258,148 L 259,147 L 260,146 L 261,145 L 262,144 L 263,143 L 264,142 L 265,141 L 266,140 L 267,139 L 268,138 L 269,137 L 270,136 L 271,135 L 272,134 L 273,133 L 274,132 L 275,131 L 276,130 L 277,129 L 278,128 L 279,127 L 280,126 L 281,125 L 282,124 L 283,123 L 284,122 L 285,121 L 286,120 L 287,119 L 288,118 L 289,117 L 290,116 L 291,115 L 292,114 L 293,113 L 294,112 L 295,111 L 296,110 L 297,109 L 298,108 L 299,107 L 300,106 L 301,105 L 302,104 L 303,103 L 304,102 L 305,101 L 306,100 L 307,99 L 308,98 L 309,97 L 310,96 L 311,95 L 312,94 L 313,93 L 314,92 L 315,91 L 316,90 L 317,89 L 318,88 L 319,87 L 320,86 L 321,85 L 322,84 L 323,83 L 324,82 L 325,81 L 326,80 L 327,79 L 328,78 L 329,77 L 330,76 L 331,75 L 332,74 L 333,73 L 334,72 L 335,71 L 336,70 L 337,69 L 338,68 L 339,67 L 340,66 L 341,65 L 342,64 L 343,63 L 344,62 L 345,61 L 346,60 L 347,59 L 348,58 L 349,57 L 350,56 L 351,55 L 352,54 L 353,53 L 354,52 L 355,51 L 356,50 L 357,49 L 358,48 L 359,47 L 360,46 L 361,45 L 362,44 L 363,43 L 364,42 L 365,41 L 366,40 L 367,39 L 368,38 L 369,37 L 370,36 L 371,35 L 372,34 L 373,33 L 374,32 L 375,31 L 376,30 L 377,29 L 378,28 L 379,27 L 380,26 L 381,25 L 382,24 L 383,23 L 384,22 L 385,21 L 386,20 L 387,19 L 388,18 L 389,17 L 390,16 L 391,15 L 392,14 L 393,13 L 394,12 L 395,11 L 396,10 L 397,9 L 398,8 L 399,7 L 400,6 L 401,5 L 402,4 L 403,3 L 404,2 L 405,1 Z" 
        fill="#C5E1A5" 
        stroke="#37474F" 
        strokeWidth="2"
      />
      
      {/* Add texture to the island */}
      <path 
        d="M 288,101 L 287,101 L 286,101 L 284,100 L 281,100 L 280,99 L 278,97 L 278,96 L 277,95 L 277,93 L 276,92 L 275,91 L 274,90 L 273,90 L 271,90 L 270,91 L 269,91 L 268,91 L 267,91 L 266,90 L 266,89 L 267,87 L 267,86 L 268,85 L 268,84 L 267,84 L 266,83 L 264,83 L 263,82 L 262,81 L 260,80 L 259,79 L 259,78 L 259,77 L 259,75 L 258,74 L 257,73 L 256,72 L 254,71 L 253,70 L 251,70 L 249,70 L 248,70 L 247,71 L 246,72 L 245,73 L 244,74 L 243,75 L 242,76 L 241,76 L 240,76 L 239,76 L 238,76 L 237,75 L 236,74 L 234,73 L 233,72 L 232,72 L 231,72 L 230,72 L 228,73 L 227,74 L 226,75 L 225,77 L 224,78 L 224,79 L 223,80 L 223,81 L 222,82 L 221,82 L 219,82 L 218,82 L 217,83 L 216,83 L 215,84 L 213,85 L 212,85 L 211,85 L 210,85 L 209,84 L 208,83 L 207,83 L 206,83 L 204,83 L 203,84 L 202,85 L 202,86 L 201,87 L 200,88 L 199,89 L 198,90 L 196,91 L 195,92 L 194,93 L 193,93 L 192,94 L 191,94 L 189,93 L 188,93 L 187,93 L 186,93 L 185,93 L 184,93 L 182,94 L 181,95 L 180,96 L 179,98 L 179,99 L 179,100 L 179,101 L 179,102 L 178,103 L 177,103 L 175,102 L 174,101 L 172,101 L 170,100 L 169,100 L 168,101 L 168,102 L 168,103 L 169,104 L 170,105 L 171,106 L 172,107 L 172,108 L 172,109 L 172,110 L 171,111 L 170,111 L 169,111 L 168,111 L 166,111 L 165,111 L 164,112 L 163,113 L 162,114 L 162,115 L 161,116 L 161,117 L 162,119 L 163,120 L 165,121 L 166,122 L 168,123 L 169,124 L 170,125 L 171,126 L 171,127 L 171,128 L 170,129 L 169,130 L 168,130 L 167,130 L 166,130 L 165,130 L 164,130 L 163,131 L 162,132 L 162,133 L 162,134 L 162,135 L 162,136 L 162,137 L 163,138 L 165,139 L 166,140 L 168,141 L 170,141 L 171,142 L 173,143 L 174,144 L 175,145 L 176,146 L 177,147 L 178,148 L 179,149 L 180,150 L 180,151 L 180,152 L 180,153 L 180,154 L 181,155 L 181,156 L 181,157 L 182,158 L 183,158 L 184,158 L 186,157 L 187,157 L 188,157 L 189,158 L 190,159 L 191,160 L 192,160 L 194,161 L 195,161 L 196,161 L 197,160 L 198,160 L 199,159 L 200,159 L 202,158 L 203,158 L 204,158 L 205,158 L 206,159 L 207,159 L 208,159 L 209,158 L 210,157 L 211,157 L 212,157 L 213,157 L 214,157 L 215,158 L 217,159 L 218,160 L 219,161 L 220,162 L 221,163 L 222,163 L 223,163 L 224,163 L 225,163 L 226,162 L 227,161 L 228,160 L 229,159 L 230,158 L 231,158 L 232,157 L 233,157 L 234,157 L 235,157 L 236,158 L 237,159 L 238,160 L 239,160 L 240,160 L 241,160 L 242,160 L 243,160 L 244,159 L 245,158 L 246,157 L 247,156 L 248,155 L 250,154 L 251,153 L 253,152 L 254,151 L 255,150 L 257,149 L 258,148 L 259,147 L 260,146 L 261,145 L 262,144 L 263,143 L 264,142 L 265,141 L 266,140 L 267,139 L 268,138 L 269,137 L 270,136 L 271,135 L 272,134 L 273,133 L 274,132 L 275,131 L 276,130 L 277,129 L 278,128 L 279,127 L 280,126 L 281,125 L 282,124 L 283,123 L 284,122 L 285,121 L 286,120 L 287,119 L 288,118 L 289,117 L 290,116 L 291,115 L 292,114 L 293,113 L 294,112 L 295,111 L 296,110 L 297,109 L 298,108 L 299,107 L 300,106 L 301,105 L 302,104 L 303,103 L 304,102 L 305,101 L 306,100 L 307,99 L 308,98 L 309,97 L 310,96 L 311,95 L 312,94 L 313,93 L 314,92 L 315,91 L 316,90 L 317,89 L 318,88 L 319,87 L 320,86 L 321,85 L 322,84 L 323,83 L 324,82 L 325,81 L 326,80 L 327,79 L 328,78 L 329,77 L 330,76 L 331,75 L 332,74 L 333,73 L 334,72 L 335,71 L 336,70 L 337,69 L 338,68 L 339,67 L 340,66 L 341,65 L 342,64 L 343,63 L 344,62 L 345,61 L 346,60 L 347,59 L 348,58 L 349,57 L 350,56 L 351,55 L 352,54 L 353,53 L 354,52 L 355,51 L 356,50 L 357,49 L 358,48 L 359,47 L 360,46 L 361,45 L 362,44 L 363,43 L 364,42 L 365,41 L 366,40 L 367,39 L 368,38 L 369,37 L 370,36 L 371,35 L 372,34 L 373,33 L 374,32 L 375,31 L 376,30 L 377,29 L 378,28 L 379,27 L 380,26 L 381,25 L 382,24 L 383,23 L 384,22 L 385,21 L 386,20 L 387,19 L 388,18 L 389,17 L 390,16 L 391,15 L 392,14 L 393,13 L 394,12 L 395,11 L 396,10 L 397,9 L 398,8 L 399,7 L 400,6 L 401,5 L 402,4 L 403,3 L 404,2 L 405,1 Z" 
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
