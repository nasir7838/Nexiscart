'use client';

import { FiFilter, FiSearch } from 'react-icons/fi';
import { Button } from "@/components/ui/button";

interface NoProductsPlaceholderProps {
  onResetFilters?: () => void;
  showReload?: boolean;
}

export default function NoProductsPlaceholder({ 
  onResetFilters, 
  showReload = true 
}: NoProductsPlaceholderProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center bg-gray-50 rounded-lg">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <FiSearch className="w-10 h-10 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
      <p className="text-gray-500 mb-6 max-w-md">
        We couldn't find any products matching your search or filters. Try adjusting your search or filter criteria.
      </p>
      <div className="flex gap-3">
        {onResetFilters && (
          <Button
            variant="outline"
            onClick={onResetFilters}
            className="flex items-center gap-2"
          >
            <FiFilter className="h-4 w-4" />
            Reset filters
          </Button>
        )}
        {showReload && (
          <Button 
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
}
