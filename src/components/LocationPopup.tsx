
import React, { useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { X, MapPin, Clock, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Location } from "@/data/kefalonia-data";
import gsap from "gsap";

interface LocationPopupProps {
  location: Location | null;
  onClose: () => void;
}

const LocationPopup: React.FC<LocationPopupProps> = ({ location, onClose }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Animate content when popup opens
  useEffect(() => {
    if (location && contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );
    }
  }, [location]);

  if (!location) return null;

  return (
    <Dialog open={!!location} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-2xl overflow-hidden p-0 bg-white rounded-xl">
        <div className="relative">
          <button 
            onClick={onClose}
            className="absolute right-2 top-2 z-10 rounded-full bg-white/80 p-1"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Content */}
          <div ref={contentRef} className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className={`inline-block w-2 h-2 rounded-full bg-kefalonia-secondary`}></span>
              <span className="text-xs uppercase font-semibold text-kefalonia-secondary tracking-wider">{location.category}</span>
            </div>
            
            <DialogTitle className="text-2xl font-bold mb-3 text-kefalonia-text">
              {location.name}
            </DialogTitle>
            
            <DialogDescription className="text-muted-foreground mb-4">
              {location.description}
            </DialogDescription>
            
            <div className="space-y-4 text-kefalonia-text">
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
            
            <div className="mt-6">
              <Button onClick={onClose} variant="secondary" className="w-full">
                Close
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LocationPopup;
