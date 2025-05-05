
import React from "react";
import KefaloniaMap from "@/components/KefaloniaMap";
import { Card, CardContent } from "@/components/ui/card";
import { Waves, MapPin } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <div className="container mx-auto py-8">
        <Card className="bg-white/80 backdrop-blur-sm border-none shadow-lg">
          <CardContent className="p-0">
            <KefaloniaMap />
          </CardContent>
        </Card>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-kefalonia-primary p-2 rounded-full">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-xl font-bold">About This Map</h2>
              </div>
              <p className="text-muted-foreground">
                This interactive map showcases the most beautiful and interesting locations 
                across the island of Kefalonia, Greece. Click on pins to discover beaches, 
                villages, historical sites, natural wonders, and landmarks. Each pin reveals 
                detailed information, travel tips, and stunning imagery.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-kefalonia-secondary p-2 rounded-full">
                  <Waves className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-xl font-bold">How To Use</h2>
              </div>
              <ul className="text-muted-foreground space-y-2">
                <li>• Click on any pin to view details about the location</li>
                <li>• Use the category filters to show only specific types of locations</li>
                <li>• Explore images, travel directions, and local tips for each destination</li>
                <li>• Perfect for planning your Kefalonia vacation itinerary</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <footer className="mt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 Kefalonia Explorer Map Module | Designed for embedding across multiple websites</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
