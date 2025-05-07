
import { MapConfigProps } from '../components/LeafletMap';

export type MapEmbedConfig = MapConfigProps;

export const generateEmbedCode = (config: MapEmbedConfig = {}) => {
  // Convert config to query parameters
  const params = new URLSearchParams();
  
  Object.entries(config).forEach(([key, value]) => {
    // Only add parameters that have values
    if (value !== undefined && value !== null) {
      params.append(key, value.toString());
    }
  });
  
  const queryString = params.toString();
  // Use encodeURI to ensure special characters are properly encoded
  const embedUrl = `${window.location.origin}/embed${queryString ? `?${queryString}` : ''}`;
  
  return `<iframe
  src="${embedUrl}"
  width="${config.width || '100%'}"
  height="${config.height || '500px'}"
  style="border: none; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);"
  title="Kefalonia Explorer Map"
  allow="fullscreen"
  referrerpolicy="origin"
  loading="lazy"
  crossorigin="anonymous"
  allowfullscreen
></iframe>

<script>
// Handle communication with the embedded map
window.addEventListener('message', function(e) {
  // Accept messages from any origin since the embed might be on different domains
  if (e.data?.type === 'MAP_EMBED_READY') {
    console.log('Embedded map is ready');
  }
  else if (e.data?.type === 'MAP_EMBED_ERROR') {
    console.error('Embedded map error:', e.data.error);
  }
});
</script>`;
};

// Parse query parameters into config object
export const parseEmbedParams = (queryString: string): MapEmbedConfig => {
  const params = new URLSearchParams(queryString);
  const config: MapEmbedConfig = {};
  
  // Extract parameters
  if (params.has('height')) config.height = params.get('height') || undefined;
  if (params.has('width')) config.width = params.get('width') || undefined;
  
  // Boolean parameters
  if (params.has('showAttribution')) config.showAttribution = params.get('showAttribution') === 'true';
  if (params.has('showZoomControl')) config.showZoomControl = params.get('showZoomControl') === 'true';
  if (params.has('showResetView')) config.showResetView = params.get('showResetView') === 'true';
  if (params.has('showCategories')) config.showCategories = params.get('showCategories') === 'true';
  if (params.has('showLogo')) config.showLogo = params.get('showLogo') === 'true';
  
  // Style parameters
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
