import ProductInspectionStage from "../../components/ProductInspectionStage"
import { Button } from "@/components/ui/button"
import { Star, ShoppingCart, Heart } from "lucide-react"

interface ProductData {
  [key: string]: {
    name: string;
    price: number;
    rating: number; // This is a number between 1 and 5
    model: string;
    description: string;
  };
}

const productData: ProductData = {
  '1': {
    name: "Wireless Headphones",
    price: 199.99,
    rating: 4.5,
    model: "headphones",
    description: "Premium wireless headphones with noise cancellation",
  },
  '2': {
    name: "Smart Watch",
    price: 299.99,
    rating: 4.8,
    model: "watch",
    description: "Advanced smartwatch with health monitoring",
  },
  '3': {
    name: "Laptop Stand",
    price: 79.99,
    rating: 4.3,
    model: "stand",
    description: "Ergonomic laptop stand for better posture",
  },
  '4': {
    name: "Coffee Mug",
    price: 24.99,
    rating: 4.6,
    model: "mug",
    description: "Insulated coffee mug keeps drinks hot",
  },
  '5': {
    name: "Desk Lamp",
    price: 89.99,
    rating: 4.4,
    model: "lamp",
    description: "LED desk lamp with adjustable brightness",
  },
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  // In a real app, you might fetch the product data here
  // const product = await fetchProduct(params.id);
  
  const product = productData[params.id as keyof typeof productData];

  if (!product) {
    return <div className="p-8">Product not found</div>
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* 3D Inspection Stage */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
          <ProductInspectionStage product={product} />
        </div>

        {/* Product Details */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <div className="flex items-center mt-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-3 text-lg text-gray-600">({product.rating})</span>
            </div>
          </div>

          <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            ${product.price}
          </div>

          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          <div className="space-y-4">
            <Button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold py-4 text-lg shadow-xl transform hover:scale-105 transition-all duration-300">
              <ShoppingCart className="w-6 h-6 mr-3" />
              Add to Cart
            </Button>
            <Button
              variant="outline"
              className="w-full bg-transparent border-2 border-purple-300 hover:bg-purple-50 hover:border-purple-400 py-4 text-lg"
            >
              <Heart className="w-6 h-6 mr-3" />
              Add to Wishlist
            </Button>
          </div>

          <div className="border-t pt-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
            <h3 className="font-bold text-xl mb-4 text-gray-800">Product Features:</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                Premium quality materials
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                2-year warranty included
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                Free shipping on orders over $50
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                30-day return policy
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
