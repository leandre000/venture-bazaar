
import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/context/StoreContext";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  loading = false 
}) => {
  // Define how many skeleton cards to display when loading
  const skeletonCount = 8;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {loading
        ? Array.from({ length: skeletonCount }).map((_, index) => (
            <div key={index} className="product-card">
              <Skeleton className="aspect-square w-full" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            </div>
          ))
        : products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
    </div>
  );
};

export default ProductGrid;
