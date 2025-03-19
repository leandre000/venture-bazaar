
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Category {
  name: string;
  description: string;
  image: string;
  slug: string;
}

const categories: Category[] = [
  {
    name: "Electronics",
    description: "Cutting-edge gadgets and tech accessories",
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    slug: "electronics",
  },
  {
    name: "Furniture",
    description: "Elegant and functional pieces for your home",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    slug: "furniture",
  },
  {
    name: "Home & Living",
    description: "Stylish essentials for modern living",
    image: "https://images.unsplash.com/photo-1584346133934-a3a4db8d3daf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    slug: "home",
  },
];

const CategorySection: React.FC = () => {
  return (
    <section className="py-12">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight">Browse Categories</h2>
        <p className="mt-4 text-muted-foreground">
          Explore our wide range of product categories
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.slug}
            to={`/category/${category.slug}`}
            className="group overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:shadow-md"
          >
            <div className="relative h-60 overflow-hidden">
              <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full p-4 text-white">
                <h3 className="text-xl font-semibold">{category.name}</h3>
                <p className="mt-1 text-sm text-white/80">{category.description}</p>
                <Button
                  variant="ghost"
                  className="mt-3 px-0 text-white hover:bg-transparent hover:text-white"
                >
                  View Products <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
