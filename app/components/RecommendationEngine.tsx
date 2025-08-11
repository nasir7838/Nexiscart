"use client"

import { useState } from "react"
import { Sparkles, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProductCard3D from "./ProductCard3D"

const aiRecommendations = [
  {
    id: 10,
    name: "MacBook Pro 16-inch M3",
    price: 2499.99,
    originalPrice: 2699.99,
    rating: 4.9,
    reviews: 3456,
    model: "laptop",
    image: "/placeholder.svg?height=400&width=400&text=MacBook+Pro+16+M3",
    category: "Electronics",
    brand: "Apple",
    inStock: true,
    fastDelivery: true,
    aiReason: "Based on your recent laptop searches",
  },
  {
    id: 11,
    name: "AirPods Pro 2nd Gen",
    price: 249.99,
    originalPrice: 279.99,
    rating: 4.8,
    reviews: 8765,
    model: "earbuds",
    image: "/placeholder.svg?height=400&width=400&text=AirPods+Pro+2nd+Gen",
    category: "Electronics",
    brand: "Apple",
    inStock: true,
    fastDelivery: true,
    aiReason: "Frequently bought with Apple products",
  },
  {
    id: 12,
    name: "Herman Miller Aeron Chair",
    price: 1395.99,
    originalPrice: 1495.99,
    rating: 4.7,
    reviews: 2134,
    model: "chair",
    image: "/placeholder.svg?height=400&width=400&text=Herman+Miller+Aeron",
    category: "Office",
    brand: "Herman Miller",
    inStock: true,
    fastDelivery: false,
    aiReason: "Perfect for your home office setup",
  },
  {
    id: 13,
    name: "LG UltraWide 34-inch Monitor",
    price: 899.99,
    originalPrice: 999.99,
    rating: 4.6,
    reviews: 5432,
    model: "monitor",
    image: "/placeholder.svg?height=400&width=400&text=LG+UltraWide+34+Monitor",
    category: "Electronics",
    brand: "LG",
    inStock: true,
    fastDelivery: true,
    aiReason: "Complements your productivity setup",
  },
]

export default function RecommendationEngine() {
  const [recommendations, setRecommendations] = useState(aiRecommendations)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const refreshRecommendations = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      // Simulate AI refresh
      setRecommendations([...recommendations].sort(() => Math.random() - 0.5))
      setIsRefreshing(false)
    }, 1500)
  }

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">AI Recommendations</h3>
            <p className="text-sm text-gray-600">Personalized just for you</p>
          </div>
        </div>
        <Button
          onClick={refreshRecommendations}
          disabled={isRefreshing}
          variant="outline"
          className="border-indigo-200 hover:bg-indigo-50 bg-transparent"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
          {isRefreshing ? "Refreshing..." : "Refresh"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendations.map((product) => (
          <div key={product.id} className="relative">
            <ProductCard3D product={product} />
            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
              AI Pick
            </div>
            <div className="mt-2 text-xs text-gray-600 bg-white/80 backdrop-blur-sm rounded-lg p-2 border border-gray-200">
              💡 {product.aiReason}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
