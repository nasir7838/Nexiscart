'use client';

export default function TestOrderStatusPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Order Status Route Test</h1>
        <p className="mb-6">This is a test page to verify the /order-status route is working.</p>
        <div className="p-4 bg-green-100 text-green-800 rounded-md">
          If you can see this, the route is working correctly!
        </div>
        <div className="mt-6">
          <a 
            href="/order-status" 
            className="text-blue-600 hover:underline"
          >
            Go back to Order Status
          </a>
        </div>
      </div>
    </div>
  );
}
