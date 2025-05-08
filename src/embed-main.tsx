
// This is a specialized entry point for embedded maps
import { createRoot } from 'react-dom/client';
import EmbedPage from './pages/EmbedPage';
import './index.css';

// Import Leaflet CSS explicitly
import 'leaflet/dist/leaflet.css';

// Safety check for the root element
const rootElement = document.getElementById('embed-root');
if (!rootElement) {
  console.error('Fatal: Could not find embed-root element');
  
  // Try to show an error message even if the root is missing
  try {
    document.body.innerHTML = `
      <div style="padding: 20px; text-align: center; font-family: sans-serif;">
        <p>Error: Map container not found</p>
      </div>
    `;
  } catch (err) {
    // Last resort - can't do anything if body manipulation fails
  }
} else {
  try {
    // Simplified mount for embed context
    const root = createRoot(rootElement);
    
    // Render with error boundary
    root.render(<EmbedPage />);
    
    // Notify parent when fully loaded with retries
    let messageAttempts = 0;
    const sendReadyMessage = () => {
      try {
        window.parent.postMessage({ 
          type: 'MAP_EMBED_READY', 
          timestamp: new Date().toISOString() 
        }, '*');
        console.log('Map embed ready message sent');
        
        // Retry a few times to ensure message is received
        messageAttempts++;
        if (messageAttempts < 3) {
          setTimeout(sendReadyMessage, 1000);
        }
      } catch (err) {
        console.error('Error sending ready message:', err);
      }
    };
    
    window.addEventListener('load', () => {
      setTimeout(sendReadyMessage, 500); // Short delay to ensure map is rendered
    });
    
    // Handle parent window visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        console.log('Embed visibility changed to visible');
        sendReadyMessage();
      }
    });
  } catch (err) {
    console.error('Fatal error in map initialization:', err);
    
    try {
      rootElement.innerHTML = `
        <div style="padding: 20px; text-align: center; background: #fff0f0; color: #e10000; font-family: sans-serif;">
          <p>Failed to initialize map</p>
          <p>${err.message || 'Unknown error'}</p>
          <button onclick="location.reload()" style="margin-top: 15px; padding: 8px 16px; background: #4A6FA5; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Retry
          </button>
        </div>
      `;
    } catch (innerErr) {
      console.error('Could not display error message:', innerErr);
    }
    
    // Notify parent of fatal error
    try {
      window.parent.postMessage({ 
        type: 'MAP_EMBED_ERROR', 
        error: err.message || 'Fatal initialization error',
        fatal: true,
        timestamp: new Date().toISOString()
      }, '*');
    } catch (msgErr) {
      console.error('Failed to send error message to parent:', msgErr);
    }
  }
}

// Global error handler
window.addEventListener('error', (event) => {
  console.error('Embed error:', event.message);
  try {
    window.parent.postMessage({ 
      type: 'MAP_EMBED_ERROR', 
      error: event.message,
      stack: event.error?.stack,
      timestamp: new Date().toISOString()
    }, '*');
  } catch (err) {
    console.error('Error sending error message:', err);
  }
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  try {
    window.parent.postMessage({ 
      type: 'MAP_EMBED_ERROR', 
      error: 'Promise error: ' + (event.reason?.message || 'Unknown promise error'),
      stack: event.reason?.stack,
      timestamp: new Date().toISOString()
    }, '*');
  } catch (err) {
    console.error('Error sending promise error message:', err);
  }
});
