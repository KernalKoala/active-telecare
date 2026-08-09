import Image from 'next/image'
import Link from 'next/link'

const personalDetectors = [
  'Fall Detector',
  'Bed Occupancy Sensor',
  'Epilepsy Sensor',
  'Enuresis Sensor',
]

const environmentalDetectors = [
  'Smoke Detector',
  'Carbon Monoxide (CO) Detector',
  'Door Contact Sensor',
  'Extreme Temperature Sensor',
  'Flood Detector',
]

const abbyFeatures = [
  'GPS positioning so you can be located quickly in an emergency',
  'Waterproof to IP67, so it can be worn in the shower or rain',
  'Automatic fall detection',
  'Geofence alarms that alert if the wearer travels outside a set area',
  'Built-in speakerphone for two-way conversation with the monitoring centre',
]

function SendEnquiryButton() {
  return (
    <Link
      href="/contact"
      className="inline-block bg-[#3ebdad] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#35a89a] transition"
    >
      SEND ENQUIRY
    </Link>
  )
}

export default function OurProducts() {
  return (
    <section id="our-products" className="pt-32 bg-white">
      <div className="bg-[#3ebdad] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-white">Our Products</h2>
          <p className="text-center text-white/90 text-lg mt-4 max-w-2xl mx-auto">
            Live confidently at home with our smart solutions that promote independence and provide peace of mind.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-24">

        {/* Careline System */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Careline System</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our Careline System is a digital device that connects to the internet via SIM, Wi-Fi and/or fixed-line broadband,
              linking you to our 24/7 monitoring centre at the touch of a button. The system includes a base unit and a
              waterproof pendant, so help is always close at hand, day or night.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The alarm can be activated in three ways: pressing the illuminated red button on the base unit, pressing the
              waterproof pendant, or automatically via a connected sensor.
            </p>
            <p className="text-[#3ebdad] font-bold text-2xl mb-2">£6.92 per week <span className="text-gray-500 font-normal text-base">or £360 per annum</span></p>
            <p className="text-gray-600 text-sm mb-6">
              Price includes equipment, repairs, maintenance, 24/7 monitoring, emergency response and an annual visit.
            </p>
            <SendEnquiryButton />
          </div>
          <div className="relative h-80 rounded-lg overflow-hidden">
            <Image src="/images/device.jpg" alt="Careline System base unit" fill className="object-cover" />
          </div>
        </div>

        {/* Telecare Sensors & Alarm Triggers */}
        <div>
          <h3 className="text-3xl font-bold text-gray-900 mb-4 text-center">Telecare Sensors &amp; Alarm Triggers</h3>
          <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto text-center mb-12">
            Sensors and alarm triggers connect to your Careline System and raise an alarm automatically, so help is called
            even if you can&apos;t press a button yourself. Available as add-ons to your Careline package.
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-6 border border-brand-teal/20 rounded-lg">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Personal Detectors</h4>
              <ul className="space-y-3 text-gray-700">
                {personalDetectors.map((item) => (
                  <li key={item} className="flex items-start">
                    <span className="text-[#3ebdad] mr-3 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 border border-brand-teal/20 rounded-lg">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Environmental Detectors</h4>
              <ul className="space-y-3 text-gray-700">
                {environmentalDetectors.map((item) => (
                  <li key={item} className="flex items-start">
                    <span className="text-[#3ebdad] mr-3 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="text-center mt-10">
            <SendEnquiryButton />
          </div>
        </div>

        {/* Pull Cords & Buttons */}
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Pull Cords &amp; Buttons</h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            Wireless pull cords and buttons can be wall-mounted anywhere extra reassurance is needed, such as the bedroom
            or bathroom, giving you another way to call for help without carrying a pendant.
          </p>
          <SendEnquiryButton />
        </div>

        {/* Smoke & Heat Alarms */}
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Smoke &amp; Heat Alarms</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Telecare smoke alarms automatically sound an alarm in your home and send an alarm call to your monitoring
            centre, so help is on the way even if you&apos;re unable to call for it yourself.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            For kitchens, we recommend a heat alarm instead, which is designed to detect extremely high temperatures
            without being triggered by everyday cooking.
          </p>
          <SendEnquiryButton />
        </div>

        {/* Careium's Abby */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-80 rounded-lg overflow-hidden md:order-2">
            <Image src="/images/lifeline-digital.jpg" alt="Careium's Abby portable telecare device" fill className="object-cover" />
          </div>
          <div className="md:order-1">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Careium&apos;s Abby</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Abby is a small and comfortable out-and-about telecare device with GPS positioning and voice capability,
              giving you the confidence to stay active outside the home.
            </p>
            <ul className="space-y-3 text-gray-700 mb-6">
              {abbyFeatures.map((item) => (
                <li key={item} className="flex items-start">
                  <span className="text-[#3ebdad] mr-3 mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <SendEnquiryButton />
          </div>
        </div>

        {/* Key Safe */}
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Key Safe</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our &apos;Police Preferred&apos; key safe provides secure outdoor key storage, allowing our response team (or
            family and carers) to gain entry quickly in an emergency without needing to force a door.
          </p>
          <p className="text-[#3ebdad] font-bold text-2xl mb-6">£99 <span className="text-gray-500 font-normal text-base">including VAT</span></p>
          <SendEnquiryButton />
        </div>

        <div className="text-center border-t pt-12">
          <p className="text-gray-600">
            Looking for something specific?{' '}
            <Link href="/all-products" className="text-[#3ebdad] font-semibold hover:underline">
              Browse our full product catalogue →
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
