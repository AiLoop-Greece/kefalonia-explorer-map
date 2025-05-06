
import React, { useEffect, useRef } from 'react';
import { 
  MapContainer, 
  TileLayer, 
  Marker, 
  Popup, 
  useMap,
  CircleMarker,
  ZoomControl
} from 'react-leaflet';
import L from 'leaflet';
import { Icon, divIcon } from 'leaflet';
import { locations, categories, Location, islandBounds } from '@/data/kefalonia-data';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface LeafletMapProps {
  selectedPinId: number | null;
  onPinClick: (id: number) => void;
  activeCategories: string[];
  config?: MapConfigProps;
}

export interface MapConfigProps {
  height?: string;
  width?: string;
  showAttribution?: boolean;
  showZoomControl?: boolean;
  showResetView?: boolean;
  mapStyle?: 'default' | 'satellite' | 'terrain';
  pinStyle?: 'modern' | 'classic';
}

// Custom control component for map reset
const ResetViewControl = ({ center, zoom }: { center: [number, number]; zoom: number }) => {
  const map = useMap();
  
  const handleResetView = () => {
    map.setView(center, zoom);
  };
  
  return (
    <div className="leaflet-top leaflet-right" style={{ marginTop: '60px' }}>
      <div className="leaflet-control leaflet-bar">
        <button 
          onClick={handleResetView}
          className="bg-white p-2 rounded-md shadow-md text-sm font-medium hover:bg-gray-100 transition-colors flex items-center justify-center"
          title="Reset view"
          style={{ width: '32px', height: '32px' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
            <path d="M3 3v5h5"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

// Custom component to update map view when selected pin changes
const MapUpdater = ({ selectedPinId }: { selectedPinId: number | null }) => {
  const map = useMap();
  
  useEffect(() => {
    if (selectedPinId) {
      const location = locations.find(loc => loc.id === selectedPinId);
      if (location) {
        map.setView([location.lat, location.lng], 14, {
          animate: true,
          duration: 1
        });
      }
    }
  }, [selectedPinId, map]);
  
  return null;
};

// MapInitializer component to set initial map properties
const MapInitializer = ({ showAttribution }: { showAttribution?: boolean }) => {
  const map = useMap();
  
  useEffect(() => {
    // Define bounds for Kefalonia island
    const kefaloniaBounds: L.LatLngBoundsExpression = [
      [islandBounds.minLat, islandBounds.minLng], // Southwest corner
      [islandBounds.maxLat, islandBounds.maxLng]  // Northeast corner
    ];
    
    // Set initial view to center of Kefalonia
    const kefaloniaCenterCoords: [number, number] = [38.2500, 20.5800];
    const defaultZoom = 10;
    
    // Apply bounds and restrictions
    map.setMaxBounds(kefaloniaBounds);
    map.setMinZoom(9);
    map.setMaxZoom(15);
    map.options.bounceAtZoomLimits = false;
    
    // Set initial view
    map.setView(kefaloniaCenterCoords, defaultZoom);

    // Enable scroll wheel zoom
    if (!map.scrollWheelZoom.enabled()) {
      map.scrollWheelZoom.enable();
    }

    // Set attribution control
    if (showAttribution === false && map.attributionControl) {
      map.removeControl(map.attributionControl);
    }
  }, [map, showAttribution]);
  
  return null;
};

const LeafletMap: React.FC<LeafletMapProps> = ({ 
  selectedPinId, 
  onPinClick,
  activeCategories,
  config = {}
}) => {
  const kefaloniaCenterCoords: [number, number] = [38.2500, 20.5800];
  const defaultZoom = 10;
  
  // Default configuration values
  const {
    height = "100%",
    width = "100%",
    showAttribution = true,
    showZoomControl = true,
    showResetView = true,
    mapStyle = "default",
    pinStyle = "modern"
  } = config;
  
  // Create category color map
  const categoryColorMap = Object.fromEntries(
    categories.map(category => [category.name, category.color])
  );
  
  // Select map tile layer based on style
  const getTileLayer = () => {
    switch (mapStyle) {
      case "satellite":
        return "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
      case "terrain":
        return "https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png";
      default:
        return "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    }
  };

  // Filter locations based on active categories
  const filteredLocations = locations.filter(
    location => activeCategories.includes(location.category)
  );

  // Get category icon for pin
  const getCategoryIcon = (category: string, isSelected: boolean) => {
    const color = categoryColorMap[category] || '#808080';
    const size = isSelected ? 38 : 30;
    
    if (pinStyle === "modern") {
      return divIcon({
        html: `
          <div class="animate-in fade-in duration-500" style="
            position: relative;
            width: ${size}px; 
            height: ${size + 10}px;
          ">
            <div style="
              position: absolute;
              top: 0;
              left: ${size / 2 - 8}px;
              width: 16px;
              height: 16px;
              border-radius: 50%;
              background-color: white;
              box-shadow: 0 0 0 4px ${color};
              z-index: 2;
              ${isSelected ? `animation: pulse 2s infinite;` : ''}
            "></div>
            <div style="
              position: absolute;
              top: 8px;
              left: ${size / 2}px;
              width: 2px;
              height: ${size - 8}px;
              background-color: ${color};
              z-index: 1;
            "></div>
            <div style="
              position: absolute;
              bottom: 0;
              left: ${size / 2 - 6}px;
              width: 12px;
              height: 12px;
              border-radius: 50%;
              background-color: ${color};
              filter: blur(4px);
              opacity: 0.6;
            "></div>
          </div>
        `,
        className: '',
        iconSize: [size, size + 10],
        iconAnchor: [size/2, size + 10],
        popupAnchor: [0, -(size + 5)]
      });
    } else {
      // Classic circular style
      return divIcon({
        html: `
          <div style="
            background-color: ${color}; 
            border: 2px solid white;
            border-radius: 50%;
            width: ${size}px; 
            height: ${size}px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 5px rgba(0,0,0,0.3);
            ${isSelected ? 'box-shadow: 0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px ' + color : ''}
          ">
            <span style="
              color: white; 
              font-weight: bold;
              font-size: 16px;
              text-shadow: 1px 1px 1px rgba(0,0,0,0.5);
            ">
              ${category.charAt(0)}
            </span>
          </div>
        `,
        className: '',
        iconSize: [size, size],
        iconAnchor: [size/2, size/2],
        popupAnchor: [0, -size/2]
      });
    }
  };

  return (
    <div className="w-full h-full" style={{ minHeight: '500px', height, width }}>
      <MapContainer 
        style={{ height: "100%", width: "100%", borderRadius: "0.75rem" }}
        zoomControl={false}
      >
        <MapInitializer showAttribution={showAttribution} />
        <TileLayer url={getTileLayer()} />
        
        {showZoomControl && <ZoomControl position="topright" />}
        
        {filteredLocations.map(location => {
          const isSelected = location.id === selectedPinId;
          return (
            <Marker
              key={location.id}
              position={[location.lat, location.lng]}
              icon={getCategoryIcon(location.category, isSelected) as any}
              eventHandlers={{
                click: () => onPinClick(location.id),
                mouseover: (e) => {
                  e.target.openPopup();
                },
                mouseout: (e) => {
                  if (location.id !== selectedPinId) {
                    e.target.closePopup();
                  }
                }
              }}
            >
              <Popup>
                <div className="text-center p-1">
                  <h3 className="font-bold text-sm">{location.name}</h3>
                  <div className="text-xs text-muted-foreground">{location.category}</div>
                  <button 
                    className="mt-2 text-xs px-2 py-1 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors"
                    onClick={() => onPinClick(location.id)}
                  >
                    Show Details
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {showResetView && <ResetViewControl center={kefaloniaCenterCoords} zoom={defaultZoom} />}
        <MapUpdater selectedPinId={selectedPinId} />
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
