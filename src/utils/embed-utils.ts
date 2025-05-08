
import { MapConfigProps } from '../components/LeafletMap';

export type MapEmbedConfig = MapConfigProps;

export const generateEmbedCode = (config: MapEmbedConfig = {}) => {
  // Convert config to query parameters
  const params = new URLSearchParams();
  
  Object.entries(config).forEach(([key, value]) => {
    // Only add parameters that have values
    if (value !== undefined && value !== null) {
      params.append(key, String(value));
    }
  });
  
  const queryString = params.toString();
  
  // Use absolute URL to ensure it works in all contexts
  const baseEmbedUrl = window.location.origin;
  const embedPath = '/embed.html'; // Direct HTML file instead of a route
  const embedUrl = `${baseEmbedUrl}${embedPath}${queryString ? `?${queryString}` : ''}`;
  
  // Generate a more robust embed code with better error handling
  return `<!-- Kefalonia Explorer Map Embed -->
<div id="kefalonia-map-container" style="width: ${config.width || '100%'}; height: ${config.height || '500px'}; position: relative;">
  <iframe
    id="kefalonia-map-iframe"
    src="${embedUrl}"
    width="100%"
    height="100%"
    style="border: none; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);"
    title="Kefalonia Explorer Map"
    loading="lazy"
    allow="fullscreen"
    allowfullscreen
  ></iframe>
  <script>
  (function() {
    // Improved embed handling script with retries and better error handling
    var container = document.getElementById('kefalonia-map-container');
    var iframe = document.getElementById('kefalonia-map-iframe');
    var mapLoaded = false;
    var lastPingTime = Date.now();
    var pingInterval;
    
    // Show a fallback message if the iframe fails to load
    function showFallback(message) {
      if (container && iframe) {
        var fallback = document.createElement('div');
        fallback.innerHTML = '<div style="text-align: center; padding: 40px 20px; background: #f8f9fa; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; border-radius: 12px;"><p style="margin-bottom: 20px;">' + message + '</p><a href="${baseEmbedUrl}" target="_blank" style="display: inline-block; background: #4A6FA5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px;">View Map in New Window</a></div>';
        container.appendChild(fallback);
        iframe.style.display = 'none';
      }
    }
    
    // Set timeout for initial load
    var loadTimeout = setTimeout(function() {
      if (!mapLoaded) {
        showFallback('Unable to load Kefalonia Explorer Map');
      }
    }, 10000);
    
    // Ping the iframe regularly to check if it's still responsive
    function startPingInterval() {
      pingInterval = setInterval(function() {
        try {
          iframe.contentWindow.postMessage({ type: 'PING_EMBED' }, '*');
          
          // Check if we haven't received a pong in a while
          if (Date.now() - lastPingTime > 30000) {
            console.warn('Map embed unresponsive');
            showFallback('Map is unresponsive. Please refresh the page.');
            clearInterval(pingInterval);
          }
        } catch (e) {
          console.error('Error pinging map iframe:', e);
        }
      }, 15000);
    }
    
    // Handle iframe load success
    iframe.addEventListener('load', function() {
      console.log('Kefalonia map iframe loaded');
      clearTimeout(loadTimeout);
    });
    
    // Handle communication with the embedded map
    window.addEventListener('message', function(e) {
      if (e.data) {
        if (e.data.type === 'MAP_EMBED_READY') {
          clearTimeout(loadTimeout);
          mapLoaded = true;
          console.log('Kefalonia map loaded successfully');
          startPingInterval();
        }
        else if (e.data.type === 'MAP_EMBED_ERROR') {
          console.error('Kefalonia map error:', e.data.error);
          if (e.data.fatal) {
            showFallback('Error loading map: ' + e.data.error);
          }
        }
        else if (e.data.type === 'PONG_EMBED') {
          lastPingTime = Date.now();
        }
      }
    });
    
    // Clean up on page unload
    window.addEventListener('unload', function() {
      clearInterval(pingInterval);
      clearTimeout(loadTimeout);
    });
  })();
  </script>
</div>`;
};

// Parse query parameters into config object
export const parseEmbedParams = (queryString: string): MapEmbedConfig => {
  const params = new URLSearchParams(queryString);
  const config: MapEmbedConfig = {};
  
  // Extract parameters with proper type handling
  if (params.has('height')) config.height = params.get('height') || undefined;
  if (params.has('width')) config.width = params.get('width') || undefined;
  
  // Boolean parameters need explicit conversion
  if (params.has('showAttribution')) config.showAttribution = params.get('showAttribution') === 'true';
  if (params.has('showZoomControl')) config.showZoomControl = params.get('showZoomControl') === 'true';
  if (params.has('showResetView')) config.showResetView = params.get('showResetView') === 'true';
  if (params.has('showCategories')) config.showCategories = params.get('showCategories') === 'true';
  if (params.has('showLogo')) config.showLogo = params.get('showLogo') === 'true';
  
  // Style parameters with validation
  const mapStyle = params.get('mapStyle');
  if (mapStyle && ['default', 'satellite', 'terrain'].includes(mapStyle)) {
    config.mapStyle = mapStyle as 'default' | 'satellite' | 'terrain';
  }
  
  const pinStyle = params.get('pinStyle');
  if (pinStyle && ['modern', 'classic'].includes(pinStyle)) {
    config.pinStyle = pinStyle as 'modern' | 'classic';
  }
  
  return config;
};

// New utility for health checking embeds
export const checkEmbedHealth = (embedId: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const iframe = document.getElementById(embedId) as HTMLIFrameElement;
    
    if (!iframe || !iframe.contentWindow) {
      resolve(false);
      return;
    }
    
    // Set up a listener for the response
    const messageHandler = (event: MessageEvent) => {
      if (event.data && event.data.type === 'PONG_EMBED') {
        window.removeEventListener('message', messageHandler);
        resolve(true);
      }
    };
    
    window.addEventListener('message', messageHandler);
    
    // Send ping message to iframe
    try {
      iframe.contentWindow.postMessage({ type: 'PING_EMBED' }, '*');
      
      // Timeout after 5 seconds
      setTimeout(() => {
        window.removeEventListener('message', messageHandler);
        resolve(false);
      }, 5000);
    } catch (e) {
      console.error('Error pinging iframe:', e);
      window.removeEventListener('message', messageHandler);
      resolve(false);
    }
  });
};
