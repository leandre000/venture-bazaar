
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  className,
  fullWidth = false
}) => {
  const location = useLocation();

  // Scroll to top when navigating to a new page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main 
        className={cn(
          "flex-1 pt-16 page-transition",
          !fullWidth && "container mx-auto px-4 py-8 md:px-6 md:py-12",
          className
        )}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
