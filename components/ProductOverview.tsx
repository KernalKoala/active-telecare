import Image from 'next/image'
import Link from 'next/link'

const enquiryButton = (
  <Link
    href="/contact"
    className="inline-flex rounded border-2 border-[#3ebdad] px-6 py-3 text-sm font-bold uppercase tracking-wide text-[#3ebdad] transition-colors hover:bg-[#3ebdad] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3ebdad]"
  >
    Send enquiry
  </Link>
)

export default function ProductOverview() {
  return (
    <section className="bg-white pt-32">
      <div className="bg-[#3ebdad] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-center text-4xl font-bold text-white">Our Products</h1>
        </div>
      </div>

      <div className="py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 md:grid-cols-2 lg:gap-16 lg:px-8">
          <Image
            src="/images/careline-system.jpeg"
            alt="Careline System hub and personal pendant"
            width={768}
            height={803}
            className="h-auto w-full border border-gray-300"
            priority
          />
          <div className="text-[17px] leading-7 text-gray-600">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">Careline System</h2>
            <p className="mb-4">Active TeleCare Solutions Careline System; a digital device that connects to the internet via SIM, Wi-Fi and or fixed-line broadband and switches between these to find the best connection.</p>
            <p className="mb-4">For as little as £6.92 per week or £360 per annum you can receive a Careline System of modern and elegant design suitable for all home environments.</p>
            <p className="mb-4">For this, you will get the equipment, repairs and maintenance, monitoring, and response, as well as an annual visit to check the equipment and update the information we hold.</p>
            <p className="mb-4">The Careline System is made up of a unit and a personal pendant which can be used to raise an alarm call to the alarm receiving control centre from anywhere in the home.</p>
            <p className="mb-4">The personal pendant is waterproof and can be worn around the neck, on the wrist, or clipped to a belt.</p>
            <p className="mb-2">You can raise an alarm call by:</p>
            <ul className="mb-4 list-disc space-y-1 pl-6">
              <li>Using the large illuminated red button on the unit</li>
              <li>Simply pressing a radio-triggered personal pendant</li>
              <li>Or automatically via the range of sensors, wirelessly linked to the base unit.</li>
            </ul>
            <p className="mb-7">The only requirement is a spare electricity socket.</p>
            {enquiryButton}
          </div>
        </div>
      </div>

      <div className="bg-gray-100 py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 md:grid-cols-2 lg:gap-16 lg:px-8">
          <div className="text-[17px] leading-7 text-gray-600">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">Telecare sensors and alarm triggers</h2>
            <p className="mb-4">For additional costs, you can also have additional sensors which are placed discreetly around your home which monitor and detect potentially hazardous situations.</p>
            <p className="mb-4">There are many personal detectors, including a fall Detector, Bed Occupancy Sensor, Epilepsy Sensor, and Enuresis Sensor.</p>
            <p className="mb-7">Equally, there are many detectors that monitor environmental risks, including a smoke Detector, CO Detector, Door Contact Sensor, Temperature Extreme Sensor and Flood Detector.</p>
            {enquiryButton}
          </div>
          <Image
            src="/images/telecare-sensors.jpeg"
            alt="Telecare sensors and alarm triggers"
            width={1920}
            height={1355}
            className="h-auto w-full border border-gray-300 md:order-last"
          />
        </div>
      </div>

      <div className="py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 md:grid-cols-2 lg:gap-16 lg:px-8">
          <Image
            src="/images/pull-cord.jpg"
            alt="Wireless pull cord alarm"
            width={400}
            height={400}
            className="mx-auto h-auto w-full max-w-lg border border-gray-300"
          />
          <div className="text-[17px] leading-7 text-gray-600">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">Pull cords and buttons</h2>
            <p className="mb-7">These can be fitted around the house in the form of wireless wall-fixed buttons or pull cords. When these triggers are pressed, or pulled, they will set off the alarm unit in the same way as your portable pendant. Pull cords can be positioned in areas where you are unlikely to wear a personal alarm button. For example, they can be positioned next to your bed or in your bathroom. Ensure the cord is long enough so that you can reach it when lying on the floor and not out of reach behind furniture.</p>
            {enquiryButton}
          </div>
        </div>
      </div>

      <div className="bg-gray-100 py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 md:grid-cols-2 lg:gap-16 lg:px-8">
          <div className="text-[17px] leading-7 text-gray-600">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">Smoke and heat alarms</h2>
            <p className="mb-4">Telecare smoke alarms will automatically sound an alarm in your home and send an alarm call to your monitoring centre if it detects smoke. The monitoring centre can then alert the fire brigade. These alarms may be appropriate if you would find it difficult to get out of your home promptly, or might not remember what the smoke alarm was for. If a telecare smoke alarm is not installed as part of your telecare system you should still have at least one working standard smoke alarm in your home which will sound an alarm if it detects smoke but these WILL NOT automatically alert your help centre.</p>
            <p className="mb-4">Smoke alarms are not generally recommended for kitchens as some smoke can be expected from cooking and toasting. Consequently, a telecare temperature extremes alarm or heat alarm may be considered. They work by detecting extremely high temperatures and also monitoring the rate of any temperature rise.</p>
            <p className="mb-7">As with smoke alarms, even if you don’t have a telecare heat detector consider purchasing a standard battery-operated heat detector for use in your kitchen.</p>
            {enquiryButton}
          </div>
          <Image
            src="/images/smoke-alarm.jpeg"
            alt="Telecare smoke and heat alarm"
            width={1280}
            height={1024}
            className="h-auto w-full border border-gray-300 md:order-last"
          />
        </div>
      </div>

      <div className="py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 md:grid-cols-2 lg:gap-16 lg:px-8">
          <Image
            src="/images/abby-device.jpg"
            alt="Careium Abby device with charger and strap"
            width={1000}
            height={1000}
            className="h-auto w-full border border-gray-300"
          />
          <div className="text-[17px] leading-7 text-gray-600">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">Careium’s Abby</h2>
            <p className="mb-4">Abby is a small and comfortable out-and-about telecare device with GPS positioning and voice capability that improves security not only in the home, but everywhere the user goes. It is waterproof (IP67) and easy to carry around at all times, either as a pendant around the neck, in the pocket or in the carry bag that can be attached to the belt.</p>
            <p className="mb-7">When the emergency button is pressed, an alarm will be sent to the monitoring centre, home care staff, or to a relative. The device also supports automatically triggered alarms, including fall and geofence alarms. The built-in speakerphone enables voice communication between the user and the alarm recipient.</p>
            {enquiryButton}
          </div>
        </div>
      </div>

      <div className="bg-gray-100 py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 md:grid-cols-2 lg:gap-16 lg:px-8">
          <div className="text-[17px] leading-7 text-gray-600">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">Key Safe</h2>
            <p className="mb-4">A ‘Police Preferred’ key safe can be made available if required, provided and installed for £99 including VAT.</p>
            <p className="mb-4">A key safe is a secure, convenient, and discreet weatherproof box that allows you to keep a set of keys outside your home.</p>
            <p className="mb-7">If you need assistance, it’s reassuring to know that your family, carers, and if necessary, the emergency services can quickly gain access to your home.</p>
            {enquiryButton}
          </div>
          <Image
            src="/images/key-safe.webp"
            alt="Police Preferred key safe"
            width={2048}
            height={2048}
            className="h-auto w-full border border-gray-300 md:order-last"
          />
        </div>
      </div>
    </section>
  )
}
