import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import DynamicBackground from "@/components/ui/DynamicBackground";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative">
      <DynamicBackground />
      <Navigation />
      <main className="relative z-10 flex items-center justify-center min-h-[calc(100vh-128px)]">
        <div className="text-center space-y-6">
          <h1 className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-primary">404</h1>
          <p className="text-xl md:text-2xl text-muted-foreground">Oops! Page not found</p>
          <Button 
            onClick={() => window.location.href = '/'}
            size="lg"
            className="bg-primary hover:bg-primary/90"
          >
            Return to Home
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
