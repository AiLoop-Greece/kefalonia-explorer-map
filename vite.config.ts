
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
        // Configure output for the embed bundle
        entryFileNames: (chunkInfo) => {
          return chunkInfo.name === 'embed' 
            ? 'embed-assets/embed.js' 
            : 'assets/[name]-[hash].js';
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          // Handle undefined name safely
          if (!assetInfo.name) {
            return 'assets/[name]-[hash].[ext]';
          }
          
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          
          // Put CSS for embed in embed-assets folder
          if (ext === 'css' && assetInfo.name.includes('leaflet')) {
            return 'embed-assets/leaflet.css';
          }
          return 'assets/[name]-[hash].[ext]';
        },
      },
    },
  },
}));
