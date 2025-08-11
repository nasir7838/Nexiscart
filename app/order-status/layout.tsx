import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Order Status | Nexis',
  description: 'Track your order status',
};

export default function OrderStatusLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {children}
        </div>
      </main>
    </>
  );
}
