'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Package, Clock, CheckCircle, XCircle, Loader2 } from 'lucide-react';

type OrderStatus = 'not-found' | 'processing' | 'shipped' | 'delivered' | null;

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<OrderStatus>(null);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!orderId.trim() || !email.trim()) {
      setError('Please enter both order ID and email');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      try {
        // In a real app, you would validate the order ID and email with your backend
        // For demo purposes, we'll simulate different statuses based on the order ID
        if (orderId.toLowerCase().includes('invalid')) {
          setStatus('not-found');
        } else if (orderId.toLowerCase().includes('process')) {
          setStatus('processing');
        } else if (orderId.toLowerCase().includes('ship')) {
          setStatus('shipped');
        } else {
          setStatus('delivered');
        }
      } catch (error) {
        setError('An error occurred while tracking your order. Please try again.');
        console.error('Order tracking error:', error);
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  };

  const renderStatus = () => {
    if (!status) return null;

    const statusConfig = {
      'not-found': {
        icon: <XCircle className="w-12 h-12 text-red-500" />,
        title: 'Order Not Found',
        message: 'We could not find an order with the provided details. Please check your order ID and email and try again.',
        color: 'bg-red-50 text-red-700'
      },
      'processing': {
        icon: <Package className="w-12 h-12 text-blue-500" />,
        title: 'Order Processing',
        message: 'Your order is being processed and will be shipped soon.',
        color: 'bg-blue-50 text-blue-700'
      },
      'shipped': {
        icon: <Package className="w-12 h-12 text-yellow-500" />,
        title: 'Order Shipped',
        message: 'Your order has been shipped and is on its way to you!',
        color: 'bg-yellow-50 text-yellow-700'
      },
      'delivered': {
        icon: <CheckCircle className="w-12 h-12 text-green-500" />,
        title: 'Order Delivered',
        message: 'Your order has been successfully delivered!',
        color: 'bg-green-50 text-green-700'
      }
    };

    const { icon, title, message, color } = statusConfig[status];

    return (
      <div className={`mt-8 p-6 rounded-lg ${color}`}>
        <div className="flex flex-col items-center text-center">
          <div className="mb-4">{icon}</div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="mb-4">{message}</p>
          {status === 'not-found' && (
            <Button onClick={() => setStatus(null)} variant="outline">
              Try Again
            </Button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">Track Your Order</h1>
        <p className="text-gray-600">Enter your order ID and email to check the status of your order</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="orderId" className="block text-sm font-medium text-gray-700 mb-1">
              Order ID
            </label>
            <Input
              id="orderId"
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Enter your order ID"
              className="w-full"
              disabled={isLoading}
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter the email used for the order"
              className="w-full"
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <Button 
            type="submit" 
            className="w-full mt-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Tracking...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Track Order
              </>
            )}
          </Button>
        </form>

        {renderStatus()}
      </div>

      <div className="mt-8 bg-blue-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Need Help?</h2>
        <p className="mb-4">If you're having trouble tracking your order, please contact our customer service team.</p>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <a 
            href="tel:8860011172" 
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            Call Us: 8860011172
          </a>
          <Button 
            variant="outline" 
            onClick={() => router.push('/contact')}
            className="text-blue-600 border-blue-600 hover:bg-blue-50"
          >
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
}
