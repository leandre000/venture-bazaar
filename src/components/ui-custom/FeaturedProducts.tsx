
import React from "react";
import { useStore } from "@/context/StoreContext";
import { Skeleton } from "@/components/ui/skeleton";
import ProductCard from "./ProductCard";

const FeaturedProducts: React.FC = () => {
  const { products, loading } = useStore();
  const featuredProducts = products.slice(0, 4);

  return (
    <section className="py-12">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight">Featured Products</h2>
        <p className="mt-4 text-muted-foreground">
          Discover our selection of exceptional products curated just for you.
        </p>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="product-card">
              <Skeleton className="aspect-square w-full" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} isNew={product.id === "2"} />
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedProducts;
