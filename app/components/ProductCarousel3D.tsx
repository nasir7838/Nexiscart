"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, Float, Sparkles, Html } from "@react-three/drei"
import { useRef, useState, useEffect, Suspense } from "react"
import { ChevronLeft, ChevronRight, Star, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import type * as THREE from "three"

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

function ProductImage3D({
  product,
  position,
  isActive,
}: { product: Product; position: [number, number, number]; isActive: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useEffect(() => {
    if (meshRef.current) {
      const targetScale = isActive ? 1.4 : 1
      meshRef.current.scale.setScalar(targetScale)
    }
  }, [isActive])

  return (
    <Float speed={isActive ? 2 : 1} rotationIntensity={isActive ? 0.3 : 0.1} floatIntensity={isActive ? 0.4 : 0.2}>
      <mesh ref={meshRef} position={position}>
        <planeGeometry args={[2, 2]} />
        <meshStandardMaterial
          color={isActive ? "#3b82f6" : "#6b7280"}
          emissive={isActive ? "#1e40af" : "#000000"}
          emissiveIntensity={isActive ? 0.1 : 0}
        />
        {isActive && (
          <Html position={[0, -1.5, 0]} center>
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-2xl border border-gray-200 min-w-[300px]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                  {product.brand}
                </span>
                {product.fastDelivery && (
                  <div className="flex items-center text-green-600 text-xs">
                    <Truck className="w-3 h-3 mr-1" />
                    Fast Delivery
                  </div>
                )}
              </div>
              <h3 className="font-bold text-sm text-gray-800 mb-2">{product.name}</h3>
              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-xs text-gray-600">({product.reviews.toLocaleString()})</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-red-600">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                  )}
                </div>
                {product.inStock && <span className="text-xs text-green-600 font-semibold">In Stock</span>}
              </div>
            </div>
          </Html>
        )}
      </mesh>
      {isActive && <Sparkles count={30} scale={4} size={3} speed={0.8} />}
    </Float>
  )
}

function CarouselContent({
  products,
  currentIndex,
  rotation,
}: { products: Product[]; currentIndex: number; rotation: number }) {
  return (
    <group rotation={[0, rotation, 0]}>
      {products.map((product, index) => {
        const angle = (index / products.length) * Math.PI * 2
        const x = Math.cos(angle) * 5
        const z = Math.sin(angle) * 5
        return (
          <ProductImage3D key={product.id} product={product} position={[x, 0, z]} isActive={index === currentIndex} />
        )
      })}
    </group>
  )
}

export default function ProductCarousel3D({ products }: { products: Product[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [rotation, setRotation] = useState(0)

  const nextProduct = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length)
    setRotation((prev) => prev - (Math.PI * 2) / products.length)
  }

  const prevProduct = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length)
    setRotation((prev) => prev + (Math.PI * 2) / products.length)
  }

  return (
    <div className="relative">
      <div className="h-[500px] bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 rounded-2xl shadow-2xl overflow-hidden">
        <Canvas camera={{ position: [0, 2, 8], fov: 60 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.4} />
            <pointLight position={[5, 5, 5]} intensity={1.2} color="#3b82f6" />
            <pointLight position={[-5, -5, -5]} intensity={0.8} color="#8b5cf6" />
            <Environment preset="night" />

            <CarouselContent products={products} currentIndex={currentIndex} rotation={rotation} />

            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
          </Suspense>
        </Canvas>
      </div>

      {/* Navigation */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/95 backdrop-blur-sm shadow-2xl w-12 h-12"
        onClick={prevProduct}
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/95 backdrop-blur-sm shadow-2xl w-12 h-12"
        onClick={nextProduct}
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      {/* Product indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index)
              setRotation(-(index * Math.PI * 2) / products.length)
            }}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex ? "bg-white shadow-lg" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
