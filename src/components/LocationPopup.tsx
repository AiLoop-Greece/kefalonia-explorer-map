
import React, { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { X, ArrowLeft, ArrowRight, MapPin, Clock, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Location } from "@/data/kefalonia-data";
import gsap from "gsap";

interface LocationPopupProps {
  location: Location | null;
  onClose: () => void;
}

const LocationPopup: React.FC<LocationPopupProps> = ({ location, onClose }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Reset active image when location changes
  useEffect(() => {
    setActiveImageIndex(0);
  }, [location?.id]);
  
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
  
  // Image carousel controls
  const nextImage = () => {
    if (location.images.length > 1) {
      setActiveImageIndex((prev) => (prev + 1) % location.images.length);
    }
  };
  
  const prevImage = () => {
    if (location.images.length > 1) {
      setActiveImageIndex((prev) => (prev - 1 + location.images.length) % location.images.length);
    }
  };

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
          
          {/* Image carousel */}
          <div className="relative h-[300px] w-full overflow-hidden">
            {location.images.map((img, i) => (
              <div 
                key={i} 
                className={`absolute inset-0 transition-opacity duration-500 ${i === activeImageIndex ? 'opacity-100' : 'opacity-0'}`}
              >
                <img
                  src={img}
                  alt={`${location.name} - image ${i + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
            
            {/* Image navigation buttons */}
            {location.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/20 p-1.5 text-white hover:bg-black/40"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/20 p-1.5 text-white hover:bg-black/40"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
                
                {/* Image indicators */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
                  {location.images.map((_, i) => (
                    <button
                      key={i}
                      className={`h-1.5 rounded-full ${
                        i === activeImageIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/50'
                      } transition-all duration-300`}
                      onClick={() => setActiveImageIndex(i)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Content */}
          <div ref={contentRef} className="pin-content p-6">
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
