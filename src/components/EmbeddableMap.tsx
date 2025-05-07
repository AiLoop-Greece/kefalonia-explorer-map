
import React, { useState, useEffect } from 'react';
import LeafletMap, { MapConfigProps } from './LeafletMap';
import { locations, categories } from '@/data/kefalonia-data';
import LocationPopup from './LocationPopup';
import EmbedLocationPopup from './EmbedLocationPopup';
import CategoryFilter from './CategoryFilter';

export interface EmbeddableMapProps {
  config?: MapConfigProps;
  isEmbedded?: boolean;
}

const EmbeddableMap: React.FC<EmbeddableMapProps> = ({ 
  config = {},
  isEmbedded = false
}) => {
  const [selectedPinId, setSelectedPinId] = useState<number | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [activeCategories, setActiveCategories] = useState<string[]>(
    categories.map(c => c.name)
  );
  const [mapReady, setMapReady] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

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
  
  // Notify parent when component mounts
  useEffect(() => {
    if (isEmbedded) {
      setMapReady(true);
      try {
        // Use * for origin to allow embedding on any site
        window.parent?.postMessage({ type: 'MAP_COMPONENT_MOUNTED' }, '*');
      } catch (err) {
        console.error('Error communicating with parent window:', err);
        setMapError('Failed to communicate with parent window');
      }
      
      // Set up error handler for the map
      const handleMapError = (event: ErrorEvent) => {
        console.error('Map error:', event.message);
        setMapError(event.message);
      };
      
      window.addEventListener('error', handleMapError);
      
      return () => {
        window.removeEventListener('error', handleMapError);
      };
    }
  }, [isEmbedded]);

  // Handle pin selection
  const handlePinClick = (id: number) => {
    setSelectedPinId(id);
    const location = locations.find(loc => loc.id === id) || null;
    setSelectedLocation(location);
    
    // Notify parent page to prevent scroll when popup is open
    if (isEmbedded && window.parent) {
      try {
        window.parent.postMessage({type: 'preventScroll'}, '*');
      } catch (err) {
        console.error('Error sending preventScroll message:', err);
      }
    }
  };

  // Close popup
  const handleClosePopup = () => {
    setSelectedPinId(null);
    setSelectedLocation(null);
    
    // Allow scrolling again when popup is closed
    if (isEmbedded && window.parent) {
      try {
        window.parent.postMessage({type: 'allowScroll'}, '*');
      } catch (err) {
        console.error('Error sending allowScroll message:', err);
      }
    }
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
    <div className="kefalonia-map-embed relative" style={{ height, width }}>
      <div className="relative h-full">
        {mapError && (
          <div className="absolute top-0 left-0 right-0 z-50 bg-red-100 border border-red-400 text-red-700 px-4 py-3 text-sm">
            Map error: {mapError}
          </div>
        )}
        
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
          <div className="kefalonia-map-logo absolute bottom-2 left-2 bg-white/80 px-2 py-1 text-xs rounded-md shadow-sm">
            Kefalonia Explorer
          </div>
        )}

        {/* Render appropriate popup based on embedding context */}
        {isEmbedded ? (
          <EmbedLocationPopup 
            location={selectedLocation}
            onClose={handleClosePopup}
          />
        ) : (
          <LocationPopup 
            location={selectedLocation}
            onClose={handleClosePopup}
          />
        )}
      </div>
    </div>
  );
};

export default EmbeddableMap;
