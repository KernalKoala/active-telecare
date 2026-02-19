export default function ContentGrid() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8">
          <div className="bg-gray-100 p-8 flex items-center justify-center h-[26rem]">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Content Title 1</h3>
              <p className="text-gray-700">Your content description goes here.</p>
            </div>
          </div>
          <div className="bg-gray-200 bg-cover bg-center h-[26rem]" style={{backgroundImage: 'url(/images/device.jpg)'}}>
          </div>
          <div className="bg-gray-200 bg-cover bg-center h-[26rem]" style={{backgroundImage: 'url(/images/lifeline-digital.jpg)'}}>
          </div>
          <div className="bg-gray-100 p-8 flex items-center justify-center h-[26rem]">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Content Title 2</h3>
              <p className="text-gray-700">Your content description goes here.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
