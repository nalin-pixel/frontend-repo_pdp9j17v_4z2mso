import { useState } from 'react'

const initialState = {
  bride_name: '',
  groom_name: '',
  email: '',
  phone: '',
  wedding_date: '',
  venue: '',
  guest_count: '',
  budget_range: '',
  services: [],
  message: ''
}

const SERVICES = [
  'Full Planning',
  'Day-of Coordination',
  'Venue & Vendor Sourcing',
  'Design & Decor',
  'Catering',
  'Photography & Video',
  'Entertainment',
]

export default function InquiryForm() {
  const [form, setForm] = useState(initialState)
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState(null)

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const toggleService = (service) => {
    setForm((f) => {
      const exists = f.services.includes(service)
      return {
        ...f,
        services: exists ? f.services.filter(s => s !== service) : [...f.services, service]
      }
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setResult(null)

    const payload = {
      ...form,
      guest_count: form.guest_count ? Number(form.guest_count) : null,
      services: form.services,
    }

    try {
      const res = await fetch(`${baseUrl}/api/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Failed to submit')

      setResult({ status: 'success', id: data.id })
      setForm(initialState)
    } catch (err) {
      setResult({ status: 'error', message: err.message })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-slate-800/60 border border-blue-500/20 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-blue-200 mb-1">Partner A full name</label>
          <input name="bride_name" value={form.bride_name} onChange={handleChange} required className="w-full h-11 rounded-lg bg-slate-900/60 border border-slate-700/60 text-white px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., Alex Morgan" />
        </div>
        <div>
          <label className="block text-sm text-blue-200 mb-1">Partner B full name</label>
          <input name="groom_name" value={form.groom_name} onChange={handleChange} required className="w-full h-11 rounded-lg bg-slate-900/60 border border-slate-700/60 text-white px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., Jamie Lee" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-blue-200 mb-1">Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full h-11 rounded-lg bg-slate-900/60 border border-slate-700/60 text-white px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="you@example.com" />
        </div>
        <div>
          <label className="block text-sm text-blue-200 mb-1">Phone</label>
          <input name="phone" value={form.phone} onChange={handleChange} className="w-full h-11 rounded-lg bg-slate-900/60 border border-slate-700/60 text-white px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Optional" />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm text-blue-200 mb-1">Preferred date</label>
          <input type="date" name="wedding_date" value={form.wedding_date} onChange={handleChange} className="w-full h-11 rounded-lg bg-slate-900/60 border border-slate-700/60 text-white px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm text-blue-200 mb-1">City or venue</label>
          <input name="venue" value={form.venue} onChange={handleChange} className="w-full h-11 rounded-lg bg-slate-900/60 border border-slate-700/60 text-white px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., Napa Valley" />
        </div>
        <div>
          <label className="block text-sm text-blue-200 mb-1">Guest count</label>
          <input name="guest_count" value={form.guest_count} onChange={handleChange} className="w-full h-11 rounded-lg bg-slate-900/60 border border-slate-700/60 text-white px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., 120" />
        </div>
      </div>

      <div>
        <label className="block text-sm text-blue-200 mb-2">Budget range</label>
        <select name="budget_range" value={form.budget_range} onChange={handleChange} className="w-full h-11 rounded-lg bg-slate-900/60 border border-slate-700/60 text-white px-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Select a range</option>
          <option value="$10k-$20k">$10k-$20k</option>
          <option value="$20k-$40k">$20k-$40k</option>
          <option value="$40k-$60k">$40k-$60k</option>
          <option value="$60k+">$60k+</option>
        </select>
      </div>

      <div>
        <span className="block text-sm text-blue-200 mb-2">Services you're interested in</span>
        <div className="grid md:grid-cols-2 gap-2">
          {SERVICES.map((service) => (
            <label key={service} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${form.services.includes(service) ? 'bg-blue-600/20 border-blue-400/40' : 'bg-slate-900/40 border-slate-700/60'}`}>
              <input type="checkbox" checked={form.services.includes(service)} onChange={() => toggleService(service)} className="accent-blue-500" />
              <span className="text-blue-100">{service}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm text-blue-200 mb-1">Tell us more</label>
        <textarea name="message" value={form.message} onChange={handleChange} rows="4" className="w-full rounded-lg bg-slate-900/60 border border-slate-700/60 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Style, theme, must-haves, cultural traditions, etc."></textarea>
      </div>

      {result && (
        <div className={`p-3 rounded-lg text-sm ${result.status === 'success' ? 'bg-green-500/20 text-green-200 border border-green-400/30' : 'bg-red-500/20 text-red-200 border border-red-400/30'}`}>
          {result.status === 'success' ? 'Thank you! Your inquiry has been received. We will contact you shortly.' : `Oops: ${result.message}`}
        </div>
      )}

      <button disabled={submitting} type="submit" className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-semibold transition-colors">
        {submitting ? 'Submitting...' : 'Send inquiry'}
      </button>
    </form>
  )
}
