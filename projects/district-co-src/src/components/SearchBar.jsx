import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { suburbs, propertyTypes } from '../data/properties.js'

const budgets = [
  { label: 'No Maximum', value: '' },
  { label: 'Up to $500K', value: '500000' },
  { label: 'Up to $750K', value: '750000' },
  { label: 'Up to $1M', value: '1000000' },
  { label: 'Up to $1.5M', value: '1500000' },
  { label: 'Up to $2M', value: '2000000' },
  { label: '$2M+', value: '2000001' },
]

export default function SearchBar() {
  const navigate = useNavigate()
  const [suburb, setSuburb] = useState(suburbs[0])
  const [type, setType] = useState(propertyTypes[0])
  const [budget, setBudget] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (suburb && suburb !== 'All suburbs') params.set('suburb', suburb)
    if (type && type !== 'All types') params.set('type', type)
    if (budget) params.set('maxPrice', budget)
    navigate(`/listings${params.toString() ? `?${params.toString()}` : ''}`)
  }

  return (
    <form
      onSubmit={onSubmit}
      className="bg-slate-800 border border-white/10 grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10"
    >
      <label className="p-6 md:p-7">
        <div className="eyebrow mb-2">Suburb</div>
        <select value={suburb} onChange={(e) => setSuburb(e.target.value)} className="w-full bg-transparent text-white font-display text-lg font-medium focus:outline-none cursor-pointer appearance-none">
          {suburbs.map((s) => <option key={s} className="bg-slate-800 text-white">{s}</option>)}
        </select>
      </label>

      <label className="p-6 md:p-7">
        <div className="eyebrow mb-2">Property Type</div>
        <select value={type} onChange={(e) => setType(e.target.value)} className="w-full bg-transparent text-white font-display text-lg font-medium focus:outline-none cursor-pointer appearance-none">
          {propertyTypes.map((t) => <option key={t} className="bg-slate-800 text-white">{t}</option>)}
        </select>
      </label>

      <label className="p-6 md:p-7">
        <div className="eyebrow mb-2">Budget</div>
        <select value={budget} onChange={(e) => setBudget(e.target.value)} className="w-full bg-transparent text-white font-display text-lg font-medium focus:outline-none cursor-pointer appearance-none">
          {budgets.map((b) => <option key={b.label} value={b.value} className="bg-slate-800 text-white">{b.label}</option>)}
        </select>
      </label>

      <button type="submit" className="bg-teal-500 text-slate-950 text-xs uppercase tracking-[0.2em] font-semibold py-6 md:py-0 px-10 hover:bg-teal-400 transition-colors duration-500">
        Search Properties
      </button>
    </form>
  )
}
