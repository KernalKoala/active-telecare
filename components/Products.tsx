export default function Products() {
  const products = [
    { title: 'Product 1', description: 'Product description here' },
    { title: 'Product 2', description: 'Product description here' },
    { title: 'Product 3', description: 'Product description here' },
    { title: 'Product 4', description: 'Product description here' },
  ]

  return (
    <section id="products" className="pt-32 bg-white">
      <div className="bg-[#3ebdad] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-white">Products</h2>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div key={index} className="p-6 border border-brand-teal/20 rounded-lg hover:shadow-lg hover:border-brand-teal transition">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{product.title}</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
