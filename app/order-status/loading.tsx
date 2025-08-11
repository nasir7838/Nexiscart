import { Skeleton } from "@/components/ui/skeleton";
export default function OrderStatusLoading() {
  return (
    <div className="space-y-8 p-4">
      {/* Order Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-2">
          <div className="h-8 w-48 animate-pulse rounded-md bg-gray-200" />
          <div className="h-4 w-64 animate-pulse rounded-md bg-gray-200" />
        </div>
        <div className="h-10 w-32 animate-pulse rounded-md bg-gray-200" />
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {/* Status Section */}
        <div className="h-64 w-full animate-pulse rounded-md bg-gray-200" />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Summary */}
            <div className="h-96 w-full animate-pulse rounded-md bg-gray-200" />
            
            {/* Shipping Info */}
            <div className="h-48 w-full animate-pulse rounded-md bg-gray-200" />
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            {/* Payment Method */}
            <div className="h-48 w-full animate-pulse rounded-md bg-gray-200" />
            
            {/* Order Total */}
            <div className="h-48 w-full animate-pulse rounded-md bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
