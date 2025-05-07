
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
  // Replace with your production domain in production
  const baseEmbedUrl = window.location.origin;
  const embedPath = '/embed.html'; // Direct HTML file instead of a route
  const embedUrl = `${baseEmbedUrl}${embedPath}${queryString ? `?${queryString}` : ''}`;
  
  return `<!-- Kefalonia Explorer Map Embed -->
<div id="kefalonia-map-container" style="width: ${config.width || '100%'}; height: ${config.height || '500px'}; position: relative;">
  <iframe
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
    // Fallback content in case iframe fails to load
    var container = document.getElementById('kefalonia-map-container');
    var iframe = container.querySelector('iframe');
    var fallbackTimer = setTimeout(function() {
      if (container && iframe) {
        // Create fallback content if iframe fails to load in 10 seconds
        var fallback = document.createElement('div');
        fallback.innerHTML = '<div style="text-align: center; padding: 40px 20px; background: #f8f9fa; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; border-radius: 12px;"><p style="margin-bottom: 20px;">Unable to load Kefalonia Explorer Map</p><a href="${baseEmbedUrl}" target="_blank" style="display: inline-block; background: #4A6FA5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px;">View Map in New Window</a></div>';
        container.appendChild(fallback);
        iframe.style.opacity = '0';
      }
    }, 10000);

    // Handle iframe load success
    iframe.addEventListener('load', function() {
      clearTimeout(fallbackTimer);
      iframe.style.opacity = '1';
    });

    // Handle communication with the embedded map
    window.addEventListener('message', function(e) {
      if (e.data?.type === 'MAP_EMBED_READY') {
        clearTimeout(fallbackTimer);
        console.log('Kefalonia map loaded successfully');
      }
      else if (e.data?.type === 'MAP_EMBED_ERROR') {
        console.error('Kefalonia map error:', e.data.error);
      }
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
