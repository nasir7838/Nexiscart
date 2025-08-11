'use client';

import ProductImage from './ProductImage';

const brands = [
  { name: "Apple", logo: "https://images.unsplash.com/photo-1621768216002-5ac171876625?w=120&h=80&fit=crop" },
  { name: "Samsung", logo: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=120&h=80&fit=crop" },
  { name: "Sony", logo: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=120&h=80&fit=crop" },
  { name: "Nike", logo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&h=80&fit=crop" },
  { name: "Adidas", logo: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=120&h=80&fit=crop" },
  { name: "Microsoft", logo: "https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=120&h=80&fit=crop" },
  { name: "Google", logo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=120&h=80&fit=crop" },
  { name: "Amazon", logo: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=120&h=80&fit=crop" },
]

export default function BrandShowcase() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-bold text-3xl text-gray-900 mb-4">Trusted Brands</h2>
          <p className="text-gray-600">Shop from the world's most trusted and innovative brands</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="flex items-center justify-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300 cursor-pointer group"
            >
              <ProductImage
                src={brand.logo}
                alt={brand.name}
                className="max-w-full h-12 object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
