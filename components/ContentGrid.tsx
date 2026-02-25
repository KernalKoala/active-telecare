import Link from 'next/link'

export default function ContentGrid() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-12">
          <div className="pr-8 pt-4 flex h-[26rem]">
            <div>
              <p className="text-xl text-gray-700 mb-4">Active Telecare leverages cutting-edge technology to offer crucial assistance and peace of mind to those living independently. Whether you or a loved one need extra support to ensure safety and well-being or to enhance the quality of life at home, Active Telecare provides a reliable solution.</p>
              <p className="text-lg text-gray-700 mb-6">Our services are tailored for anyone seeking to maintain their independence while benefiting from the security and reassurance that telecare offers. Explore our solutions to see how we can help you live safely and comfortably in your own home!</p>
              <Link href="/services" className="bg-[#3ebdad] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#35a89a] transition inline-block">
                Our Products
              </Link>
            </div>
          </div>
          <div className="bg-gray-200 bg-cover bg-center h-[26rem] border-8 border-white shadow-lg" style={{backgroundImage: 'url(/images/device.jpg)'}}>
          </div>
          <div className="bg-gray-200 bg-cover bg-center h-[32rem] border-8 border-white shadow-lg" style={{backgroundImage: 'url(/images/lifeline-digital.jpg)'}}>
          </div>
          <div className="pr-8 pt-4 h-[32rem] overflow-y-auto">
            <div>
              <p className="text-2xl font-normal text-gray-700 mb-2">How does telecare work?</p>
              <p className="text-gray-700 mb-4">Whatever your specific needs, telecare involves three key features that work together:</p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                <li>Base unit device</li>
                <li>Telecare equipment incl. sensors and detectors</li>
                <li>Telecare monitoring services</li>
              </ul>
              <p className="text-2xl font-normal text-gray-700 mb-2">Telecare Equipment Options</p>
              <ul className="list-disc list-inside text-gray-700 mb-3 space-y-1">
                <li>Personal alarms</li>
                <li>Fall detector</li>
                <li>Motion sensors</li>
                <li>Smoke and CO detectors</li>
              </ul>
              <p className="text-gray-700">There are many more sensors designed to monitor conditions in the home and detect potentially hazardous situations.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
