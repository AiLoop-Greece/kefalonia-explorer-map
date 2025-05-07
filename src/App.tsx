
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import EmbedPage from "./pages/EmbedPage";
import EmbedBuilder from "./pages/EmbedBuilder";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Check if this is running in an embed context
const isEmbedContext = window.location.pathname === '/embed' || 
                        window.location.pathname === '/embed.html';

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* Only show toasts in non-embed contexts */}
      {!isEmbedContext && (
        <>
          <Toaster />
          <Sonner />
        </>
      )}
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/embed" element={<EmbedPage />} />
          <Route path="/embed.html" element={<EmbedPage />} /> {/* Alternative path */}
          <Route path="/embed-builder" element={<EmbedBuilder />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
