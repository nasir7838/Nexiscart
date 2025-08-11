"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, Float } from "@react-three/drei"
import { useRef, useState, Suspense } from "react"
import Link from "next/link"
import { Star, ShoppingCart, Heart, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import * as THREE from 'three'

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  model: string
  image: string
  category: string
  brand: string
  inStock: boolean
  fastDelivery: boolean
}

function Product3DModel({ model, isHovered }: { model: string; isHovered: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)

  const getGeometry = (model: string) => {
    switch (model) {
      case "headphones":
        return <torusGeometry args={[0.8, 0.3, 16, 32]} />
      case "watch":
        return <cylinderGeometry args={[0.6, 0.6, 0.3, 32]} />
      case "stand":
        return <boxGeometry args={[1, 1.5, 0.5]} />
      case "mug":
        return <cylinderGeometry args={[0.4, 0.5, 1, 32]} />
      default:
        return <boxGeometry args={[1, 1, 1]} />
    }
  }

  const getColor = (model: string) => {
    const colors = {
      headphones: "#8B5CF6",
      watch: "#EC4899",
      stand: "#06B6D4",
      mug: "#F59E0B",
    }
    return colors[model as keyof typeof colors] || "#8B5CF6"
  }

  return (
    <Float speed={isHovered ? 2 : 1} rotationIntensity={isHovered ? 0.2 : 0.1} floatIntensity={isHovered ? 0.3 : 0.1}>
      <mesh ref={meshRef} scale={isHovered ? 1.1 : 1}>
        {getGeometry(model)}
        <meshStandardMaterial
          color={getColor(model)}
          metalness={0.6}
          roughness={0.2}
          emissive={isHovered ? getColor(model) : "#000000"}
          emissiveIntensity={isHovered ? 0.1 : 0}
        />
      </mesh>
    </Float>
  )
}

export default function ProductCard3D({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false)

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div
      className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-blue-200 group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 space-y-2">
        {discountPercentage > 0 && (
          <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
            {discountPercentage}% OFF
          </span>
        )}
        {product.fastDelivery && (
          <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg flex items-center">
            <Truck className="w-3 h-3 mr-1" />
            Fast
          </div>
        )}
      </div>

      {/* Wishlist Button */}
      <button className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors">
        <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
      </button>

      {/* 3D Model Area */}
      <div className="h-56 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[2, 2, 2]} intensity={isHovered ? 1.5 : 1} color="#3b82f6" />
            <pointLight position={[-2, -2, -2]} intensity={0.3} color="#8b5cf6" />
            {isHovered && <spotLight position={[0, 2, 2]} intensity={0.8} color="#06b6d4" />}
            <Environment preset="studio" />

            <Product3DModel model={product.model} isHovered={isHovered} />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate={isHovered} autoRotateSpeed={2} />
          </Suspense>
        </Canvas>
      </div>

      {/* Product Info */}
      <div className="p-6">
        {/* Brand */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
            {product.brand}
          </span>
          <span className="text-xs text-gray-500">{product.category}</span>
        </div>

        {/* Product Name */}
        <h3 className="font-bold text-lg mb-3 line-clamp-2 text-gray-800 group-hover:text-blue-700 transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">({product.reviews.toLocaleString()})</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {product.inStock ? (
              <span className="text-xs text-green-600 font-semibold">In Stock</span>
            ) : (
              <span className="text-xs text-red-600 font-semibold">Out of Stock</span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <Link href={`/product/${product.id}`} className="flex-1">
            <Button
              size="sm"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
