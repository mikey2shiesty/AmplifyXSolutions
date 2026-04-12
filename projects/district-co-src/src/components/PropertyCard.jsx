import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function PropertyCard({ property, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to={`/property/${property.id}`} className="group block">
        <div className="relative overflow-hidden bg-slate-800 aspect-[4/5]">
          <img
            src={property.images[0]}
            alt={property.title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-smooth group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

          {property.offMarket && (
            <div className="absolute top-5 left-5 px-3 py-1.5 bg-teal-500 text-slate-950 text-[10px] uppercase tracking-[0.2em] font-semibold">
              Off-Market
            </div>
          )}

          {property.virtualTour && (
            <div className="absolute top-5 left-5 px-3 py-1.5 bg-teal-500 text-slate-950 text-[10px] uppercase tracking-[0.2em] font-semibold flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10" stroke="currentColor" strokeWidth="2"/><path d="M2 12h20M12 2c2.5 3 4 7 4 10s-1.5 7-4 10" stroke="currentColor" strokeWidth="2"/></svg>
              360° Tour
            </div>
          )}

          <div className="absolute top-5 right-5 px-3 py-1.5 bg-slate-900/90 backdrop-blur text-white text-[10px] uppercase tracking-[0.2em]">
            {property.type}
          </div>

          <div className="absolute inset-x-0 bottom-0 p-6 text-white">
            <div className="text-[10px] uppercase tracking-[0.25em] text-teal-400 mb-1">{property.tagline}</div>
            <div className="font-display text-2xl font-semibold leading-tight mb-3">{property.title}</div>
            <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em]">
              <span className="text-white/70">{property.suburb}</span>
              <span className="text-teal-400 font-semibold">{property.priceLabel}</span>
            </div>
          </div>
        </div>

        <div className="pt-5 flex items-center gap-6 text-[11px] uppercase tracking-[0.2em] text-white/50">
          <span>{property.beds} Bed</span>
          <span className="w-1 h-1 bg-teal-500 rounded-full" />
          <span>{property.baths} Bath</span>
          <span className="w-1 h-1 bg-teal-500 rounded-full" />
          <span>{property.cars} Car</span>
          <span className="w-1 h-1 bg-teal-500 rounded-full" />
          <span>{property.land}</span>
        </div>
      </Link>
    </motion.div>
  )
}
