import { Suspense } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ProductCard from '../components/ProductCard'

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q: string }
}) {
  const searchQuery = searchParams.q || ''
  
  // In a real app, you would fetch search results from your API
  // const searchResults = await fetchSearchResults(searchQuery)
  
  // Mock data for demonstration
  const searchResults = [
    {
      id: 1,
      name: 'Wireless Earbuds',
      price: 99.99,
      image: 'https://placehold.co/300x300?text=Wireless+Earbuds',
      category: 'Electronics',
      rating: 4.5,
      reviewCount: 124
    },
    {
      id: 2,
      name: 'Bluetooth Speaker',
      price: 79.99,
      image: 'https://placehold.co/300x300?text=Bluetooth+Speaker',
      category: 'Electronics',
      rating: 4.2,
      reviewCount: 89
    },
    // Add more mock results as needed
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="ml-4 text-xl font-semibold text-gray-900">
              {searchQuery ? `Results for "${searchQuery}"` : 'Search'}
            </h1>
          </div>
        </div>
      </div>

      {/* Search Results */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {searchQuery ? (
          <>
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {searchResults.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="mt-2 text-lg font-medium text-gray-900">No products found</h3>
                <p className="mt-1 text-gray-500">We couldn't find any products matching your search.</p>
                <div className="mt-6">
                  <Button onClick={() => window.history.back()}>
                    Go back
                  </Button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <h3 className="mt-2 text-lg font-medium text-gray-900">Search for products</h3>
            <p className="mt-1 text-gray-500">Enter a search term to find products.</p>
          </div>
        )}
      </div>
    </div>
  )
}
