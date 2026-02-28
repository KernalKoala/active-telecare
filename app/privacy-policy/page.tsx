import fs from 'fs'
import path from 'path'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function PrivacyPolicyPage() {
  const filePath = path.join(process.cwd(), 'content', 'privacy-policy.md')
  const markdownContent = fs.readFileSync(filePath, 'utf8')

  // Simple markdown to HTML conversion
  const htmlContent = markdownContent
    .split('\n')
    .map(line => {
      // Headers
      if (line.startsWith('### ')) {
        return `<h3 class="text-xl font-semibold text-gray-900 mt-8 mb-4">${line.slice(4)}</h3>`
      }
      if (line.startsWith('## ')) {
        return `<h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">${line.slice(3)}</h2>`
      }
      if (line.startsWith('# ')) {
        return `<h1 class="text-4xl font-bold text-gray-900 mb-4">${line.slice(2)}</h1>`
      }
      // Bold text
      if (line.includes('**')) {
        line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      }
      // Lists
      if (line.startsWith('- ')) {
        return `<li class="ml-6 mb-2">${line.slice(2)}</li>`
      }
      // Empty lines
      if (line.trim() === '') {
        return '<br />'
      }
      // Regular paragraphs
      return `<p class="text-gray-700 leading-relaxed mb-4">${line}</p>`
    })
    .join('\n')

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow pt-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
      </div>
      <Footer />
    </main>
  )
}
