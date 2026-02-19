export default function About() {
  return (
    <section id="about" className="pt-32 bg-gray-50">
      <div className="bg-[#3ebdad] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-white">About Us</h2>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-2 gap-8">
          <div className="bg-contain bg-left bg-no-repeat h-[28rem]" style={{backgroundImage: 'url(/images/mark-1.jpg)'}}>
          </div>
          <div>
            <p className="text-gray-700 mb-4">Mark Close, the Managing Director of Active TeleCare Solutions, brings a wealth of experience from his extensive career in senior management roles within the construction industry. His expertise spans health & safety management, consultancy, and advisory services. With a robust background in the public sector, Mark dedicated 14 years as a Housing and Property Manager for the Island's local authority public sector housing.</p>
            <p className="text-gray-700 mb-4">During this time, he amassed invaluable knowledge and experience in the management and provision of telecare systems and services. Mark's deep understanding of both the construction and public housing sectors uniquely positions him to lead Active TeleCare Solutions in delivering exceptional telecare services tailored to meet diverse client needs.</p>
            <p className="text-gray-700">Under Mark's leadership, Active TeleCare Solutions is committed to enhancing the quality of life for individuals through innovative and reliable telecare solutions. Trust in our expertise to provide the highest standard of telecare service.</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Section 3</h3>
            <p className="text-gray-700">Content for section 3 goes here.</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Section 4</h3>
            <p className="text-gray-700">Content for section 4 goes here.</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Section 5</h3>
            <p className="text-gray-700">Content for section 5 goes here.</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Section 6</h3>
            <p className="text-gray-700">Content for section 6 goes here.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
