import { useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { properties, suburbs, propertyTypes } from '../data/properties.js'
import PropertyCard from '../components/PropertyCard.jsx'

const budgets = [
  { label: 'No Maximum', value: '' },
  { label: 'Up to $500K', value: '500000' },
  { label: 'Up to $750K', value: '750000' },
  { label: 'Up to $1M', value: '1000000' },
  { label: 'Up to $1.5M', value: '1500000' },
  { label: 'Up to $2M', value: '2000000' },
  { label: '$2M+', value: '2000001' },
]

const sortOptions = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Price: Low to High', value: 'price-asc' },
]

export default function Listings() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [suburb, setSuburb] = useState(searchParams.get('suburb') || 'All suburbs')
  const [type, setType] = useState(searchParams.get('type') || 'All types')
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '')
  const [beds, setBeds] = useState(searchParams.get('beds') || '')
  const [sort, setSort] = useState(searchParams.get('sort') || 'featured')

  useEffect(() => {
    const params = new URLSearchParams()
    if (suburb !== 'All suburbs') params.set('suburb', suburb)
    if (type !== 'All types') params.set('type', type)
    if (maxPrice) params.set('maxPrice', maxPrice)
    if (beds) params.set('beds', beds)
    if (sort !== 'featured') params.set('sort', sort)
    setSearchParams(params, { replace: true })
  }, [suburb, type, maxPrice, beds, sort, setSearchParams])

  const filtered = useMemo(() => {
    let list = properties.filter((p) => {
      if (suburb !== 'All suburbs' && p.suburb !== suburb) return false
      if (type !== 'All types' && p.type !== type) return false
      if (maxPrice) {
        if (maxPrice === '2000001') { if (p.price < 2000000) return false }
        else if (p.price > Number(maxPrice)) return false
      }
      if (beds && p.beds < Number(beds)) return false
      return true
    })
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price)
    return list
  }, [suburb, type, maxPrice, beds, sort])

  const reset = () => { setSuburb('All suburbs'); setType('All types'); setMaxPrice(''); setBeds(''); setSort('featured') }

  return (
    <>
      <section className="pt-40 pb-16 bg-slate-900">
        <div className="container-px">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="max-w-3xl">
            <div className="eyebrow mb-5">The Full Collection</div>
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.02] tracking-tight">
              Properties currently<br /><span className="text-teal-400">listed</span>
            </h1>
            <p className="mt-8 text-white/60 max-w-xl leading-relaxed">All nine fictional listings. Working filters, URL-synced search, and zero real apartments.</p>
          </motion.div>
        </div>
      </section>

      <section className="sticky top-20 md:top-24 z-30 bg-slate-900 border-b border-white/10">
        <div className="container-px py-5">
          <div className="flex flex-wrap items-center gap-3 md:gap-4">
            <Select label="Suburb" value={suburb} onChange={setSuburb} options={suburbs} />
            <Select label="Type" value={type} onChange={setType} options={propertyTypes} />
            <Select label="Budget" value={maxPrice} onChange={setMaxPrice} options={budgets} objectOptions />
            <Select label="Beds" value={beds} onChange={setBeds} options={[{ label: 'Any', value: '' }, { label: '1+', value: '1' }, { label: '2+', value: '2' }, { label: '3+', value: '3' }]} objectOptions />
            <div className="flex-1" />
            <Select label="Sort" value={sort} onChange={setSort} options={sortOptions} objectOptions />
            <button type="button" onClick={reset} className="px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-white/50 hover:text-teal-400 transition-colors">Reset</button>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-px">
          <div className="flex items-end justify-between mb-10 md:mb-14">
            <div className="font-display text-xl md:text-2xl font-semibold"><span className="text-teal-400">{filtered.length}</span> propert{filtered.length === 1 ? 'y' : 'ies'}</div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-white/40 hidden md:block">Updated today</div>
          </div>
          {filtered.length === 0 ? (
            <div className="py-32 text-center">
              <div className="font-display text-3xl font-semibold mb-4">No matches in the current collection.</div>
              <p className="text-white/50 mb-8">Try adjusting your filters or resetting to see all properties.</p>
              <button onClick={reset} className="btn-outline">Reset filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {filtered.map((p, i) => <PropertyCard key={p.id} property={p} index={i} />)}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

function Select({ label, value, onChange, options, objectOptions = false }) {
  return (
    <label className="flex flex-col bg-slate-800 border border-white/10 px-5 py-3 min-w-[160px] hover:border-teal-500/50 transition-colors cursor-pointer">
      <span className="text-[9px] uppercase tracking-[0.25em] text-white/40">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="bg-transparent text-sm text-white focus:outline-none appearance-none cursor-pointer pr-4">
        {options.map((opt) => objectOptions
          ? <option key={opt.value} value={opt.value} className="bg-slate-800">{opt.label}</option>
          : <option key={opt} value={opt} className="bg-slate-800">{opt}</option>
        )}
      </select>
    </label>
  )
}
