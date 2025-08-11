"use client"

import { useEffect, useState } from "react"
import { TrendingUp, Users, ShoppingCart, Eye } from "lucide-react"

export default function LiveStats() {
  const [stats, setStats] = useState({
    activeUsers: 45672,
    ordersToday: 12847,
    productsViewed: 234567,
    salesGrowth: 23.5,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10) - 5,
        ordersToday: prev.ordersToday + Math.floor(Math.random() * 3),
        productsViewed: prev.productsViewed + Math.floor(Math.random() * 20),
        salesGrowth: prev.salesGrowth + (Math.random() - 0.5) * 0.1,
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm">Active Users</p>
            <p className="text-2xl font-bold">{stats.activeUsers.toLocaleString()}</p>
          </div>
          <Users className="w-8 h-8 text-blue-200" />
        </div>
        <div className="mt-2 text-xs text-blue-100">🔴 Live</div>
      </div>

      <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100 text-sm">Orders Today</p>
            <p className="text-2xl font-bold">{stats.ordersToday.toLocaleString()}</p>
          </div>
          <ShoppingCart className="w-8 h-8 text-green-200" />
        </div>
        <div className="mt-2 text-xs text-green-100">+{Math.floor(Math.random() * 5) + 1} in last minute</div>
      </div>

      <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-100 text-sm">Products Viewed</p>
            <p className="text-2xl font-bold">{stats.productsViewed.toLocaleString()}</p>
          </div>
          <Eye className="w-8 h-8 text-purple-200" />
        </div>
        <div className="mt-2 text-xs text-purple-100">Last 24 hours</div>
      </div>

      <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-orange-100 text-sm">Sales Growth</p>
            <p className="text-2xl font-bold">{stats.salesGrowth.toFixed(1)}%</p>
          </div>
          <TrendingUp className="w-8 h-8 text-orange-200" />
        </div>
        <div className="mt-2 text-xs text-orange-100">vs last month</div>
      </div>
    </div>
  )
}
