"use client"

import * as THREE from 'three'
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, Html, Float, Sparkles } from "@react-three/drei"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { RotateCcw, Maximize, Eye, Smartphone } from "lucide-react"

interface Product {
  name: string
  price: number
  rating: number // Rating as a number between 1 and 5
  model: string
  description?: string // Added as it's used in some places
}

function InspectableProduct({ model, exploded, hotspots }: { model: string; exploded: boolean; hotspots: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)

  const getGeometry = (model: string) => {
    switch (model) {
      case "headphones":
        return (
          <group>
            <Float speed={1} rotationIntensity={0.1}>
              <mesh position={exploded ? [-1.5, 0, 0] : [0, 0, 0]}>
                <torusGeometry args={[0.8, 0.3, 16, 32]} />
                <meshStandardMaterial color="#8B5CF6" metalness={0.7} roughness={0.2} />
              </mesh>
            </Float>
            <Float speed={1.2} rotationIntensity={0.1}>
              <mesh position={exploded ? [1.5, 0, 0] : [0, 0, 0]}>
                <sphereGeometry args={[0.4, 16, 16]} />
                <meshStandardMaterial color="#EC4899" metalness={0.5} roughness={0.3} />
              </mesh>
            </Float>
            {exploded && <Sparkles count={30} scale={4} size={3} speed={0.5} />}
          </group>
        )
      case "watch":
        return (
          <group>
            <Float speed={1} rotationIntensity={0.1}>
              <mesh position={exploded ? [0, 0.8, 0] : [0, 0, 0]}>
                <cylinderGeometry args={[0.6, 0.6, 0.3, 32]} />
                <meshStandardMaterial color="#374151" metalness={0.8} roughness={0.1} />
              </mesh>
            </Float>
            <Float speed={0.8} rotationIntensity={0.1}>
              <mesh position={exploded ? [0, -0.8, 0] : [0, 0, 0]}>
                <boxGeometry args={[1.2, 0.1, 0.8]} />
                <meshStandardMaterial color="#6B7280" metalness={0.3} roughness={0.4} />
              </mesh>
            </Float>
            {exploded && <Sparkles count={30} scale={4} size={3} speed={0.5} />}
          </group>
        )
      default:
        return (
          <Float speed={1} rotationIntensity={0.2}>
            <mesh ref={meshRef}>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color="#8B5CF6" metalness={0.6} roughness={0.2} />
            </mesh>
          </Float>
        )
    }
  }

  return (
    <group>
      {getGeometry(model)}

      {/* Enhanced Hotspots */}
      {hotspots && (
        <>
          <Float speed={2} floatIntensity={0.5}>
            <mesh position={[0.8, 0.5, 0]}>
              <sphereGeometry args={[0.05, 8, 8]} />
              <meshBasicMaterial color="#10B981" />
              <Html>
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap shadow-xl border border-green-400">
                  ✨ Premium Feature
                </div>
              </Html>
            </mesh>
          </Float>
          <Float speed={1.5} floatIntensity={0.3}>
            <mesh position={[-0.8, -0.3, 0]}>
              <sphereGeometry args={[0.05, 8, 8]} />
              <meshBasicMaterial color="#F59E0B" />
              <Html>
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap shadow-xl border border-yellow-400">
                  🏆 Quality Materials
                </div>
              </Html>
            </mesh>
          </Float>
        </>
      )}
    </group>
  )
}

export default function ProductInspectionStage({ product }: { product: Product }) {
  const [exploded, setExploded] = useState(false)
  const [hotspots, setHotspots] = useState(false)
  const [resetTrigger, setResetTrigger] = useState(0)

  const resetView = () => {
    setResetTrigger((prev) => prev + 1)
    setExploded(false)
    setHotspots(false)
  }

  return (
    <div className="relative h-96 bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 rounded-2xl overflow-hidden">
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }} key={resetTrigger}>
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#8B5CF6" />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#EC4899" />
        <spotLight position={[0, 5, 0]} intensity={0.8} color="#06B6D4" />
        <Environment preset="night" />

        <InspectableProduct model={product.model} exploded={exploded} hotspots={hotspots} />
        <OrbitControls enableDamping dampingFactor={0.05} />
      </Canvas>

      {/* Enhanced 3D Controls */}
      <div className="absolute top-4 right-4 space-y-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setExploded(!exploded)}
          className={`bg-white/90 backdrop-blur-sm shadow-xl border-purple-200 hover:bg-purple-50 transition-all duration-300 ${exploded ? "bg-purple-100 border-purple-400" : ""}`}
        >
          <Maximize className="w-4 h-4 mr-2" />
          {exploded ? "Assemble" : "Explode"}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setHotspots(!hotspots)}
          className={`bg-white/90 backdrop-blur-sm shadow-xl border-purple-200 hover:bg-purple-50 transition-all duration-300 ${hotspots ? "bg-purple-100 border-purple-400" : ""}`}
        >
          <Eye className="w-4 h-4 mr-2" />
          {hotspots ? "Hide" : "Show"} Info
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={resetView}
          className="bg-white/90 backdrop-blur-sm shadow-xl border-purple-200 hover:bg-purple-50 transition-all duration-300"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 shadow-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
        >
          <Smartphone className="w-4 h-4 mr-2" />
          AR View
        </Button>
      </div>

      {/* Enhanced Instructions */}
      <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm text-white px-4 py-3 rounded-xl text-sm border border-purple-500/30">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
          <span>Drag to rotate • Scroll to zoom • Right-click to pan</span>
        </div>
      </div>
    </div>
  )
}
