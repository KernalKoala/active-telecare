'use client'

import { useState } from 'react'
import Image from 'next/image'

interface Product {
  id: string
  name: string
  description: string
  price: number
  billing_frequency: 'yearly' | 'monthly' | 'one-off'
  image_url: string
}

export default function Products({ products }: { products: Product[] }) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const truncateDescription = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  return (
    <section id="products" className="pt-32 bg-white">
      <div className="bg-[#3ebdad] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center text-white">Catalogue</h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {products.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No products available at the moment.</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div 
                key={product.id} 
                onClick={() => setSelectedProduct(product)}
                className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer"
              >
                <div className="relative h-48 bg-gray-50">
                  {/* Keep uploaded URLs browser-loaded; no server image proxy is configured. */}
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    unoptimized
                    className="object-contain p-4"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{truncateDescription(product.description)}</p>
                  {product.price > 0 && (
                    <p className="text-[#3ebdad] font-bold text-xl">
                      £{product.price.toFixed(2)}
                      {product.billing_frequency === 'monthly' && ' /month'}
                      {product.billing_frequency === 'yearly' && ' /year'}
                    </p>
                  )}
                  <p className="text-sm text-[#3ebdad] mt-2 font-medium">Click for details →</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedProduct(null)}
        >
          <div 
            className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-64 md:h-96">
              <Image
                src={selectedProduct.image_url}
                alt={selectedProduct.name}
                fill
                unoptimized
                className="object-cover"
              />
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 md:p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{selectedProduct.name}</h2>
              {selectedProduct.price > 0 && (
                <>
                  <p className="text-[#3ebdad] font-bold text-2xl mb-2">
                    £{selectedProduct.price.toFixed(2)}
                    {selectedProduct.billing_frequency === 'monthly' && ' /month'}
                    {selectedProduct.billing_frequency === 'yearly' && ' /year'}
                  </p>
                  <p className="text-gray-600 text-sm mb-6">
                    {selectedProduct.billing_frequency === 'one-off' ? 'One-off payment' : 
                     selectedProduct.billing_frequency === 'monthly' ? 'Billed monthly' : 
                     'Billed yearly'}
                  </p>
                </>
              )}
              <div className="text-gray-700 whitespace-pre-line leading-relaxed">
                {selectedProduct.description}
              </div>
              <div className="mt-8 flex gap-4">
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                >
                  Close
                </button>
                <a
                  href="/contact"
                  className="flex-1 bg-[#3ebdad] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#35a89a] transition text-center"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

