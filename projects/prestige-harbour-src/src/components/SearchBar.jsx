import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { suburbs, propertyTypes } from '../data/properties.js'

const budgets = [
  { label: 'No Maximum', value: '' },
  { label: 'Up to $5M', value: '5000000' },
  { label: 'Up to $10M', value: '10000000' },
  { label: 'Up to $15M', value: '15000000' },
  { label: 'Up to $25M', value: '25000000' },
  { label: '$25M+', value: '25000001' },
]

export default function SearchBar({ variant = 'floating' }) {
  const navigate = useNavigate()
  const [suburb, setSuburb] = useState(suburbs[0])
  const [type, setType] = useState(propertyTypes[0])
  const [budget, setBudget] = useState(budgets[0].value)

  const onSubmit = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (suburb && suburb !== 'All suburbs') params.set('suburb', suburb)
    if (type && type !== 'All types') params.set('type', type)
    if (budget) params.set('maxPrice', budget)
    navigate(`/listings${params.toString() ? `?${params.toString()}` : ''}`)
  }

  const isFloating = variant === 'floating'

  return (
    <form
      onSubmit={onSubmit}
      className={`${
        isFloating
          ? 'bg-ivory-50 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.35)]'
          : 'bg-ivory-100 border border-charcoal-900/10'
      } grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-charcoal-900/10`}
    >
      <label className="p-6 md:p-7">
        <div className="eyebrow mb-2">Suburb</div>
        <select
          value={suburb}
          onChange={(e) => setSuburb(e.target.value)}
          className="w-full bg-transparent text-charcoal-900 font-display text-lg focus:outline-none cursor-pointer appearance-none"
        >
          {suburbs.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </label>

      <label className="p-6 md:p-7">
        <div className="eyebrow mb-2">Property Type</div>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full bg-transparent text-charcoal-900 font-display text-lg focus:outline-none cursor-pointer appearance-none"
        >
          {propertyTypes.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>

      <label className="p-6 md:p-7">
        <div className="eyebrow mb-2">Budget</div>
        <select
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="w-full bg-transparent text-charcoal-900 font-display text-lg focus:outline-none cursor-pointer appearance-none"
        >
          {budgets.map((b) => (
            <option key={b.label} value={b.value}>
              {b.label}
            </option>
          ))}
        </select>
      </label>

      <button
        type="submit"
        className="bg-charcoal-900 text-ivory-50 text-xs uppercase tracking-widest py-6 md:py-0 px-10 hover:bg-bronze-600 transition-colors duration-500"
      >
        Search Collection
      </button>
    </form>
  )
}
