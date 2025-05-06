
import React, { useEffect } from 'react';
import { 
  MapContainer, 
  TileLayer, 
  Marker, 
  Popup, 
  useMap,
  CircleMarker
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
}

// Custom control component for map reset
const ResetViewControl = ({ center, zoom }: { center: [number, number]; zoom: number }) => {
  const map = useMap();
  
  const handleResetView = () => {
    map.setView(center, zoom);
  };
  
  return (
    <div className="leaflet-top leaflet-right">
      <div className="leaflet-control leaflet-bar">
        <button 
          onClick={handleResetView}
          className="bg-white p-2 shadow-md text-sm font-medium hover:bg-gray-100 transition-colors"
          title="Reset view"
        >
          Reset View
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

const LeafletMap: React.FC<LeafletMapProps> = ({ 
  selectedPinId, 
  onPinClick,
  activeCategories 
}) => {
  const kefaloniaCenterCoords: [number, number] = [38.2500, 20.5800];
  const defaultZoom = 10;
  
  // Create category color map
  const categoryColorMap = Object.fromEntries(
    categories.map(category => [category.name, category.color])
  );

  // Define bounds for Kefalonia island
  const kefaloniaBounds: L.LatLngBoundsExpression = [
    [islandBounds.minLat, islandBounds.minLng], // Southwest corner
    [islandBounds.maxLat, islandBounds.maxLng]  // Northeast corner
  ];

  // Custom marker icons for each category
  const getCategoryIcon = (category: string, isSelected: boolean) => {
    const color = categoryColorMap[category] || '#808080';
    const size = isSelected ? 38 : 30;
    
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
      iconAnchor: [size/2, size/2]
    });
  };

  // Filter locations based on active categories
  const filteredLocations = locations.filter(
    location => activeCategories.includes(location.category)
  );

  // Setup function for when map is created
  const handleMapCreated = (mapInstance: L.Map) => {
    // Apply bounds and restrictions to the map
    mapInstance.setMaxBounds(kefaloniaBounds);
    mapInstance.setMinZoom(9);
    mapInstance.setMaxZoom(15);
    mapInstance.options.bounceAtZoomLimits = false;
  };

  return (
    <div className="w-full h-full" style={{ minHeight: '500px' }}>
      <MapContainer 
        style={{ height: "100%", width: "100%", borderRadius: "0.75rem" }}
        whenCreated={handleMapCreated}
        scrollWheelZoom={true}
        attributionControl={false}
      >
        {/* Initialize the map view to the center position */}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        
        {filteredLocations.map(location => {
          const isSelected = location.id === selectedPinId;
          return (
            <Marker
              key={location.id}
              position={[location.lat, location.lng]}
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

        <ResetViewControl center={kefaloniaCenterCoords} zoom={defaultZoom} />
        <MapUpdater selectedPinId={selectedPinId} />
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
