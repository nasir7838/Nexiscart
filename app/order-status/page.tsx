'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle2, Clock, Package, Truck, CheckCircle, XCircle, Loader2 } from 'lucide-react';

// Import UI components with correct paths
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// Badge component is not used in this file, so it's removed to fix the unused import warning

export const dynamic = 'force-dynamic';

type OrderStatus = 'processing' | 'shipped' | 'out-for-delivery' | 'delivered' | 'cancelled';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface OrderDetails {
  orderId: string;
  orderDate: string;
  status: OrderStatus;
  items: OrderItem[];
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
  subtotal: number;
  shippingFee: number;
  tax: number;
  total: number;
  estimatedDelivery?: string;
  trackingNumber?: string;
}

const fetchOrderDetails = async (orderId: string): Promise<OrderDetails> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        orderId: orderId || 'ORD-123456',
        orderDate: new Date().toISOString(),
        status: 'processing',
        items: [
          {
            id: '1',
            name: 'Wireless Earbuds Pro',
            price: 99.99,
            quantity: 1,
            image: '/placeholder-product.jpg',
          },
          {
            id: '2',
            name: 'Phone Case',
            price: 19.99,
            quantity: 2,
            image: '/placeholder-product.jpg',
          },
        ],
        shippingAddress: {
          name: 'John Doe',
          street: '123 Main St',
          city: 'San Francisco',
          state: 'CA',
          zipCode: '94105',
          country: 'United States',
        },
        paymentMethod: 'Visa ending in 4242',
        subtotal: 139.97,
        shippingFee: 9.99,
        tax: 12.50,
        total: 162.46,
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        trackingNumber: '1Z999AA1234567890',
      });
    }, 500);
  });
};

const statusSteps = [
  { id: 'processing', label: 'Processing', icon: Clock },
  { id: 'shipped', label: 'Shipped', icon: Package },
  { id: 'out-for-delivery', label: 'Out for Delivery', icon: Truck },
  { id: 'delivered', label: 'Delivered', icon: CheckCircle },
];

export default function OrderStatusPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('id');
  
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        setLoading(true);
        const data = await fetchOrderDetails(orderId || '');
        setOrder(data);
      } catch (err) {
        setError('Failed to load order details. Please try again.');
        console.error('Error fetching order:', err);
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [orderId]);

  const getStatusIndex = (status: OrderStatus): number => {
    return statusSteps.findIndex(step => step.id === status);
  };

  const currentStatusIndex = order ? getStatusIndex(order.status) : -1;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-8">
        <div className="max-w-3xl mx-auto bg-destructive/10 border border-destructive/30 rounded-lg p-6 text-center">
          <XCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-destructive mb-2">Error Loading Order</h2>
          <p className="text-muted-foreground mb-6">{error}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => window.location.reload()}>Try Again</Button>
            <Button variant="outline" asChild>
              <Link href="/">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container py-8">
        <div className="max-w-3xl mx-auto text-center">
          <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">Order Not Found</h1>
          <p className="text-muted-foreground mb-6">
            We couldn&apos;t find an order with that ID. Please check your order number and try again.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/orders">View All Orders</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Order #{order.orderId}</h1>
          <p className="text-muted-foreground">
            Placed on {new Date(order.orderDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/orders">Back to Orders</Link>
        </Button>
      </div>

      {/* Order Status Stepper */}
      <Card>
        <CardHeader>
          <CardTitle>Order Status</CardTitle>
          <CardDescription>
            {order.status === 'delivered' 
              ? 'Your order has been delivered.'
              : order.status === 'cancelled'
                ? 'Your order has been cancelled.'
                : 'Your order is being processed.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between relative">
            {statusSteps.map((step, index) => {
              const isCompleted = index < currentStatusIndex;
              const isCurrent = index === currentStatusIndex;
              const isError = order.status === 'cancelled' && index === statusSteps.length - 1;
              
              return (
                <div key={step.id} className="flex flex-col items-center relative z-10">
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      isCompleted
                        ? 'bg-primary text-primary-foreground'
                        : isCurrent
                        ? 'bg-primary/10 text-primary border-2 border-primary'
                        : isError
                        ? 'bg-destructive text-destructive-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {isError ? (
                      <XCircle className="h-5 w-5" />
                    ) : isCompleted ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      <step.icon className="h-5 w-5" />
                    )}
                  </div>
                  <span className={`mt-2 text-sm font-medium text-center ${
                    isCurrent || isError ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
            <div className="absolute top-4 left-0 right-0 h-1 bg-muted -z-10">
              <div 
                className="h-full bg-primary transition-all duration-500"
                style={{
                  width: order.status === 'cancelled' 
                    ? '100%' 
                    : `${(currentStatusIndex / (statusSteps.length - 1)) * 100}%`,
                  backgroundColor: order.status === 'cancelled' ? 'hsl(0, 84.2%, 60.2%)' : 'hsl(221.2, 83.2%, 53.3%)',
                }}
              />
            </div>
          </div>

          {order.trackingNumber && (
            <div className="mt-8 p-4 bg-muted/50 rounded-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-medium">Tracking Number</h3>
                  <p className="text-sm text-muted-foreground">
                    {order.trackingNumber}
                  </p>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <a 
                    href={`https://www.ups.com/track?tracknum=${order.trackingNumber}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Track Package
                  </a>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Summary */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-start gap-4">
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border bg-muted/50">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="font-medium">${item.price.toFixed(2)}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      <p className="text-sm font-medium mt-1">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>${order.shippingFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${order.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-4 border-t font-medium text-lg">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shipping Address</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <p>{order.shippingAddress.name}</p>
                <p>{order.shippingAddress.street}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                </p>
                <p>{order.shippingAddress.country}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{order.paymentMethod}</p>
              <p className="text-sm text-muted-foreground mt-2">
                Billing address is the same as shipping address
              </p>
            </CardContent>
          </Card>

          {order.estimatedDelivery && (
            <Card>
              <CardHeader>
                <CardTitle>Estimated Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium">
                  {new Date(order.estimatedDelivery).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {order.status === 'delivered' 
                    ? 'Delivered on ' + new Date(order.estimatedDelivery).toLocaleDateString()
                    : 'Expected delivery date'}
                </p>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            <Button className="w-full" asChild>
              <Link href="/contact">Contact Support</Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
