
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import EmbeddableMap from '@/components/EmbeddableMap';
import { parseEmbedParams } from '@/utils/embed-utils';
import 'leaflet/dist/leaflet.css'; // Ensure Leaflet CSS is directly included

const EmbedPage: React.FC = () => {
  const location = useLocation();
  const config = parseEmbedParams(location.search);
  
  useEffect(() => {
    // Let parent know iframe is ready
    if (window.parent) {
      window.parent.postMessage({ type: 'MAP_EMBED_READY' }, '*');
    }
    
    // Prevent scrolling of the parent page when interacting with the map
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === 'preventScroll') {
        document.body.style.overflow = 'hidden';
      } else if (e.data?.type === 'allowScroll') {
        document.body.style.overflow = '';
      }
    };
    
    window.addEventListener('message', handleMessage);
    
    // Handle errors for debugging
    const handleError = (event: ErrorEvent) => {
      console.error('Embed error:', event.message);
      if (window.parent) {
        window.parent.postMessage({ 
          type: 'MAP_EMBED_ERROR', 
          error: event.message 
        }, '*');
      }
    };
    
    window.addEventListener('error', handleError);
    
    return () => {
      window.removeEventListener('message', handleMessage);
      window.removeEventListener('error', handleError);
    };
  }, []);
  
  return (
    <div className="h-full w-full overflow-hidden">
      <EmbeddableMap config={config} isEmbedded={true} />
    </div>
  );
};

export default EmbedPage;
