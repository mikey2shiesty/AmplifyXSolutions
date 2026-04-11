import { useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { properties, suburbs, propertyTypes } from '../data/properties.js'
import PropertyCard from '../components/PropertyCard.jsx'

const budgets = [
  { label: 'No Maximum', value: '' },
  { label: 'Up to $5M', value: '5000000' },
  { label: 'Up to $10M', value: '10000000' },
  { label: 'Up to $15M', value: '15000000' },
  { label: 'Up to $25M', value: '25000000' },
  { label: '$25M+', value: '25000001' },
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [suburb, type, maxPrice, beds, sort])

  const filtered = useMemo(() => {
    let list = properties.filter((p) => {
      if (suburb !== 'All suburbs' && p.suburb !== suburb) return false
      if (type !== 'All types' && p.type !== type) return false
      if (maxPrice) {
        if (maxPrice === '25000001') {
          if (p.price < 25000000) return false
        } else if (p.price > Number(maxPrice)) return false
      }
      if (beds && p.beds < Number(beds)) return false
      return true
    })

    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price)

    return list
  }, [suburb, type, maxPrice, beds, sort])

  const reset = () => {
    setSuburb('All suburbs')
    setType('All types')
    setMaxPrice('')
    setBeds('')
    setSort('featured')
  }

  return (
    <>
      {/* Page header */}
      <section className="pt-40 pb-16 bg-charcoal-900 text-ivory-50">
        <div className="container-px">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="max-w-3xl"
          >
            <div className="eyebrow text-bronze-400 mb-5">The Full Collection</div>
            <h1 className="font-display text-5xl md:text-7xl leading-[1.02] tracking-tight">
              Homes currently<br /><span className="italic text-bronze-400">represented</span>
            </h1>
            <p className="mt-8 text-ivory-50/70 max-w-xl leading-relaxed">
              Our complete public portfolio. Additional off-market opportunities are shared privately with registered clients.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter bar */}
      <section className="sticky top-20 md:top-24 z-30 bg-ivory-50 border-b border-charcoal-900/10">
        <div className="container-px py-5">
          <div className="flex flex-wrap items-center gap-3 md:gap-4">
            <Select label="Suburb" value={suburb} onChange={setSuburb} options={suburbs} />
            <Select label="Type" value={type} onChange={setType} options={propertyTypes} />
            <Select
              label="Budget"
              value={maxPrice}
              onChange={setMaxPrice}
              options={budgets.map((b) => ({ label: b.label, value: b.value }))}
              objectOptions
            />
            <Select
              label="Beds"
              value={beds}
              onChange={setBeds}
              options={[
                { label: 'Any', value: '' },
                { label: '3+', value: '3' },
                { label: '4+', value: '4' },
                { label: '5+', value: '5' },
              ]}
              objectOptions
            />

            <div className="flex-1" />

            <Select
              label="Sort"
              value={sort}
              onChange={setSort}
              options={sortOptions}
              objectOptions
            />
            <button
              type="button"
              onClick={reset}
              className="px-4 py-2 text-[11px] uppercase tracking-widest text-charcoal-900/60 hover:text-bronze-500 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 md:py-24">
        <div className="container-px">
          <div className="flex items-end justify-between mb-10 md:mb-14">
            <div className="font-display text-xl md:text-2xl">
              <span className="text-bronze-600">{filtered.length}</span> residence{filtered.length === 1 ? '' : 's'}
            </div>
            <div className="text-[11px] uppercase tracking-widest text-charcoal-900/50 hidden md:block">
              Updated today
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="py-32 text-center">
              <div className="font-display text-3xl mb-4">No matches in the current collection.</div>
              <p className="text-charcoal-900/60 mb-8">
                Off-market opportunities matching your brief may be available — please enquire privately.
              </p>
              <button onClick={reset} className="btn-outline">Reset filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {filtered.map((p, i) => (
                <PropertyCard key={p.id} property={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

function Select({ label, value, onChange, options, objectOptions = false }) {
  return (
    <label className="flex flex-col bg-ivory-100 border border-charcoal-900/10 px-5 py-3 min-w-[160px] hover:border-bronze-500/50 transition-colors cursor-pointer">
      <span className="text-[9px] uppercase tracking-widest text-charcoal-900/50">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent text-sm text-charcoal-900 focus:outline-none appearance-none cursor-pointer pr-4"
      >
        {options.map((opt) =>
          objectOptions ? (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ) : (
            <option key={opt} value={opt}>{opt}</option>
          )
        )}
      </select>
    </label>
  )
}
