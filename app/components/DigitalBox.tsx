"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, Float, Sparkles } from "@react-three/drei"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  model: string
}

function BoxContainer() {
  return (
    <group>
      {/* Box bottom */}
      <mesh position={[0, -1, 0]}>
        <boxGeometry args={[4, 0.1, 3]} />
        <meshStandardMaterial color="#8B4513" metalness={0.3} roughness={0.7} />
      </mesh>

      {/* Box sides with better materials */}
      <mesh position={[-2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[2, 0.1, 3]} />
        <meshStandardMaterial color="#A0522D" metalness={0.2} roughness={0.8} />
      </mesh>
      <mesh position={[2, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <boxGeometry args={[2, 0.1, 3]} />
        <meshStandardMaterial color="#A0522D" metalness={0.2} roughness={0.8} />
      </mesh>
      <mesh position={[0, 0, -1.5]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[4, 0.1, 2]} />
        <meshStandardMaterial color="#A0522D" metalness={0.2} roughness={0.8} />
      </mesh>
      <mesh position={[0, 0, 1.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[4, 0.1, 2]} />
        <meshStandardMaterial color="#A0522D" metalness={0.2} roughness={0.8} />
      </mesh>
    </group>
  )
}

function CartItem3D({ item, position }: { item: CartItem; position: [number, number, number] }) {
  const getGeometry = (model: string) => {
    switch (model) {
      case "headphones":
        return <torusGeometry args={[0.3, 0.1, 8, 16]} />
      case "watch":
        return <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
      case "mug":
        return <cylinderGeometry args={[0.15, 0.2, 0.4, 16]} />
      default:
        return <boxGeometry args={[0.3, 0.3, 0.3]} />
    }
  }

  const getColor = (model: string) => {
    const colors = {
      headphones: "#8B5CF6",
      watch: "#EC4899",
      mug: "#F59E0B",
    }
    return colors[model as keyof typeof colors] || "#8B5CF6"
  }

  const items = []
  for (let i = 0; i < item.quantity; i++) {
    items.push(
      <Float key={i} speed={1 + i * 0.2} rotationIntensity={0.1} floatIntensity={0.2}>
        <mesh position={[position[0] + i * 0.4, position[1], position[2]]}>
          {getGeometry(item.model)}
          <meshStandardMaterial
            color={getColor(item.model)}
            metalness={0.6}
            roughness={0.2}
            emissive={getColor(item.model)}
            emissiveIntensity={0.1}
          />
        </mesh>
      </Float>,
    )
  }

  return <group>{items}</group>
}

export default function DigitalBox({ items }: { items: CartItem[] }) {
  return (
    <div className="h-96">
      <div className="h-full bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-2xl shadow-2xl border border-purple-500/20">
        <Canvas camera={{ position: [4, 4, 4], fov: 50 }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 5]} intensity={1} color="#8B5CF6" />
          <pointLight position={[-5, -5, -5]} intensity={0.5} color="#EC4899" />
          <spotLight position={[0, 8, 0]} intensity={0.8} color="#06B6D4" />
          <Environment preset="night" />

          <BoxContainer />
          <Sparkles count={50} scale={8} size={2} speed={0.3} />

          {items.map((item, index) => (
            <CartItem3D
              key={item.id}
              item={item}
              position={[-1.5 + (index % 2) * 1.5, -0.5, -0.5 + Math.floor(index / 2) * 0.8]}
            />
          ))}

          <OrbitControls enableZoom={true} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      <div className="mt-6 text-center bg-white rounded-xl p-4 shadow-lg border border-gray-200">
        <h3 className="font-bold text-xl text-gray-800 mb-2">Your Digital Box</h3>
        <p className="text-gray-600">
          <span className="font-semibold text-purple-600">{items.reduce((sum, item) => sum + item.quantity, 0)}</span>{" "}
          items ready to ship
        </p>
        <div className="mt-2 text-sm text-gray-500">✨ Experience your items in 3D before they arrive</div>
      </div>
    </div>
  )
}
