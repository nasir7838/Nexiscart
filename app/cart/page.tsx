'use client';

import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, CreditCard } from "lucide-react";
import Link from "next/link";
import { useCart, type CartItem } from "../context/CartContext";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Define the type for the deal items in the cart
interface DealItem extends Omit<CartItem, 'quantity'> {
  quantity: number;
}

export default function CartPage() {
  const { 
    items = [] as CartItem[], 
    removeFromCart, 
    updateItemQuantity,
    clearCart, 
    total = 0, 
    itemCount = 0 
  } = useCart();
  const router = useRouter();
  
  const subtotal = total;
  const tax = subtotal * 0.08;
  const orderTotal = subtotal + tax;
  
  const handleCheckout = () => {
    router.push('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
        Shopping Cart
      </h1>

      {items.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingBag className="mx-auto h-16 w-16 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">Your cart is empty</h3>
          <p className="mt-1 text-gray-500">Start adding some items to your cart</p>
          <div className="mt-6">
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              <ArrowLeft className="-ml-1 mr-2 h-5 w-5" />
              Continue Shopping
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item: CartItem) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <ShoppingBag className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
                      <div className="flex items-center">
                        <button
                          onClick={() => updateItemQuantity(String(item.id), Math.max(1, (item.quantity || 1) - 1))}
                          className="p-1 rounded-full hover:bg-gray-100"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="mx-2 w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateItemQuantity(String(item.id), (item.quantity || 0) + 1)}
                          className="p-1 rounded-full hover:bg-gray-100"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-2 p-1 text-red-500 hover:text-red-700"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-gray-600">${item.price.toFixed(2)} each</p>
                      <p className="font-semibold text-lg mt-1">
                        Total: ${(item.price * (item.quantity || 1)).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-xl sticky top-8">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Subtotal ({itemCount} items)</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (8%)</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${orderTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <Button
                className="w-full mt-8 py-6 text-lg font-semibold bg-purple-600 hover:bg-purple-700 transition-colors"
                onClick={handleCheckout}
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Proceed to Checkout
              </Button>
              
              <p className="mt-4 text-center text-sm text-gray-500">
                or{' '}
                <Link 
                  href="/" 
                  className="font-medium text-purple-600 hover:text-purple-500 hover:underline"
                >
                  Continue Shopping
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
