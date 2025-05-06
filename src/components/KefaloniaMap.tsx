
import React, { useState, useEffect, useRef } from "react";
import LocationPopup from "./LocationPopup";
import CategoryFilter from "./CategoryFilter";
import { locations, Location, categories } from "@/data/kefalonia-data";
import { useIsMobile } from "@/hooks/use-mobile";
import LeafletMap from "./LeafletMap";
import { MapConfigProps } from "./LeafletMap";

const KefaloniaMap: React.FC = () => {
  const [selectedPinId, setSelectedPinId] = useState<number | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [activeCategories, setActiveCategories] = useState<string[]>(
    categories.map(c => c.name)
  );
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [mapConfig, setMapConfig] = useState<MapConfigProps>({
    pinStyle: "modern",
    mapStyle: "default"
  });

  // Handle pin selection
  const handlePinClick = (id: number) => {
    setSelectedPinId(id);
    const location = locations.find(loc => loc.id === id) || null;
    setSelectedLocation(location);
  };

  // Close popup
  const handleClosePopup = () => {
    setSelectedPinId(null);
    setSelectedLocation(null);
  };

  // Toggle category filter
  const handleCategoryToggle = (category: string) => {
    setActiveCategories(prev => {
      // Don't allow deactivating the last active category
      if (prev.includes(category) && prev.length === 1) {
        return prev;
      }
      
      return prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category];
    });
  };

  return (
    <div className="relative">
      <div className="p-4 md:p-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-kefalonia-text">
            Kefalonia Explorer
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the beautiful island of Kefalonia with our interactive map. Click on pins to learn more about each location.
          </p>
        </div>

        <CategoryFilter 
          activeCategories={activeCategories}
          onCategoryToggle={handleCategoryToggle}
        />

        <div ref={mapContainerRef} className="map-container rounded-xl shadow-xl overflow-hidden">
          <LeafletMap
            selectedPinId={selectedPinId}
            onPinClick={handlePinClick}
            activeCategories={activeCategories}
            config={mapConfig}
          />
        </div>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          <p>Click on the pins to learn more about each location. Use the filters above to show specific categories.</p>
        </div>
      </div>

      <LocationPopup 
        location={selectedLocation} 
        onClose={handleClosePopup} 
      />
    </div>
  );
};

export default KefaloniaMap;
