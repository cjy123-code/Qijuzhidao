"use client";

import { useState } from "react";
import { House, climateColors } from "@/lib/data";

interface ChinaMapProps {
  houses: House[];
  onHouseClick: (house: House) => void;
}

// Convert geo coordinates to SVG position
// China roughly spans: lng 73-135, lat 18-54
function geoToSvg(lng: number, lat: number): { x: number; y: number } {
  const minLng = 73, maxLng = 135;
  const minLat = 18, maxLat = 54;
  const x = ((lng - minLng) / (maxLng - minLng)) * 100;
  const y = ((maxLat - lat) / (maxLat - minLat)) * 100;
  return { x, y };
}

export function ChinaMap({ houses, onHouseClick }: ChinaMapProps) {
  const [hoveredHouse, setHoveredHouse] = useState<House | null>(null);

  return (
    <div className="h-full w-full flex flex-col">
      {/* Map Container */}
      <div className="relative flex-1 min-h-[400px] rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/50 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-30">
          <svg width="100%" height="100%" className="text-amber-300">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* China outline (simplified) */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full p-4" preserveAspectRatio="xMidYMid meet">
          {/* Simplified China shape */}
          <path
            d="M 20 25 Q 25 20 35 18 Q 50 15 65 20 Q 75 22 82 28 Q 88 35 85 45 Q 82 55 78 62 Q 72 70 65 75 Q 55 82 45 80 Q 35 78 28 72 Q 22 65 18 55 Q 15 45 18 35 Q 19 30 20 25 Z"
            fill="rgba(245, 235, 220, 0.6)"
            stroke="rgba(180, 140, 90, 0.4)"
            strokeWidth="0.5"
          />
          
          {/* House markers */}
          {houses.map((house) => {
            const pos = geoToSvg(house.coords[0], house.coords[1]);
            const isHovered = hoveredHouse?.name === house.name;
            
            return (
              <g key={house.name}>
                {/* Glow effect */}
                {isHovered && (
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r="5"
                    fill={climateColors[house.climate]}
                    opacity="0.3"
                    className="animate-pulse"
                  />
                )}
                
                {/* Main marker */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={isHovered ? "3.5" : "2.8"}
                  fill={climateColors[house.climate]}
                  stroke="white"
                  strokeWidth="0.8"
                  className="cursor-pointer transition-all duration-200 drop-shadow-md"
                  style={{ filter: isHovered ? "drop-shadow(0 0 4px rgba(0,0,0,0.3))" : undefined }}
                  onClick={() => onHouseClick(house)}
                  onMouseEnter={() => setHoveredHouse(house)}
                  onMouseLeave={() => setHoveredHouse(null)}
                />
              </g>
            );
          })}
        </svg>

        {/* Tooltip */}
        {hoveredHouse && (
          <div 
            className="absolute z-10 px-3 py-2 rounded-lg bg-background/95 backdrop-blur-sm shadow-lg border border-border text-sm pointer-events-none"
            style={{
              left: `${geoToSvg(hoveredHouse.coords[0], hoveredHouse.coords[1]).x}%`,
              top: `${geoToSvg(hoveredHouse.coords[0], hoveredHouse.coords[1]).y}%`,
              transform: "translate(-50%, -120%)",
            }}
          >
            <div className="font-semibold text-foreground">{hoveredHouse.name}</div>
            <div className="text-muted-foreground text-xs">{hoveredHouse.climate}</div>
          </div>
        )}

        {/* Map title */}
        <div className="absolute top-3 left-3 text-xs font-medium text-amber-700/70">
          中国传统民居分布
        </div>
      </div>
      
      {/* Legend */}
      <div className="mt-4 flex flex-wrap justify-center gap-4 rounded-full bg-muted/50 px-4 py-2">
        {Object.entries(climateColors).map(([climate, color]) => (
          <div key={climate} className="flex items-center gap-2 text-xs font-medium">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span className="text-muted-foreground">{climate}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
