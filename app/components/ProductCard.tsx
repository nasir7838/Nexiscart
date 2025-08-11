import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200">
      <Link href={`/products/${product.id}`} className="block">
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={300}
            className="h-full w-full object-cover object-center group-hover:opacity-90"
          />
        </div>
        
        <div className="p-4">
          <h3 className="text-sm text-gray-700 line-clamp-2 h-10">
            {product.name}
          </h3>
          
          <div className="mt-2 flex items-center">
            <div className="flex items-center">
              {[0, 1, 2, 3, 4].map((rating) => (
                <Star
                  key={rating}
                  className={`h-4 w-4 ${
                    rating < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                  aria-hidden="true"
                />
              ))}
              <span className="ml-1 text-xs text-gray-500">
                {product.reviewCount}
              </span>
            </div>
          </div>
          
          <p className="mt-2 text-sm font-medium text-gray-900">
            ${product.price.toFixed(2)}
          </p>
          
          <p className="mt-1 text-xs text-gray-500">{product.category}</p>
        </div>
      </Link>
      
      <div className="p-4 pt-0">
        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Add to cart
        </button>
      </div>
    </div>
  );
}
