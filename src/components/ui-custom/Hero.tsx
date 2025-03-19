
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  title?: string;
  subtitle?: string;
  imageUrl?: string;
  primaryAction?: {
    text: string;
    href: string;
  };
  secondaryAction?: {
    text: string;
    href: string;
  };
}

const Hero: React.FC<HeroProps> = ({
  title = "Elevate Your Lifestyle",
  subtitle = "Discover our curated collection of premium products designed to bring elegance and innovation to your everyday life.",
  imageUrl = "https://images.unsplash.com/photo-1555529771-122e5d9f2341?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
  primaryAction = {
    text: "Shop Now",
    href: "/shop",
  },
  secondaryAction = {
    text: "Learn More",
    href: "/about",
  },
}) => {
  return (
    <section className="relative h-[80vh] w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={imageUrl}
          alt="Hero background"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto flex h-full items-center px-4 md:px-6">
        <div className="max-w-xl animate-fade-in">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            {title}
          </h1>
          <p className="mt-4 text-xl text-white/90">{subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild size="lg" className="btn-hover-effect">
              <Link to={primaryAction.href}>
                {primaryAction.text}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white/10 text-white hover:bg-white/20">
              <Link to={secondaryAction.href}>{secondaryAction.text}</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Animated Gradient Accent */}
      <div className="absolute bottom-0 left-0 h-1 w-full overflow-hidden">
        <div className="animate-spin-slow h-full w-[200%] bg-gradient-to-r from-transparent via-primary to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
