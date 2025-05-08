
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    cors: true, // Enable CORS for development
    headers: {
      // Allow embedding from any origin during development
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Credentials': 'true',
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
      'Cross-Origin-Embedder-Policy': 'credentialless',
    }
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        embed: path.resolve(__dirname, 'src/embed-main.tsx'),
      },
      output: {
        // Configure output for the embed bundle using non-hashed names for embed assets
        entryFileNames: (chunkInfo) => {
          return chunkInfo.name === 'embed' 
            ? 'embed-assets/embed.js' 
            : 'assets/[name]-[hash].js';
        },
        chunkFileNames: (chunkInfo) => {
          // Use predictable names for embed chunks
          if (chunkInfo.name && chunkInfo.name.includes('embed')) {
            return 'embed-assets/[name].js';
          }
          return 'assets/[name]-[hash].js';
        },
        assetFileNames: (assetInfo) => {
          // Handle undefined name safely
          if (!assetInfo.name) {
            return 'assets/[name]-[hash].[ext]';
          }
          
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          
          // Special handling for embed assets
          if (ext === 'css') {
            if (assetInfo.name.includes('leaflet')) {
              return 'embed-assets/leaflet.css';
            }
            if (assetInfo.name.includes('embed')) {
              return 'embed-assets/embed.css';
            }
          }
          
          // Special handling for Leaflet images and markers
          if (['png', 'jpg', 'svg'].includes(ext) && assetInfo.name.includes('leaflet')) {
            return 'embed-assets/images/[name].[ext]';
          }
          
          return 'assets/[name]-[hash].[ext]';
        },
      },
    },
    // Ensure sourcemaps are generated for easier debugging
    sourcemap: true,
    // Configure CORS headers in the built output
    outDir: 'dist',
    emptyOutDir: true
  },
}));
