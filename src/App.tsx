import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SeaLoadingScreen from "./components/SeaLoadingScreen";
import SeaTransition from "./components/SeaTransition";

const queryClient = new QueryClient();

// Component to handle route transitions
const AppContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showStartButton, setShowStartButton] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isRouteTransitioning, setIsRouteTransitioning] = useState(false);
  const location = useLocation();

  // Simulate initial loading with slower, more immersive timing
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowStartButton(true);
      setIsLoading(false); // Set loading to false when start button should appear
    }, 4000); // Slower loading time for more immersive experience
    return () => clearTimeout(timer);
  }, []);

  // Handle route changes
  useEffect(() => {
    if (hasStarted) {
      setIsRouteTransitioning(true);
      const timer = setTimeout(() => {
        setIsRouteTransitioning(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, hasStarted]);

  const handleStart = () => {
    setIsTransitioning(true);
    setShowStartButton(false);
    
    // Show "Diving into the depths..." for exactly 2 seconds
    setTimeout(() => {
      setHasStarted(true);
      setIsLoading(false);
      setIsTransitioning(false);
    }, 2000); // Exactly 2 seconds as requested
  };

  // Show loading screen initially
  if (!hasStarted) {
    return (
      <>
        <SeaLoadingScreen 
          onStart={handleStart} 
          isLoading={isLoading}
        />
        <SeaTransition 
          isActive={isTransitioning} 
          type="enter"
          onComplete={() => {
            // Transition completed, main content will show
          }}
        />
      </>
    );
  }

  // Show main application with route transition
  return (
    <div className={`transition-opacity duration-1000 ease-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
      <Routes>
        <Route path="/" element={<Index />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <SeaTransition 
        isActive={isRouteTransitioning} 
        type="exit"
        onComplete={() => {
          // Route transition completed
        }}
      />
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
