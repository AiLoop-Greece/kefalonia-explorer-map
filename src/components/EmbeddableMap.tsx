
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
  const [loadRetries, setLoadRetries] = useState(0);

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
  
  // Notify parent when component mounts and handle communication
  useEffect(() => {
    if (isEmbedded) {
      const notifyParent = () => {
        try {
          // Fix: Use correct postMessage format with targetOrigin as separate parameter
          window.parent?.postMessage({ 
            type: 'MAP_COMPONENT_MOUNTED',
            timestamp: new Date().toISOString()
          }, '*');
          setMapReady(true);
        } catch (err) {
          console.error('Error communicating with parent window:', err);
          setMapError('Failed to communicate with parent window');
          
          // Retry a few times
          if (loadRetries < 3) {
            setTimeout(() => {
              setLoadRetries(prev => prev + 1);
              notifyParent();
            }, 1000);
          }
        }
      };
      
      notifyParent();
      
      // Handle parent window health checks
      const handleParentMessage = (event: MessageEvent) => {
        if (event.data?.type === 'PING_EMBED') {
          try {
            event.source?.postMessage({
              type: 'PONG_EMBED',
              timestamp: new Date().toISOString()
            }, '*');
            console.log('Responded to health check');
          } catch (err) {
            console.error('Error responding to ping:', err);
          }
        }
      };
      
      window.addEventListener('message', handleParentMessage);
      
      // Set up error handler for the map
      const handleMapError = (event: ErrorEvent) => {
        console.error('Map error:', event.message);
        setMapError(event.message);
        
        try {
          window.parent?.postMessage({ 
            type: 'MAP_EMBED_ERROR', 
            error: event.message,
            timestamp: new Date().toISOString()
          }, '*');
        } catch (err) {
          console.error('Error sending error message:', err);
        }
      };
      
      window.addEventListener('error', handleMapError);
      
      return () => {
        window.removeEventListener('message', handleParentMessage);
        window.removeEventListener('error', handleMapError);
      };
    }
  }, [isEmbedded, loadRetries]);

  // Handle pin selection with improved error handling
  const handlePinClick = (id: number) => {
    try {
      setSelectedPinId(id);
      const location = locations.find(loc => loc.id === id) || null;
      setSelectedLocation(location);
      
      // Notify parent page to prevent scroll when popup is open
      if (isEmbedded && window.parent) {
        window.parent.postMessage({
          type: 'MAP_POPUP_OPENED',
          locationId: id,
          locationName: location?.name,
          timestamp: new Date().toISOString()
        }, '*');
      }
    } catch (err) {
      console.error('Error handling pin click:', err);
      setMapError('Error selecting location');
    }
  };

  // Close popup with improved error handling
  const handleClosePopup = () => {
    try {
      setSelectedPinId(null);
      setSelectedLocation(null);
      
      // Allow scrolling again when popup is closed
      if (isEmbedded && window.parent) {
        window.parent.postMessage({
          type: 'MAP_POPUP_CLOSED',
          timestamp: new Date().toISOString()
        }, '*');
      }
    } catch (err) {
      console.error('Error closing popup:', err);
    }
  };

  // Toggle category filter - Fixed the 'prev' variable reference issue
  const handleCategoryToggle = (category: string) => {
    setActiveCategories(currentCategories => {
      // Don't allow deactivating the last active category
      if (currentCategories.includes(category) && currentCategories.length === 1) {
        return currentCategories;
      }
      
      const updatedCategories = currentCategories.includes(category)
        ? currentCategories.filter(c => c !== category)
        : [...currentCategories, category];
      
      // Notify parent about category change
      if (isEmbedded && window.parent) {
        try {
          window.parent.postMessage({
            type: 'MAP_CATEGORY_CHANGED',
            categories: updatedCategories,
            timestamp: new Date().toISOString()
          }, '*');
        } catch (err) {
          console.error('Error sending category change message:', err);
        }
      }
      
      return updatedCategories;
    });
  };
  
  // Handle map retry if there was an error
  const handleRetry = () => {
    setMapError(null);
    setMapReady(false);
    setLoadRetries(0);
    
    // Force a re-render
    setTimeout(() => {
      setMapReady(true);
    }, 100);
  };

  return (
    <div className="kefalonia-map-embed relative" style={{ height, width }}>
      <div className="relative h-full">
        {mapError && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-red-50 bg-opacity-90 p-4">
            <p className="text-red-700 text-center mb-4">
              Map error: {mapError}
            </p>
            <button 
              onClick={handleRetry}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
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
