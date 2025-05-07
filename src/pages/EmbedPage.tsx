
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import EmbeddableMap from '@/components/EmbeddableMap';
import { parseEmbedParams } from '@/utils/embed-utils';

// Explicitly import Leaflet CSS here to ensure it's available
import 'leaflet/dist/leaflet.css';

const EmbedPage: React.FC = () => {
  const location = useLocation();
  const config = parseEmbedParams(location.search);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Apply embed-specific styles to the page
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';
    document.body.style.width = '100%';
    
    // Let parent know iframe is ready
    const sendReadyMessage = () => {
      try {
        window.parent.postMessage({ 
          type: 'MAP_EMBED_READY',
          timestamp: new Date().toISOString()
        }, '*');
        console.log('Map embed ready message sent to parent');
        setIsLoaded(true);
      } catch (err) {
        console.error('Failed to send ready message:', err);
        setErrorMessage('Communication error: Unable to send ready message to parent page');
      }
    };
    
    // Send immediately and after a delay to ensure it's received
    sendReadyMessage();
    const readyTimer = setTimeout(sendReadyMessage, 1000);
    
    // Handle messages from parent
    const handleMessage = (e: MessageEvent) => {
      try {
        if (e.data?.type === 'PARENT_ACKNOWLEDGED') {
          console.log('Parent acknowledged embed');
        }
      } catch (err) {
        console.error('Error handling message:', err);
      }
    };
    
    window.addEventListener('message', handleMessage);
    
    // Error handling
    const handleError = (event: ErrorEvent) => {
      const errorMsg = `Map embedding error: ${event.message}`;
      console.error(errorMsg);
      setErrorMessage(errorMsg);
      
      try {
        window.parent.postMessage({ 
          type: 'MAP_EMBED_ERROR', 
          error: event.message,
          timestamp: new Date().toISOString()
        }, '*');
      } catch (err) {
        console.error('Failed to send error message:', err);
      }
    };
    
    window.addEventListener('error', handleError);
    
    // Cleanup function
    return () => {
      window.removeEventListener('message', handleMessage);
      window.removeEventListener('error', handleError);
      clearTimeout(readyTimer);
      document.body.style.overflow = '';
    };
  }, []);
  
  return (
    <div className="h-full w-full overflow-hidden">
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{errorMessage}</span>
        </div>
      )}
      
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-80 z-10">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary mr-3"></div>
          <span>Loading map...</span>
        </div>
      )}
      
      <EmbeddableMap config={config} isEmbedded={true} />
    </div>
  );
};

export default EmbedPage;
