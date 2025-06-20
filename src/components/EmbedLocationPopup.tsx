
import React, { useEffect } from 'react';
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { X, MapPin, Clock, Info } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Location } from "@/data/kefalonia-data";
import { useIsMobile } from '@/hooks/use-mobile';

interface EmbedLocationPopupProps {
  location: Location | null;
  onClose: () => void;
}

const EmbedLocationPopup: React.FC<EmbedLocationPopupProps> = ({ location, onClose }) => {
  const isMobile = useIsMobile();
  
  // Add class to body when popup is open to prevent scrolling
  useEffect(() => {
    if (location) {
      document.body.classList.add('overflow-hidden');
      
      // Inform parent window about popup state
      try {
        window.parent?.postMessage({
          type: 'MAP_POPUP_OPENED',
          locationId: location.id
        }, '*');
      } catch (error) {
        console.error('Error sending popup open message:', error);
      }
    } else {
      document.body.classList.remove('overflow-hidden');
      
      // Inform parent window about popup state
      try {
        window.parent?.postMessage({
          type: 'MAP_POPUP_CLOSED'
        }, '*');
      } catch (error) {
        console.error('Error sending popup close message:', error);
      }
    }
    
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [location]);

  if (!location) return null;

  // Use inline styles for the popup to ensure they work in embedded contexts
  const popupStyle = {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%', 
    zIndex: 9999,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'  // Add semi-transparent background
  };

  // Create popup with fixed positioning to ensure it covers the entire viewport
  return (
    <div style={popupStyle}>
      {isMobile ? (
        <Drawer open={!!location} onOpenChange={() => onClose()}>
          <DrawerContent className="p-0 max-h-[100vh] overflow-y-auto">
            <div className="relative">
              {/* Close button */}
              <button 
                onClick={onClose}
                className="absolute right-4 top-4 z-10 rounded-full bg-white/80 p-2 shadow-md"
                aria-label="Close details"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Content */}
              <div className="p-6 pb-24 sm:pb-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className={`inline-block w-2 h-2 rounded-full bg-kefalonia-secondary`}></span>
                  <span className="text-xs uppercase font-semibold text-kefalonia-secondary tracking-wider">
                    {location.category}
                  </span>
                </div>
                
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-kefalonia-text">
                  {location.name}
                </h2>
                
                <p className="text-muted-foreground mb-6">
                  {location.description}
                </p>
                
                <div className="space-y-6 text-kefalonia-text">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 mt-0.5 text-kefalonia-primary flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">How to Get There</h4>
                      <p className="text-sm">{location.howToGetThere}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 mt-0.5 text-kefalonia-primary flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Best Time to Visit</h4>
                      <p className="text-sm">{location.bestTime}</p>
                    </div>
                  </div>
                  
                  {location.tip && (
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 mt-0.5 text-kefalonia-primary flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold mb-1">Local Tip</h4>
                        <p className="text-sm">{location.tip}</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="fixed bottom-6 left-0 right-0 px-6 sm:relative sm:mt-8 sm:bottom-auto sm:px-0">
                  <Button onClick={onClose} variant="secondary" className="w-full">
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <Sheet open={!!location} onOpenChange={() => onClose()}>
          <SheetContent className="p-0 max-h-[100vh] overflow-y-auto w-full sm:max-w-full md:max-w-2xl" side="bottom">
            <div className="relative">
              {/* Close button */}
              <button 
                onClick={onClose}
                className="absolute right-4 top-4 z-10 rounded-full bg-white/80 p-2 shadow-md"
                aria-label="Close details"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Content */}
              <div className="p-6 pb-24 sm:pb-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className={`inline-block w-2 h-2 rounded-full bg-kefalonia-secondary`}></span>
                  <span className="text-xs uppercase font-semibold text-kefalonia-secondary tracking-wider">
                    {location.category}
                  </span>
                </div>
                
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-kefalonia-text">
                  {location.name}
                </h2>
                
                <p className="text-muted-foreground mb-6">
                  {location.description}
                </p>
                
                <div className="space-y-6 text-kefalonia-text">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 mt-0.5 text-kefalonia-primary flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">How to Get There</h4>
                      <p className="text-sm">{location.howToGetThere}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 mt-0.5 text-kefalonia-primary flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Best Time to Visit</h4>
                      <p className="text-sm">{location.bestTime}</p>
                    </div>
                  </div>
                  
                  {location.tip && (
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 mt-0.5 text-kefalonia-primary flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold mb-1">Local Tip</h4>
                        <p className="text-sm">{location.tip}</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="fixed bottom-6 left-0 right-0 px-6 sm:relative sm:mt-8 sm:bottom-auto sm:px-0">
                  <Button onClick={onClose} variant="secondary" className="w-full">
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
};

export default EmbedLocationPopup;
