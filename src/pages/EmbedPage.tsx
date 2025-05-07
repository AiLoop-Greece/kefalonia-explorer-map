
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import EmbeddableMap from '@/components/EmbeddableMap';
import { parseEmbedParams } from '@/utils/embed-utils';

// Ensure Leaflet CSS is directly included
import 'leaflet/dist/leaflet.css';

const EmbedPage: React.FC = () => {
  const location = useLocation();
  const config = parseEmbedParams(location.search);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
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
        window.parent.postMessage({ type: 'MAP_EMBED_READY' }, '*');
        console.log('Sent ready message to parent');
      } catch (err) {
        console.error('Failed to send ready message:', err);
      }
    };
    
    // Try sending the ready message immediately
    sendReadyMessage();
    
    // Also try sending it after a short delay to ensure everything is loaded
    const readyTimer = setTimeout(sendReadyMessage, 500);
    
    // Prevent scrolling of the parent page when interacting with the map
    const handleMessage = (e: MessageEvent) => {
      try {
        if (e.data?.type === 'preventScroll') {
          document.body.style.overflow = 'hidden';
        } else if (e.data?.type === 'allowScroll') {
          document.body.style.overflow = '';
        }
      } catch (err) {
        console.error('Error handling message:', err);
      }
    };
    
    window.addEventListener('message', handleMessage);
    
    // Handle errors for debugging
    const handleError = (event: ErrorEvent) => {
      const errorMsg = `Embed error: ${event.message}`;
      console.error(errorMsg);
      setErrorMessage(errorMsg);
      
      try {
        window.parent.postMessage({ 
          type: 'MAP_EMBED_ERROR', 
          error: event.message 
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
      <EmbeddableMap config={config} isEmbedded={true} />
    </div>
  );
};

export default EmbedPage;
