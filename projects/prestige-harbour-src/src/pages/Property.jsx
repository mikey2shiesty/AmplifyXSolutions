import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { properties, agents } from '../data/properties.js'
import PropertyCard from '../components/PropertyCard.jsx'

export default function Property() {
  const { id } = useParams()
  const property = properties.find((p) => p.id === id)
  const [active, setActive] = useState(0)

  if (!property) return <Navigate to="/listings" replace />

  const agent = agents[property.agent]
  const related = properties.filter((p) => p.id !== property.id).slice(0, 3)

  return (
    <>
      {/* Gallery */}
      <section className="pt-24 md:pt-28">
        <div className="relative grid grid-cols-12 gap-2 md:gap-3 h-[70vh] md:h-[80vh] max-h-[800px]">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="col-span-12 md:col-span-8 relative overflow-hidden"
          >
            <img
              src={property.images[active]}
              alt={property.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-6 left-6 px-3 py-1.5 bg-ivory-50/90 backdrop-blur text-charcoal-900 text-[10px] uppercase tracking-widest">
              {property.tagline}
            </div>
          </motion.div>
          <div className="hidden md:grid col-span-4 grid-rows-3 gap-3">
            {property.images.slice(1, 4).map((img, i) => (
              <button
                key={img + i}
                onClick={() => setActive(i + 1)}
                className="relative overflow-hidden group"
              >
                <img src={img} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
                <div className={`absolute inset-0 transition-colors ${active === i + 1 ? 'bg-transparent' : 'bg-charcoal-950/20 group-hover:bg-transparent'}`} />
                {i === 2 && property.images.length > 4 && (
                  <div className="absolute inset-0 bg-charcoal-950/60 flex items-center justify-center text-ivory-50 text-sm uppercase tracking-widest">
                    +{property.images.length - 4} more
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 md:py-28">
        <div className="container-px">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="lg:col-span-8"
            >
              <Link to="/listings" className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest text-charcoal-900/50 hover:text-bronze-500 transition-colors mb-8">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.5"/></svg>
                Back to collection
              </Link>

              <div className="eyebrow mb-4">{property.region} · {property.suburb}</div>
              <h1 className="font-display text-4xl md:text-6xl leading-[1.02] tracking-tight mb-6">
                {property.title}
              </h1>

              <div className="flex flex-wrap gap-x-10 gap-y-4 pb-10 border-b border-charcoal-900/10">
                <Stat label="Bedrooms" value={property.beds} />
                <Stat label="Bathrooms" value={property.baths} />
                <Stat label="Car Spaces" value={property.cars} />
                <Stat label="Land" value={property.land} />
                <Stat label="Type" value={property.type} />
              </div>

              <div className="py-10">
                <div className="eyebrow mb-5">Description</div>
                <p className="text-charcoal-900/75 leading-relaxed text-lg font-light max-w-2xl">
                  {property.description}
                </p>
              </div>

              <div className="pt-10 border-t border-charcoal-900/10">
                <div className="eyebrow mb-8">Features & Inclusions</div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
                  {property.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-charcoal-900/80">
                      <span className="w-1.5 h-1.5 bg-bronze-500 rounded-full mt-2.5 flex-shrink-0" />
                      <span className="text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Map placeholder */}
              <div className="mt-20">
                <div className="eyebrow mb-5">Location</div>
                <div className="relative aspect-[16/9] bg-ivory-100 overflow-hidden border border-charcoal-900/10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `
                      linear-gradient(rgba(184, 149, 106, 0.08) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(184, 149, 106, 0.08) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px'
                  }} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="w-16 h-16 rounded-full border-2 border-bronze-500/40 flex items-center justify-center mb-4">
                      <div className="w-3 h-3 rounded-full bg-bronze-500" />
                    </div>
                    <div className="font-display text-2xl text-charcoal-900">{property.suburb}</div>
                    <div className="text-xs uppercase tracking-widest text-charcoal-900/50 mt-1">{property.region}</div>
                    <div className="text-[11px] uppercase tracking-widest text-charcoal-900/40 mt-5">
                      Exact address shared upon enquiry
                    </div>
                  </div>
                </div>
              </div>

              {/* Virtual tour placeholder */}
              <div className="mt-12 p-10 bg-charcoal-900 text-ivory-50 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <div className="eyebrow text-bronze-400 mb-2">Immersive Walkthrough</div>
                  <div className="font-display text-2xl">3D virtual tour available on request</div>
                </div>
                <a href="#enquire" className="btn-light shrink-0">Request Tour</a>
              </div>
            </motion.div>

            {/* Sticky sidebar */}
            <motion.aside
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="lg:col-span-4"
            >
              <div className="sticky top-32 space-y-6">
                {/* Price */}
                <div className="bg-ivory-100 p-8 border border-charcoal-900/10">
                  <div className="eyebrow mb-3">Guide</div>
                  <div className="font-display text-4xl text-charcoal-900">{property.priceLabel}</div>
                  {property.offMarket && (
                    <div className="mt-4 inline-block px-3 py-1 bg-charcoal-900 text-ivory-50 text-[10px] uppercase tracking-widest">
                      Off-Market · Private sale
                    </div>
                  )}
                </div>

                {/* Agent */}
                {agent && (
                  <div className="bg-ivory-50 border border-charcoal-900/10 p-8">
                    <div className="eyebrow mb-5">Represented by</div>
                    <div className="flex items-center gap-4 mb-6">
                      <img src={agent.image} alt={agent.name} className="w-16 h-16 object-cover rounded-full" />
                      <div>
                        <div className="font-display text-xl">{agent.name}</div>
                        <div className="text-[11px] uppercase tracking-widest text-charcoal-900/50 mt-0.5">{agent.title}</div>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <a href={`tel:${agent.phone.replace(/\s/g, '')}`} className="block text-charcoal-900 hover:text-bronze-500 transition-colors">
                        {agent.phone}
                      </a>
                      <a href={`mailto:${agent.email}`} className="block text-charcoal-900/70 hover:text-bronze-500 transition-colors">
                        {agent.email}
                      </a>
                    </div>
                  </div>
                )}

                {/* Enquiry form */}
                <form
                  id="enquire"
                  onSubmit={(e) => {
                    e.preventDefault()
                    alert('Enquiry received. A director will be in touch shortly.')
                  }}
                  className="bg-charcoal-900 text-ivory-50 p-8"
                >
                  <div className="eyebrow text-bronze-400 mb-5">Enquire Privately</div>
                  <div className="space-y-5">
                    <input type="text" placeholder="Full name" required className="w-full bg-transparent border-b border-ivory-50/20 py-3 text-sm placeholder:text-ivory-50/40 focus:outline-none focus:border-bronze-400 transition-colors" />
                    <input type="email" placeholder="Email address" required className="w-full bg-transparent border-b border-ivory-50/20 py-3 text-sm placeholder:text-ivory-50/40 focus:outline-none focus:border-bronze-400 transition-colors" />
                    <input type="tel" placeholder="Phone" className="w-full bg-transparent border-b border-ivory-50/20 py-3 text-sm placeholder:text-ivory-50/40 focus:outline-none focus:border-bronze-400 transition-colors" />
                    <textarea rows="3" placeholder="Your message" className="w-full bg-transparent border-b border-ivory-50/20 py-3 text-sm placeholder:text-ivory-50/40 focus:outline-none focus:border-bronze-400 transition-colors resize-none" />
                  </div>
                  <button type="submit" className="w-full mt-6 bg-bronze-500 hover:bg-bronze-400 text-charcoal-900 py-4 text-xs uppercase tracking-widest transition-colors">
                    Request Private Viewing
                  </button>
                </form>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="py-24 bg-ivory-100">
        <div className="container-px">
          <div className="flex items-end justify-between mb-14">
            <div>
              <div className="eyebrow mb-3">You may also consider</div>
              <h2 className="font-display text-3xl md:text-5xl leading-tight">Other residences</h2>
            </div>
            <Link to="/listings" className="text-[11px] uppercase tracking-widest border-b border-charcoal-900/30 pb-1 hover:border-bronze-500 hover:text-bronze-500 transition-colors">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {related.map((p, i) => (
              <PropertyCard key={p.id} property={p} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function Stat({ label, value }) {
  return (
    <div>
      <div className="font-display text-3xl text-charcoal-900">{value}</div>
      <div className="text-[10px] uppercase tracking-widest text-charcoal-900/50 mt-0.5">{label}</div>
    </div>
  )
}
