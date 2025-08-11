'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Package, Search } from 'lucide-react';
import { Input } from "@/components/ui/input";

// Define the order status type
type OrderStatus = 'processing' | 'shipped' | 'out-for-delivery' | 'delivered' | 'cancelled';

// Define the order interface
interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  items: {
    id: string;
    name: string;
    quantity: number;
    image: string;
  }[];
  total: number;
  itemCount: number;
}

// Mock function to fetch orders (replace with actual API call)
const fetchOrders = async (): Promise<Order[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockOrders: Order[] = [
        {
          id: 'ORD-123456',
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'processing',
          items: [
            {
              id: '1',
              name: 'Wireless Earbuds Pro',
              quantity: 1,
              image: '/placeholder-product.jpg',
            },
            {
              id: '2',
              name: 'Phone Case',
              quantity: 2,
              image: '/placeholder-product.jpg',
            },
          ],
          total: 179.97,
          itemCount: 3,
        },
        {
          id: 'ORD-123455',
          date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'delivered',
          items: [
            {
              id: '3',
              name: 'Smart Watch',
              quantity: 1,
              image: '/placeholder-product.jpg',
            },
          ],
          total: 249.99,
          itemCount: 1,
        },
        {
          id: 'ORD-123454',
          date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'cancelled',
          items: [
            {
              id: '4',
              name: 'Bluetooth Speaker',
              quantity: 1,
              image: '/placeholder-product.jpg',
            },
          ],
          total: 89.99,
          itemCount: 1,
        },
      ];
      resolve(mockOrders);
    }, 500);
  });
};

const getStatusBadgeVariant = (status: OrderStatus) => {
  switch (status) {
    case 'delivered':
      return 'default';
    case 'shipped':
    case 'out-for-delivery':
      return 'secondary';
    case 'processing':
      return 'outline';
    case 'cancelled':
      return 'destructive';
    default:
      return 'outline';
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<OrderStatus | 'all'>('all');

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        const data = await fetchOrders();
        setOrders(data);
      } catch (err) {
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Orders</h1>
          <p className="text-muted-foreground">
            View and track your order history
          </p>
        </div>
        <Button asChild>
          <Link href="/">Continue Shopping</Link>
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search orders or items..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-auto">
          <select
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as OrderStatus | 'all')}
          >
            <option value="all">All Orders</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="out-for-delivery">Out for Delivery</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center border rounded-lg">
          <Package className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No orders found</h3>
          <p className="text-muted-foreground max-w-md mb-6">
            {searchTerm || filterStatus !== 'all' 
              ? 'No orders match your search criteria. Try adjusting your search or filters.'
              : "You haven't placed any orders yet. Start shopping to see your orders here!"}
          </p>
          <Button asChild>
            <Link href="/">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <Card key={order.id} className="overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-4">
                      <h3 className="font-medium">Order #{order.id}</h3>
                      <Badge variant={getStatusBadgeVariant(order.status)} className="capitalize">
                        {order.status.replace(/-/g, ' ')}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Placed on {formatDate(order.date)} • {order.itemCount} {order.itemCount === 1 ? 'item' : 'items'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${order.total.toFixed(2)}</p>
                    <Button variant="link" size="sm" className="h-auto p-0" asChild>
                      <Link href={`/order-status?id=${order.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex -space-x-2">
                    {order.items.slice(0, 4).map((item, index) => (
                      <div 
                        key={`${item.id}-${index}`} 
                        className="w-12 h-12 rounded-full border-2 border-background bg-muted overflow-hidden"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                    {order.items.length > 4 && (
                      <div className="w-12 h-12 rounded-full border-2 border-background bg-muted flex items-center justify-center text-xs font-medium">
                        +{order.items.length - 4}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="bg-muted/50 px-6 py-3 flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-sm text-muted-foreground">
                  {order.status === 'delivered' 
                    ? 'Delivered on ' + formatDate(new Date(order.date).toISOString())
                    : order.status === 'cancelled'
                      ? 'Order was cancelled'
                      : 'Est. delivery: ' + formatDate(new Date(new Date(order.date).getTime() + 7 * 24 * 60 * 60 * 1000).toISOString())}
                </p>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/contact">Get Help</Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link href={`/order-status?id=${order.id}`}>
                      Track Order
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
