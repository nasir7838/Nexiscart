"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Float } from "@react-three/drei"
import { useRef, Suspense } from "react"
import { ShoppingCart } from "lucide-react"
import * as THREE from 'three'

function Cart3D({ count }: { count: number }) {
  const cartRef = useRef<THREE.Group>(null)

  return (
    <Float speed={1} rotationIntensity={0.05} floatIntensity={0.1}>
      <group ref={cartRef}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.8, 1, 0.6]} />
          <meshStandardMaterial color="#3B82F6" metalness={0.3} roughness={0.4} />
        </mesh>
        {count > 0 && (
          <mesh position={[0.5, 0.5, 0.4]}>
            <sphereGeometry args={[0.15, 8, 8]} />
            <meshStandardMaterial color="#EF4444" emissive="#DC2626" emissiveIntensity={0.2} />
          </mesh>
        )}
      </group>
    </Float>
  )
}

export default function KineticCart({ count }: { count: number }) {
  return (
    <div className="w-10 h-10 relative">
      <Canvas camera={{ position: [1.5, 1.5, 1.5], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <pointLight position={[2, 2, 2]} intensity={0.8} />
          <Cart3D count={count} />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Suspense>
      </Canvas>

      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-blue-600/90 rounded-lg transition-opacity duration-300">
        <ShoppingCart className="w-5 h-5 text-white" />
        {count > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
            {count}
          </span>
        )}
      </div>
    </div>
  )
}
