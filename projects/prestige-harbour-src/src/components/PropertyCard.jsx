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
        <div className="relative overflow-hidden bg-ivory-200 aspect-[4/5]">
          <img
            src={property.images[0]}
            alt={property.title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-smooth group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/50 via-transparent to-transparent" />

          {property.offMarket && (
            <div className="absolute top-5 left-5 px-3 py-1.5 bg-charcoal-900 text-ivory-50 text-[10px] uppercase tracking-widest">
              Off-Market
            </div>
          )}

          <div className="absolute top-5 right-5 px-3 py-1.5 bg-ivory-50/90 backdrop-blur text-charcoal-900 text-[10px] uppercase tracking-widest">
            {property.type}
          </div>

          <div className="absolute inset-x-0 bottom-0 p-6 text-ivory-50">
            <div className="text-[10px] uppercase tracking-widest text-bronze-400 mb-1">{property.tagline}</div>
            <div className="font-display text-2xl leading-tight mb-3">{property.title}</div>
            <div className="flex items-center justify-between text-[11px] uppercase tracking-widest">
              <span className="opacity-80">{property.suburb}</span>
              <span>{property.priceLabel}</span>
            </div>
          </div>
        </div>

        <div className="pt-5 flex items-center gap-6 text-[11px] uppercase tracking-widest text-charcoal-900/60">
          <span>{property.beds} Bed</span>
          <span className="w-1 h-1 bg-bronze-500 rounded-full" />
          <span>{property.baths} Bath</span>
          <span className="w-1 h-1 bg-bronze-500 rounded-full" />
          <span>{property.cars} Car</span>
          <span className="w-1 h-1 bg-bronze-500 rounded-full" />
          <span>{property.land}</span>
        </div>
      </Link>
    </motion.div>
  )
}
