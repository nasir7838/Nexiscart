'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ElectronicsCategoryPage() {
  const router = useRouter();

  // Redirect to the correct category page
  useEffect(() => {
    router.replace('/category/electronics');
  }, [router]);

  // Show a loading state while redirecting
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-lg font-medium text-gray-700">Loading Electronics...</p>
      </div>
    </div>
  );
}
