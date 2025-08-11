'use client';

import ProductImage from './ProductImage';

// Define the TypeScript interface for a single product.
interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  model: string;
  image: string;
  category: string;
  brand: string;
  inStock: boolean;
  fastDelivery: boolean;
}

// The component receives the 'products' prop from the parent page.
export default function TrendingSection({ products }: { products?: Product[] }) {
  
  // --- DELETE THE HARDCODED LIST THAT WAS HERE ---

  // Ensure products is an array before mapping to prevent errors.
  const productList = Array.isArray(products) ? products : [];

  return (
    <section className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="font-bold text-3xl text-gray-900 mb-4">Trending Now</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover what's popular right now. These products are flying off our virtual shelves.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {/* --- CHANGE THIS LINE TO USE THE 'products' PROP --- */}
        {productList.map((product) => (
          <div
            key={product.id}
            className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 relative"
          >
            {/* The trend property is not in our backend data, so it is removed for now. */}
            {/* <div className="absolute top-3 right-3 z-10">
              <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">{product.trend}</span>
            </div> */}

            <div className="aspect-square bg-gray-50 overflow-hidden">
              <ProductImage 
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-sm text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {product.name}
              </h3>
              <div className="text-lg font-bold text-gray-900">${product.price}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}