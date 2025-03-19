
import React from "react";
import { useStore } from "@/context/StoreContext";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

interface CartSheetProps {
  children: React.ReactNode;
}

const CartSheet: React.FC<CartSheetProps> = ({ children }) => {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useStore();
  
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle className="text-lg">Shopping Cart</SheetTitle>
        </SheetHeader>
        
        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center space-y-4">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            <div className="text-center">
              <h3 className="text-lg font-medium">Your cart is empty</h3>
              <p className="text-sm text-muted-foreground">
                Add items to your cart to see them here.
              </p>
            </div>
            <SheetClose asChild>
              <Button asChild className="mt-4">
                <Link to="/shop">Continue Shopping</Link>
              </Button>
            </SheetClose>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-6">
              <ul className="-mx-6 divide-y divide-border">
                {cart.map((item) => (
                  <li key={item.product.id} className="flex px-6 py-4">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-border bg-secondary">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium">
                          <h3 className="line-clamp-1">
                            <Link to={`/product/${item.product.id}`}>
                              {item.product.name}
                            </Link>
                          </h3>
                          <p className="ml-4">{formatCurrency(item.product.price * item.quantity)}</p>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
                          {item.product.category}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-muted-foreground">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.product.id)}
                        >
                          <X className="mr-1 h-4 w-4" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-4">
              <Separator />
              <div className="flex items-center justify-between font-medium">
                <span>Subtotal</span>
                <span>{formatCurrency(getCartTotal())}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="flex flex-col space-y-2">
                <SheetClose asChild>
                  <Button asChild>
                    <Link to="/checkout">Checkout</Link>
                  </Button>
                </SheetClose>
                <Button variant="outline" onClick={clearCart}>
                  Clear Cart
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
