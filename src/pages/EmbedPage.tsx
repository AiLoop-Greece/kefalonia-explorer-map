
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import EmbeddableMap from '@/components/EmbeddableMap';
import { parseEmbedParams } from '@/utils/embed-utils';

const EmbedPage: React.FC = () => {
  const location = useLocation();
  const config = parseEmbedParams(location.search);
  
  useEffect(() => {
    // Prevent scrolling of the parent page when interacting with the map
    const preventScroll = (e: MessageEvent) => {
      if (e.data === 'preventScroll') {
        document.body.style.overflow = 'hidden';
      } else if (e.data === 'allowScroll') {
        document.body.style.overflow = '';
      }
    };
    
    window.addEventListener('message', preventScroll);
    return () => window.removeEventListener('message', preventScroll);
  }, []);
  
  return (
    <div className="h-full w-full">
      <EmbeddableMap config={config} isEmbedded={true} />
    </div>
  );
};

export default EmbedPage;
