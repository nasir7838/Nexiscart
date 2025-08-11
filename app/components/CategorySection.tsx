const categories = [
  {
    name: "Electronics",
    image: "/placeholder.svg?height=300&width=400&text=Electronics+Category",
    itemCount: "15,420 items",
    color: "from-blue-500 to-blue-600",
  },
  {
    name: "Home & Garden",
    image: "/placeholder.svg?height=300&width=400&text=Home+Garden+Category",
    itemCount: "8,934 items",
    color: "from-green-500 to-green-600",
  },
  {
    name: "Fashion",
    image: "/placeholder.svg?height=300&width=400&text=Fashion+Category",
    itemCount: "12,567 items",
    color: "from-pink-500 to-pink-600",
  },
  {
    name: "Sports",
    image: "/placeholder.svg?height=300&width=400&text=Sports+Category",
    itemCount: "6,789 items",
    color: "from-orange-500 to-orange-600",
  },
]

export default function CategorySection() {
  return (
    <section className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="font-bold text-3xl text-gray-900 mb-4">Shop by Category</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover millions of products across our carefully curated categories.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((category) => (
          <div
            key={category.name}
            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="font-bold text-xl mb-2">{category.name}</h3>
              <p className="text-sm text-gray-200 mb-4">{category.itemCount}</p>
              <button
                className={`bg-gradient-to-r ${category.color} text-white px-6 py-2 rounded-lg font-semibold text-sm hover:shadow-lg transition-all duration-300`}
              >
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
