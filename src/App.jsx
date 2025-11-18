import HeroHeader from './components/HeroHeader'
import InquiryForm from './components/InquiryForm'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>

      <div className="relative min-h-screen flex items-center justify-center p-6 md:p-10">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-8">
            <img src="/flame-icon.svg" alt="Flames" className="w-16 h-16 mx-auto drop-shadow-[0_0_25px_rgba(59,130,246,0.5)]" />
          </div>

          <HeroHeader />

          <InquiryForm />

          <p className="mt-6 text-center text-blue-300/70 text-sm">
            We will reach out within 24-48 hours with availability and next steps.
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
