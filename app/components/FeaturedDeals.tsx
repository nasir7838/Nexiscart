"use client"

import { Clock, Star, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Deal {
  id: number
  name: string
  price: number
  originalPrice: number
  rating: number
  reviews: number
  image: string
  brand: string
  dealEndsIn: string
  fastDelivery: boolean
}

export default function FeaturedDeals({ deals }: { deals: Deal[] }) {
  return (
    <section className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 border border-red-200">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-2">
            Lightning Deals
          </h2>
          <p className="text-gray-600">Limited time offers - grab them before they're gone!</p>
        </div>
        <div className="flex items-center space-x-2 bg-red-100 px-4 py-2 rounded-full">
          <Clock className="w-5 h-5 text-red-600" />
          <span className="font-semibold text-red-600">Deals end soon!</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {deals.map((deal) => (
          <div
            key={deal.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100"
          >
            {/* Deal Timer */}
            <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-3 text-center">
              <div className="flex items-center justify-center space-x-2">
                <Clock className="w-4 h-4" />
                <span className="font-bold text-sm">Ends in {deal.dealEndsIn}</span>
              </div>
            </div>

            {/* Product Image */}
            <div className="h-48 bg-gray-50 relative overflow-hidden">
              <img
                src={deal.image || "/placeholder.svg"}
                alt={deal.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3">
                <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                  {Math.round(((deal.originalPrice - deal.price) / deal.originalPrice) * 100)}% OFF
                </span>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-4">
              <div className="mb-2">
                <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                  {deal.brand}
                </span>
              </div>

              <h3 className="font-bold text-sm mb-3 line-clamp-2 text-gray-800">{deal.name}</h3>

              <div className="flex items-center mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${i < Math.floor(deal.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-xs text-gray-600">({deal.reviews.toLocaleString()})</span>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-xl font-bold text-red-600">${deal.price}</div>
                  <div className="text-sm text-gray-500 line-through">${deal.originalPrice}</div>
                </div>
                {deal.fastDelivery && (
                  <div className="flex items-center text-green-600 text-xs">
                    <Truck className="w-3 h-3 mr-1" />
                    Fast
                  </div>
                )}
              </div>

              <Link href={`/product/${deal.id}`}>
                <Button className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold">
                  Grab Deal
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
