"use client"

import { useState } from "react"
import { ChevronRight, Star, Filter, Zap, Truck, Shield, Award } from "lucide-react"

const categories = [
  { name: "Electronics", count: 15420, subcategories: ["Computers", "Phones", "Audio", "Gaming"] },
  { name: "Home & Garden", count: 8934, subcategories: ["Furniture", "Kitchen", "Decor", "Tools"] },
  { name: "Fashion", count: 12567, subcategories: ["Men's", "Women's", "Kids", "Shoes"] },
  { name: "Sports", count: 6789, subcategories: ["Fitness", "Outdoor", "Team Sports", "Water Sports"] },
  { name: "Books", count: 45678, subcategories: ["Fiction", "Non-fiction", "Textbooks", "Children's"] },
]

const filters = [
  { name: "Prime Eligible", icon: Zap, count: 25000 },
  { name: "Fast Delivery", icon: Truck, count: 18000 },
  { name: "Highly Rated", icon: Star, count: 12000 },
  { name: "Warranty", icon: Shield, count: 8500 },
  { name: "Best Seller", icon: Award, count: 3200 },
]

export default function Sidebar() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  return (
    <aside className="fixed left-0 top-[112px] w-64 h-[calc(100vh-112px)] bg-white shadow-xl border-r border-gray-200 overflow-y-auto">
      <div className="p-6">
        {/* Quick Filters */}
        <div className="mb-8">
          <h3 className="font-bold text-lg mb-4 flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Quick Filters
          </h3>
          <div className="space-y-3">
            {filters.map((filter) => (
              <label
                key={filter.name}
                className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg"
              >
                <input type="checkbox" className="rounded border-gray-300" />
                <filter.icon className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium">{filter.name}</span>
                <span className="text-xs text-gray-500 ml-auto">({filter.count.toLocaleString()})</span>
              </label>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h3 className="font-bold text-lg mb-4">Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.name}>
                <button
                  onClick={() => setExpandedCategory(expandedCategory === category.name ? null : category.name)}
                  className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg text-left"
                >
                  <div>
                    <div className="font-medium">{category.name}</div>
                    <div className="text-xs text-gray-500">{category.count.toLocaleString()} items</div>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${expandedCategory === category.name ? "rotate-90" : ""}`}
                  />
                </button>
                {expandedCategory === category.name && (
                  <div className="ml-4 space-y-2 mt-2">
                    {category.subcategories.map((sub) => (
                      <button
                        key={sub}
                        className="block w-full text-left p-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded"
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-8">
          <h3 className="font-bold text-lg mb-4">Price Range</h3>
          <div className="space-y-3">
            <div className="flex space-x-2">
              <input type="number" placeholder="Min" className="w-full p-2 border rounded-lg text-sm" />
              <input type="number" placeholder="Max" className="w-full p-2 border rounded-lg text-sm" />
            </div>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 text-sm">Apply</button>
          </div>
        </div>

        {/* Rating Filter */}
        <div>
          <h3 className="font-bold text-lg mb-4">Customer Rating</h3>
          <div className="space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <label
                key={rating}
                className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg"
              >
                <input type="checkbox" className="rounded border-gray-300" />
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                  <span className="ml-2 text-sm">& Up</span>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}
