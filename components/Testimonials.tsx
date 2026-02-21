export default function Testimonials() {
  const testimonials = [
    { name: 'John Smith', text: 'Active Telecare has given me peace of mind knowing help is always available.', role: 'Client' },
    { name: 'Mary Johnson', text: 'The 24/7 monitoring service is exceptional. Highly recommend!', role: 'Family Member' },
    { name: 'Robert Brown', text: 'Professional, reliable, and caring service. Thank you!', role: 'Client' },
  ]

  return (
    <section className="pt-12 pb-32 bg-[#3ebdad]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-white mb-12">What Our Clients Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700 mb-4 italic">&quot;{testimonial.text}&quot;</p>
              <div className="border-t pt-4">
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
