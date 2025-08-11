'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowLeft, Package, Truck, ShieldCheck } from 'lucide-react';

export default function CheckoutSuccessPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-center">
      <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 max-w-2xl mx-auto">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
        <p className="text-gray-600 mb-8 text-lg">
          Thank you for your purchase. Your order has been received and is being processed.
        </p>
        
        <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
          <h2 className="font-semibold text-lg mb-4">What's Next?</h2>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-lg mr-4">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Order Processing</h3>
                <p className="text-gray-600 text-sm">We're preparing your items for shipment.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-lg mr-4">
                <Truck className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Shipping</h3>
                <p className="text-gray-600 text-sm">Your order will be shipped within 1-2 business days.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-lg mr-4">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Order Protection</h3>
                <p className="text-gray-600 text-sm">Your purchase is protected by our satisfaction guarantee.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
          
          <Link href="/account/orders/12345" className="w-full sm:w-auto">
            <Button className="w-full">
              View Order Status
            </Button>
          </Link>
        </div>
        
        <p className="mt-8 text-sm text-gray-500">
          Need help? <Link href="/contact" className="text-blue-600 hover:underline">Contact our support team</Link>
        </p>
      </div>
    </div>
  );
}
