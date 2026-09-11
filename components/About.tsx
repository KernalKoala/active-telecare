export default function About() {
  return (
    <section id="about" className="pt-32 bg-gray-50">
      <div className="bg-[#3ebdad] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-white">About Us</h2>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-2 gap-12">
          <div className="bg-contain bg-left bg-no-repeat h-[28rem]" style={{backgroundImage: 'url(/images/mark-1.jpg)'}}>
          </div>
          <div>
            <p className="text-gray-700 mb-4">Mark Close, the Managing Director of Active TeleCare Solutions, brings a wealth of experience from his extensive career in senior management roles within the construction industry. His expertise spans health & safety management, consultancy, and advisory services. With a robust background in the public sector, Mark dedicated 14 years as a Housing and Property Manager for the {"Island's"} local authority public sector housing.</p>
            <p className="text-gray-700 mb-4">During this time, he amassed invaluable knowledge and experience in the management and provision of telecare systems and services. {"Mark's"} deep understanding of both the construction and public housing sectors uniquely positions him to lead Active TeleCare Solutions in delivering exceptional telecare services tailored to meet diverse client needs.</p>
            <p className="text-gray-700">Under {"Mark's"} leadership, Active TeleCare Solutions is committed to enhancing the quality of life for individuals through innovative and reliable telecare solutions. Trust in our expertise to provide the highest standard of telecare service.</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Key objectives</h3>
            <ul className="text-gray-700 space-y-3">
              <li className="flex gap-2"><span className="flex-shrink-0">•</span><span>To be the {"Island's"} most specialised up-to-date telecare service provider, offering a wide range of modern telecare devices including standard personal alarms</span></li>
              <li className="flex gap-2"><span className="flex-shrink-0">•</span><span>To keep the {"Island's"} telecare service in line with the UK and offer modern digital devices and associated sensors</span></li>
              <li className="flex gap-2"><span className="flex-shrink-0">•</span><span>To provide excellent quality customer service throughout and to provide affordable packages that are simple to subscribe to.</span></li>
            </ul>
            <p className="text-gray-700 mt-4">At Active TeleCare Solutions, we are interested in exploring the impact and benefits of a much more ambitious and proactive approach to telecare technology, building on best practices worldwide.</p>
          </div>
          <div className="bg-gray-100 p-8 flex items-center justify-center">
            <blockquote className="text-xl italic text-gray-700 text-center">
              <svg className="w-8 h-8 text-[#3ebdad] mb-4 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
              </svg>
              When technology is embedded seamlessly into care and support services, it can be transformative, supporting people to live happy and fulfilled lives in their homes and communities; enabling them to live independently for longer.
            </blockquote>
          </div>
          <div className="bg-cover bg-center h-[28rem] border-8 border-white shadow-lg" style={{backgroundImage: 'url(/images/family-help.jpg)'}}>
          </div>
          <div>
            <p className="text-gray-700 mb-4">Our aim is to make our service bespoke, starting with a free personal consultation to determine {"customer's"} needs and agree on the most suitable telecare devices and equipment.</p>
            <p className="text-gray-700 font-semibold mb-2">Services include:</p>
            <ul className="text-gray-700 space-y-2 mb-4">
              <li className="flex gap-2"><span className="flex-shrink-0">•</span><span>Setting up and testing equipment;</span></li>
              <li className="flex gap-2"><span className="flex-shrink-0">•</span><span>Ongoing management and monitoring of each device;</span></li>
              <li className="flex gap-2"><span className="flex-shrink-0">•</span><span>A high-quality, dependable 24/7 response assistance service.</span></li>
            </ul>
            <p className="text-gray-700">Active TeleCare Solutions Limited is an independent service provider with contacts within the leading telecare device suppliers in the UK, and therefore provide the best quality devices on the market, without being tied to any individual organisation.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
