import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { properties } from '../data/properties.js'
import PropertyCard from '../components/PropertyCard.jsx'
import SearchBar from '../components/SearchBar.jsx'

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
}

const values = [
  { number: '01', title: 'Urban Specialists', body: 'We live and breathe Perth\'s inner city. Every street, every precinct, every building — we know them because we\'re locals, not just agents.' },
  { number: '02', title: 'Off-Plan Access', body: 'First-mover access to developments before they hit the portals. Our developer relationships unlock stock that most buyers never see.' },
  { number: '03', title: 'Design-Led', body: 'We only represent properties with genuine design merit. No cookie-cutter apartments, no spec-builder townhouses. Quality architecture only.' },
  { number: '04', title: 'End-to-End', body: 'From inspection to settlement, our team manages every detail. Styling, finance intros, building inspections, strata searches — all coordinated.' },
]

// Fictional stats
const stats = [
  { value: '$0', label: 'Real sales' },
  { value: '100%', label: 'Fictional' },
  { value: '9', label: 'Invented listings' },
  { value: '1', label: '3D tour built' },
]

// Fictional testimonials
const testimonials = [
  {
    quote: 'If District & Co. were real, you\'d find us queueing outside their Subiaco office every Saturday morning. This is what inner-city property marketing should feel like.',
    name: 'A Fictional Buyer',
    attrib: 'Imagined purchase · Subiaco',
  },
  {
    quote: 'None of these apartments exist. None of these agents are real. But the design is so convincing you\'ll Google "District Co Perth" to make sure.',
    name: 'The Demo Committee',
    attrib: 'Hypothetical · Leederville',
  },
  {
    quote: 'Built entirely as a portfolio showcase by AmplifyX Solutions. The 3D virtual tour alone would convince any agency owner to pick up the phone.',
    name: 'Nobody In Particular',
    attrib: 'Fictional · East Perth',
  },
]

const tourProperty = properties.find((p) => p.virtualTour)

export default function Home() {
  const featured = properties.filter((p) => p.featured).slice(0, 4)

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=2400&q=85"
            alt="Perth city skyline at dusk"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/30 to-slate-950/90" />
        </div>

        <div className="relative container-px pb-16 md:pb-24 pt-40 w-full text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
          >
            <div className="eyebrow mb-6 inline-flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
              A Showcase by AmplifyX Solutions
            </div>
            <h1 className="font-display text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[0.95] tracking-tight">
              An imagined<br />
              <span className="text-teal-400">Perth</span> urban brand
            </h1>
            <p className="mt-8 max-w-xl text-white/70 text-base md:text-lg leading-relaxed">
              District & Co. is a fictional agency — nine invented listings, three made-up agents, one 3D virtual tour, zero real apartments. Every pixel was built by AmplifyX Solutions to show what a modern urban property website could feel like.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Link to="/listings" className="btn-primary">
                Explore Listings
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5"/></svg>
              </Link>
              <Link to="/contact" className="text-xs uppercase tracking-[0.2em] text-white/60 border-b border-white/30 pb-1 hover:border-teal-400 hover:text-teal-400 transition-colors">
                Book Inspection
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 right-10 hidden md:flex flex-col items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-white/40">
          <span>Scroll</span>
          <span className="w-px h-16 bg-white/30" />
        </div>
      </section>

      {/* SEARCH */}
      <section className="relative -mt-16 md:-mt-20 z-20">
        <div className="container-px">
          <SearchBar />
        </div>
      </section>

      {/* FEATURED */}
      <section className="py-32 md:py-40">
        <div className="container-px">
          <motion.div {...fadeUp} className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16 md:mb-20">
            <div className="max-w-xl">
              <div className="eyebrow mb-4">Current Listings</div>
              <h2 className="font-display text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight">
                Properties <span className="text-teal-400">of the moment</span>
              </h2>
            </div>
            <Link to="/listings" className="text-xs uppercase tracking-[0.2em] border-b border-white/30 pb-1 hover:border-teal-400 hover:text-teal-400 transition-colors">
              View all listings →
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {featured.map((p, i) => (
              <PropertyCard key={p.id} property={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* VIRTUAL TOUR SPOTLIGHT */}
      {tourProperty && (
        <section className="bg-slate-900 py-20 md:py-28">
          <div className="container-px">
            <motion.div {...fadeUp}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden border border-white/10">
                <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden">
                  <img
                    src={tourProperty.images[0]}
                    alt={tourProperty.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-900/40" />
                  <div className="absolute top-5 left-5 px-3 py-1.5 bg-teal-500 text-slate-950 text-[10px] uppercase tracking-[0.2em] font-semibold flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M2 12h20M12 2c2.5 3 4 7 4 10s-1.5 7-4 10" stroke="currentColor" strokeWidth="2"/></svg>
                    360° Tour Available
                  </div>
                </div>
                <div className="p-10 md:p-14 flex flex-col justify-center bg-slate-900">
                  <div className="eyebrow mb-4">Virtual Tour Spotlight</div>
                  <h3 className="font-display text-3xl md:text-4xl font-bold leading-tight mb-4">{tourProperty.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-4">
                    {tourProperty.suburb} · {tourProperty.priceLabel} · {tourProperty.beds} bed · {tourProperty.baths} bath
                  </p>
                  <p className="text-white/50 text-sm leading-relaxed mb-8">
                    Explore this warehouse conversion with our immersive 3D virtual tour. Navigate room-by-room, view the floor plan, and experience the space from your browser.
                  </p>
                  <Link to={`/property/${tourProperty.id}`} className="btn-primary self-start">
                    Explore in 3D
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5"/></svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* WHY CHOOSE US */}
      <section className="py-32 md:py-40">
        <div className="container-px">
          <motion.div {...fadeUp} className="max-w-2xl mb-20">
            <div className="eyebrow mb-4">The District Standard</div>
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight">
              Built for buyers who<br /><span className="text-teal-400">know what they want</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
                className="bg-slate-950 p-10 md:p-12 group cursor-default"
              >
                <div className="flex items-start justify-between mb-8">
                  <span className="font-display text-teal-400 text-2xl font-bold">{v.number}</span>
                  <span className="w-10 h-px bg-teal-500 mt-3 group-hover:w-16 transition-all duration-500" />
                </div>
                <h3 className="font-display text-2xl md:text-[1.75rem] font-semibold leading-tight mb-4">{v.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{v.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-32 md:py-40 bg-slate-900">
        <div className="container-px grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1 }}
            className="lg:col-span-6 order-2 lg:order-1"
          >
            <div className="eyebrow mb-5">About This Showcase</div>
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight mb-8">
              A fictional brand,<br /><span className="text-teal-400">real craft</span>
            </h2>
            <p className="text-white/60 leading-relaxed mb-5 max-w-xl">
              District & Co. is not a real agency. It's a portfolio demonstration imagining what Perth's boldest inner-city property brand could look like — designed and built from scratch by <a href="https://amplifyxsolutions.com.au" className="underline decoration-teal-500 underline-offset-4 hover:text-teal-400 transition-colors">AmplifyX Solutions</a>.
            </p>
            <p className="text-white/60 leading-relaxed mb-10 max-w-xl">
              Every listing, agent, testimonial and statistic on this site was invented. The virtual tour is built with real code but fake rooms. The design system is production-quality — dark, bold, contemporary — and ready to be adapted for any urban agency.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-white/10">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-3xl md:text-4xl font-bold text-teal-400">{s.value}</div>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-white/40 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1 }}
            className="lg:col-span-6 order-1 lg:order-2 relative"
          >
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85"
              alt="Modern apartment interior"
              className="w-full aspect-[4/5] object-cover"
            />
            <div className="absolute -bottom-10 -left-10 hidden md:block bg-teal-500 text-slate-950 p-10 max-w-xs">
              <div className="text-[10px] uppercase tracking-[0.25em] font-semibold mb-3">Designer's Note</div>
              <p className="text-sm leading-relaxed">
                "Dark theme. Teal accents. Geometric type. The opposite of Prestige Harbour — and that's the whole point. One portfolio, two completely different design directions."
              </p>
              <div className="mt-5 text-[11px] uppercase tracking-[0.2em] opacity-70">— AmplifyX Solutions</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-32 md:py-40">
        <div className="container-px">
          <motion.div {...fadeUp} className="max-w-2xl mb-20">
            <div className="eyebrow mb-4">Fictional Testimonials</div>
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight">
              Completely made up,<br /><span className="text-teal-400">still kind of believable</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="border-t border-white/10 pt-10"
              >
                <svg width="32" height="24" viewBox="0 0 32 24" fill="none" className="text-teal-400 mb-6">
                  <path d="M0 24V14.4C0 10.56.853 7.2 2.56 4.32 4.267 1.44 6.827-.267 10.24-.8L12 3.2c-1.867.533-3.307 1.493-4.32 2.88C6.667 7.467 6.187 8.96 6.24 10.56H12V24H0ZM20 24V14.4c0-3.84.853-7.2 2.56-10.08C24.267 1.44 26.827-.267 30.24-.8L32 3.2c-1.867.533-3.307 1.493-4.32 2.88C26.667 7.467 26.187 8.96 26.24 10.56H32V24H20Z" fill="currentColor" />
                </svg>
                <p className="font-display text-xl md:text-2xl font-medium leading-snug mb-8 text-white/80">{t.quote}</p>
                <div className="text-xs uppercase tracking-[0.2em] text-teal-400">{t.name}</div>
                <div className="text-xs text-white/40 mt-1">{t.attrib}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 md:py-40 bg-slate-900">
        <div className="container-px">
          <motion.div {...fadeUp} className="max-w-4xl mx-auto text-center">
            <div className="eyebrow mb-5">Like What You See?</div>
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight mb-8">
              Your agency could<br /><span className="text-teal-400">have a site like this</span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto mb-12 leading-relaxed">
              District & Co. is a showcase built by AmplifyX Solutions — a Perth-based studio designing and developing premium websites for real estate agencies, developers and property brands across Australia.
            </p>
            <a href="https://amplifyxsolutions.com.au" className="btn-primary">
              Visit AmplifyX Solutions
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5"/></svg>
            </a>
          </motion.div>
        </div>
      </section>
    </>
  )
}
