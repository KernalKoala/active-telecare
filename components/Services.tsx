export default function Services() {
  const services = [
    { title: '24/7 Monitoring', description: 'Round-the-clock health monitoring and support' },
    { title: 'Emergency Response', description: 'Immediate assistance when you need it most' },
    { title: 'Health Tracking', description: 'Track vital signs and health metrics remotely' },
    { title: 'Care Coordination', description: 'Seamless coordination with healthcare providers' },
  ]

  return (
    <section id="services" className="pt-32 bg-white">
      <div className="bg-[#3ebdad] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-white">Services</h2>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="p-6 border border-brand-teal/20 rounded-lg hover:shadow-lg hover:border-brand-teal transition">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
