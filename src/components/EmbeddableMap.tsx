
import React, { useState } from 'react';
import LeafletMap, { MapConfigProps } from './LeafletMap';
import { locations, categories } from '@/data/kefalonia-data';
import LocationPopup from './LocationPopup';
import CategoryFilter from './CategoryFilter';
import { Card, CardContent } from '@/components/ui/card';

export interface EmbeddableMapProps {
  config?: MapConfigProps;
}

const EmbeddableMap: React.FC<EmbeddableMapProps> = ({ config = {} }) => {
  const [selectedPinId, setSelectedPinId] = useState<number | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [activeCategories, setActiveCategories] = useState<string[]>(
    categories.map(c => c.name)
  );

  const {
    height = "500px",
    width = "100%",
    showAttribution = true,
    showZoomControl = true,
    showResetView = true,
    showCategories = true,
    showLogo = true,
    mapStyle = "default",
    pinStyle = "modern"
  } = config;

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
    <div className="kefalonia-map-embed" style={{ height, width }}>
      <div className="relative h-full">
        {showCategories && (
          <div className="p-2">
            <CategoryFilter 
              activeCategories={activeCategories}
              onCategoryToggle={handleCategoryToggle}
            />
          </div>
        )}
        
        <div className="h-full">
          <LeafletMap
            selectedPinId={selectedPinId}
            onPinClick={handlePinClick}
            activeCategories={activeCategories}
            config={{
              height,
              width,
              showAttribution,
              showZoomControl,
              showResetView,
              mapStyle,
              pinStyle
            }}
          />
        </div>

        {showLogo && (
          <div className="kefalonia-map-logo">
            Kefalonia Explorer
          </div>
        )}

        <LocationPopup 
          location={selectedLocation} 
          onClose={handleClosePopup} 
        />
      </div>
    </div>
  );
};

export default EmbeddableMap;
