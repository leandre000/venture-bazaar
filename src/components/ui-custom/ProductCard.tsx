
import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "@/context/StoreContext";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { Product } from "@/context/StoreContext";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
  isNew?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isNew = false }) => {
  const { addToCart } = useStore();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card group">
      <div className="relative">
        <div className="overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
            loading="lazy"
          />
        </div>
        {isNew && (
          <Badge className="absolute top-2 right-2 animate-fade-in bg-primary">New</Badge>
        )}
        <div className="absolute bottom-0 left-0 w-full p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Button 
            className="w-full shadow-md"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="line-clamp-1 text-lg font-medium transition-colors">{product.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{product.category}</p>
        <p className="mt-2 font-medium">{formatCurrency(product.price)}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
