
import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

// Product type definition
export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
};

// Cart item type definition
export type CartItem = {
  product: Product;
  quantity: number;
};

// Context type definition
type StoreContextType = {
  products: Product[];
  cart: CartItem[];
  loading: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
};

// Sample product data
const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    description: "Immerse yourself in crystal-clear sound with these premium wireless headphones, featuring active noise cancellation and 30 hours of battery life.",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "electronics"
  },
  {
    id: "2",
    name: "Smart Watch Series 5",
    description: "Stay connected and track your fitness with this elegant smartwatch featuring health monitoring, GPS, and a stunning always-on display.",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "electronics"
  },
  {
    id: "3",
    name: "Ultra-Slim Laptop Pro",
    description: "Power through your workday with this ultra-slim laptop featuring a powerful processor, stunning display, and all-day battery life.",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "electronics"
  },
  {
    id: "4",
    name: "Ergonomic Office Chair",
    description: "Work in comfort with this ergonomic office chair, designed to provide optimal support for long hours at your desk.",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "furniture"
  },
  {
    id: "5",
    name: "Minimalist Wooden Desk",
    description: "Enhance your workspace with this sleek, minimalist wooden desk that combines functionality with modern Scandinavian design.",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "furniture"
  },
  {
    id: "6",
    name: "Air Purifier Premium",
    description: "Breathe cleaner air with this advanced air purifier that removes 99.97% of particles, allergens, and odors from your home or office.",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "home"
  },
  {
    id: "7",
    name: "Designer Coffee Table",
    description: "Make a statement with this designer coffee table that combines tempered glass and natural wood for a touch of modern elegance.",
    price: 499.99,
    image: "https://images.unsplash.com/photo-1532372576444-dda954194ad0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "furniture"
  },
  {
    id: "8",
    name: "Premium Mechanical Keyboard",
    description: "Enhance your typing experience with this premium mechanical keyboard featuring customizable RGB lighting and satisfying tactile feedback.",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "electronics"
  }
];

// Create context with a default value
const StoreContext = createContext<StoreContextType | undefined>(undefined);

// Provider component
export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Load products
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts(sampleProducts);
      setLoading(false);
    }, 1000);

    // Load cart from local storage
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add to cart
  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      
      if (existingItem) {
        const updatedCart = prevCart.map(item => 
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        
        toast({
          title: "Added to cart",
          description: `${product.name} quantity increased to ${existingItem.quantity + 1}`,
        });
        
        return updatedCart;
      } else {
        toast({
          title: "Added to cart",
          description: `${product.name} added to your cart`,
        });
        
        return [...prevCart, { product, quantity: 1 }];
      }
    });
  };

  // Remove from cart
  const removeFromCart = (productId: string) => {
    setCart(prevCart => {
      const updatedCart = prevCart.filter(item => item.product.id !== productId);
      
      toast({
        title: "Removed from cart",
        description: "Item removed from your cart",
      });
      
      return updatedCart;
    });
  };

  // Update quantity
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    });
  };

  // Get cart total
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  // Get cart count
  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  // Context value
  const value = {
    products,
    cart,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
};

// Custom hook to use the store context
export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};
