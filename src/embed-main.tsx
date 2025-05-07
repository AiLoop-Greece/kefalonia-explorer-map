
// This is a specialized entry point for embedded maps
import { createRoot } from 'react-dom/client';
import EmbedPage from './pages/EmbedPage';
import './index.css';

// Import Leaflet CSS explicitly
import 'leaflet/dist/leaflet.css';

// Simplified mount for embed context
const root = createRoot(document.getElementById('embed-root')!);
root.render(<EmbedPage />);

// Notify parent when fully loaded
window.addEventListener('load', () => {
  try {
    window.parent.postMessage({ type: 'MAP_EMBED_READY' }, '*');
    console.log('Map embed fully loaded');
  } catch (err) {
    console.error('Error sending ready message:', err);
  }
});

// Global error handler
window.addEventListener('error', (event) => {
  console.error('Embed error:', event.message);
  try {
    window.parent.postMessage({ 
      type: 'MAP_EMBED_ERROR', 
      error: event.message 
    }, '*');
  } catch (err) {
    console.error('Error sending error message:', err);
  }
});
