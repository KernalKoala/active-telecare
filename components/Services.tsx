import Image from 'next/image'

export default function Services() {
  const services = [
    { title: '24/7 Monitoring', description: 'Round-the-clock health monitoring and support' },
    { title: 'Emergency Response', description: 'Immediate assistance when you need it most' },
    { title: 'Health Tracking', description: 'Track vital signs and health metrics remotely' },
    { title: 'Care Coordination', description: 'Seamless coordination with healthcare providers' },
  ]

  const offerings = [
    { 
      title: 'Experienced installers', 
      description: 'Our Telecare Consultants are experienced at setting up and demonstrating personal alarm systems to our customers.',
      image: '/images/service-1.jpg'
    },
    { 
      title: 'You choose the time and date', 
      description: 'Choose from morning or afternoon appointments, Monday to Friday.',
      image: '/images/service-2.jpg'
    },
    { 
      title: 'Let us do the work', 
      description: 'Installation is normally within 14 days of ordering.',
      image: '/images/service-3.jpg'
    },
    { 
      title: 'Includes testing and demonstration', 
      description: 'Once the personal alarm system is set up and tested, our Telecare Consultant will show you how it works.',
      image: '/images/service-4.jpg'
    },
  ]

  return (
    <section id="services" className="pt-32 bg-white">
      <div className="bg-[#3ebdad] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-white">Services</h2>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-16 max-w-4xl mx-auto">
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            There is a lot more that can be provided beyond the standard telecare service provision with new technology regularly being introduced. Active TeleCare Solutions can provide customers with a much wider range of services including:
          </p>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-[#3ebdad] mr-3 mt-1">•</span>
              <span>An active and modern forward-thinking telecare offer with a professional external monitoring and response centre</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#3ebdad] mr-3 mt-1">•</span>
              <span>A more attractive option for users, removing some of the stigma of telecare alarms</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#3ebdad] mr-3 mt-1">•</span>
              <span>A good quality service which can be tailored to meet each {"user's"} specific needs</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#3ebdad] mr-3 mt-1">•</span>
              <span>A customised technology service package to support independence.</span>
            </li>
          </ul>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="p-6 border border-brand-teal/20 rounded-lg hover:shadow-lg hover:border-brand-teal transition">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-24">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">What we can offer</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {offerings.map((offering, index) => (
              <div key={index} className="text-center">
                <div className="relative w-full aspect-square mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={offering.image}
                    alt={offering.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{offering.title}</h4>
                <p className="text-gray-600 text-sm">{offering.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
