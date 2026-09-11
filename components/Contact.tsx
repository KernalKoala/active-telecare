'use client'

import { useState } from 'react'

export default function Contact() {
  const [status, setStatus] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('sending')

    const form = e.currentTarget
    const formData = new FormData(form)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      message: formData.get('message'),
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      console.log('Response status:', response.status)
      console.log('Response ok:', response.ok)
      const result = await response.json()
      console.log('Response data:', result)

      if (response.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch (error) {
      console.error('Fetch error:', error)
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="pt-32 bg-white">
      <div className="bg-[#3ebdad] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-white">Contact Us</h2>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6">Send us a message!</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal"
            />
            <textarea
              name="message"
              placeholder="Message"
              rows={5}
              required
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal"
            />
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full bg-[#3ebdad] text-white py-3 rounded-lg font-semibold hover:bg-teal-600 transition disabled:opacity-50"
            >
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
            {status === 'success' && <p className="text-green-600">Message sent successfully!</p>}
            {status === 'error' && <p className="text-red-600">Failed to send message. Please try again.</p>}
            </form>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6">Get in touch to discuss any of our products or services and {"we'll"} be glad to assist!</h3>
            <div className="space-y-4 text-gray-700">
              <div>
                <p className="font-semibold">Active TeleCare Solutions Limited</p>
                <p>Anchor Down, Bride Road</p>
                <p>Ramsey</p>
                <p>Isle of Man</p>
                <p>IM8 3UN</p>
              </div>
              <div>
                <p><strong>Tel.</strong> (07624) 460520</p>
                <p><strong>Email:</strong> info@activetelecare.im</p>
              </div>
            </div>
            <div className="mt-8 bg-cover bg-center h-[32rem] border-8 border-white shadow-lg" style={{backgroundImage: 'url(/images/device.jpg)'}}>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
