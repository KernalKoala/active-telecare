'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'

interface Product {
  id: string
  name: string
  description: string
  price: number
  billing_frequency: 'yearly' | 'monthly' | 'one-off'
  image_url: string
  created_at: string
}

export default function ProductManager() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    billing_frequency: 'one-off' as 'yearly' | 'monthly' | 'one-off',
    image_url: ''
  })
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    try {
      console.log('Fetching products...')
      const response = await fetch('/api/products', {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache'
        }
      })
      console.log('Response status:', response.status)
      
      const data = await response.json()
      console.log('Response data:', data)
      
      if (!response.ok) {
        console.error('Failed to fetch products:', data)
        return
      }
      
      setProducts(data.products || [])
      console.log('Products set:', data.products?.length || 0)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `products/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath)

      setFormData({ ...formData, image_url: data.publicUrl })
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    try {
      // Get current session
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        alert('You must be logged in to create products')
        return
      }

      const url = editingProduct 
        ? `/api/products/${editingProduct.id}` 
        : '/api/products/create'
      
      const method = editingProduct ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price)
        })
      })

      if (response.ok) {
        setFormData({ name: '', description: '', price: '', billing_frequency: 'one-off', image_url: '' })
        setShowForm(false)
        setEditingProduct(null)
        fetchProducts()
      } else {
        const error = await response.json()
        alert(`Failed to ${editingProduct ? 'update' : 'create'} product: ${error.error}`)
      }
    } catch (error) {
      console.error('Error saving product:', error)
      alert('Failed to save product')
    }
  }

  function handleEdit(product: Product) {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      billing_frequency: product.billing_frequency,
      image_url: product.image_url
    })
    setShowForm(true)
  }

  function handleCancelEdit() {
    setEditingProduct(null)
    setFormData({ name: '', description: '', price: '', billing_frequency: 'one-off', image_url: '' })
    setShowForm(false)
  }

  const truncateDescription = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      // Get current session
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        alert('You must be logged in to delete products')
        return
      }

      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      })

      if (response.ok) {
        fetchProducts()
      } else {
        const error = await response.json()
        alert(`Failed to delete product: ${error.error}`)
      }
    } catch (error) {
      console.error('Error deleting product:', error)
      alert('Failed to delete product')
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading products...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Manage Products</h2>
        <button
          onClick={() => {
            if (showForm && editingProduct) {
              handleCancelEdit()
            } else {
              setShowForm(!showForm)
            }
          }}
          className="bg-[#3ebdad] text-white px-4 py-2 rounded-md hover:bg-[#35a89a] transition-colors"
        >
          {showForm ? 'Cancel' : 'Add New Product'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">
            {editingProduct ? 'Edit Product' : 'Add New Product'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (£)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Billing Frequency
              </label>
              <select
                value={formData.billing_frequency}
                onChange={(e) => setFormData({ ...formData, billing_frequency: e.target.value as 'yearly' | 'monthly' | 'one-off' })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="one-off">One-off Payment</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              {uploading && <p className="text-sm text-gray-500 mt-2">Uploading...</p>}
              {formData.image_url && (
                <div className="mt-2">
                  <img src={formData.image_url} alt="Preview" className="h-32 object-cover rounded" />
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={uploading || !formData.image_url}
              className="w-full bg-[#3ebdad] text-white py-2 px-4 rounded-md hover:bg-[#35a89a] transition-colors disabled:opacity-50"
            >
              {editingProduct ? 'Update Product' : 'Create Product'}
            </button>
          </form>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="bg-white rounded-lg shadow overflow-hidden cursor-pointer hover:shadow-lg transition"
            onClick={() => setSelectedProduct(product)}
          >
            <div className="relative h-48">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{truncateDescription(product.description)}</p>
              <p className="text-[#3ebdad] font-bold text-lg mb-1">
                £{product.price.toFixed(2)}
                {product.billing_frequency === 'monthly' && ' /month'}
                {product.billing_frequency === 'yearly' && ' /year'}
              </p>
              <p className="text-gray-500 text-xs mb-4">
                {product.billing_frequency === 'one-off' ? 'One-off payment' : 
                 product.billing_frequency === 'monthly' ? 'Billed monthly' : 
                 'Billed yearly'}
              </p>
              <p className="text-sm text-gray-500 mb-3">Click for details</p>
              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleEdit(product)
                  }}
                  className="flex-1 bg-[#3ebdad] text-white py-2 px-4 rounded-md hover:bg-[#35a89a] transition-colors text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDelete(product.id)
                  }}
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No products yet. Click "Add New Product" to create one.
        </div>
      )}

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
              <img
                src={selectedProduct.image_url}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
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
              <div className="text-gray-700 whitespace-pre-line leading-relaxed mb-6">
                {selectedProduct.description}
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setSelectedProduct(null)
                    handleEdit(selectedProduct)
                  }}
                  className="flex-1 bg-[#3ebdad] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#35a89a] transition"
                >
                  Edit Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
