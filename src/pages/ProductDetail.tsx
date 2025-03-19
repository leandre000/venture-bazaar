
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useStore } from "@/context/StoreContext";
import { Product } from "@/context/StoreContext";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ShoppingCart,
  Check,
  ArrowLeft,
  Plus,
  Minus,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import ProductGrid from "@/components/ui-custom/ProductGrid";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { products, addToCart, loading } = useStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!loading && products.length > 0 && id) {
      const foundProduct = products.find((p) => p.id === id) || null;
      setProduct(foundProduct);

      // Find similar products (same category)
      if (foundProduct) {
        const similar = products
          .filter(
            (p) =>
              p.category === foundProduct.category && p.id !== foundProduct.id
          )
          .slice(0, 4);
        setSimilarProducts(similar);
      }
    }
  }, [id, products, loading]);

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      setIsAdding(true);
      
      // Add the product to cart multiple times based on quantity
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      
      // Reset animation state after a delay
      setTimeout(() => {
        setIsAdding(false);
      }, 1500);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Skeleton className="aspect-square w-full rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="text-center">
          <h1 className="text-2xl font-bold">Product Not Found</h1>
          <p className="mt-4 text-muted-foreground">
            Sorry, the product you're looking for doesn't exist.
          </p>
          <Button asChild className="mt-6">
            <Link to="/shop">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Shop
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Button
        variant="ghost"
        asChild
        className="mb-8 inline-flex items-center text-muted-foreground"
      >
        <Link to="/shop">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Shop
        </Link>
      </Button>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        {/* Product Image */}
        <div className="overflow-hidden rounded-lg border border-border bg-card">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover object-center"
          />
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
            <p className="mt-2 text-2xl font-medium">{formatCurrency(product.price)}</p>
          </div>

          <p className="text-muted-foreground">{product.description}</p>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center">
              <span className="mr-4 font-medium">Quantity:</span>
              <div className="flex items-center rounded-md border border-border">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  className="h-9 w-9 rounded-none rounded-l-md"
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <div className="flex h-9 w-12 items-center justify-center text-center">
                  {quantity}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={increaseQuantity}
                  className="h-9 w-9 rounded-none rounded-r-md"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <Button
              onClick={handleAddToCart}
              className="w-full transition-all"
              disabled={isAdding}
            >
              {isAdding ? (
                <>
                  <Check className="mr-2 h-4 w-4 animate-scale-in" /> Added to Cart
                </>
              ) : (
                <>
                  <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </>
              )}
            </Button>
          </div>

          <Separator />

          <div>
            <p>
              <span className="font-medium">Category:</span>{" "}
              <span className="capitalize">{product.category}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-6 text-2xl font-bold tracking-tight">You might also like</h2>
          <ProductGrid products={similarProducts} />
        </div>
      )}
    </Layout>
  );
};

export default ProductDetail;
