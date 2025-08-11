import ProductCard3D from "./ProductCard3D"

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

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map((product) => (
        <ProductCard3D key={product.id} product={product} />
      ))}
    </div>
  )
}
