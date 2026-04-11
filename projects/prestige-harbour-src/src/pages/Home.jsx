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
  {
    number: '01',
    title: 'Discreet Representation',
    body: 'A trusted conduit between Sydney\'s most discerning buyers and its most exceptional homes. Confidentiality is the cornerstone of every engagement.',
  },
  {
    number: '02',
    title: 'Off-Market Access',
    body: 'More than a third of our annual transactions are never advertised. Our black book opens doors that most clients never see.',
  },
  {
    number: '03',
    title: 'Harbourside Expertise',
    body: 'Three decades specialising in waterfront, eastern suburbs and lower north shore. The deepest market knowledge money can retain.',
  },
  {
    number: '04',
    title: 'Concierge End-to-End',
    body: 'From private inspection to settlement day, our team quietly coordinates every facet of the journey. You focus on the home — we handle the rest.',
  },
]

// Fictional stats — nothing on this page is real
const stats = [
  { value: '$0', label: 'Real sales' },
  { value: '100%', label: 'Fictional' },
  { value: '9', label: 'Invented listings' },
  { value: '3', label: 'Made-up agents' },
]

// Fictional testimonials — invented for this showcase
const testimonials = [
  {
    quote:
      'If Prestige Harbour were real, this is exactly what the experience would feel like. The kind of site that makes you want to book a private inspection just to meet the agent.',
    name: 'A Fictional Client',
    attrib: 'Imagined purchase · Point Piper',
  },
  {
    quote:
      'Everything on this page is made up — the brand, the listings, the people, the prices. But the craft is very real. This is what a portfolio demo should look like.',
    name: 'The Demo Committee',
    attrib: 'Hypothetical · Mosman',
  },
  {
    quote:
      'A pretend agency, imaginary clients, nine invented listings, and zero actual houses — held together by a design that genuinely makes you want to live here.',
    name: 'Nobody In Particular',
    attrib: 'Fictional · Vaucluse',
  },
]

export default function Home() {
  const featured = properties.filter((p) => p.featured).slice(0, 4)

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2400&q=85"
            alt="Sydney harbour mansion"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal-950/60 via-charcoal-950/20 to-charcoal-950/80" />
        </div>

        <div className="relative container-px pb-16 md:pb-24 pt-40 w-full text-ivory-50">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
          >
            <div className="eyebrow text-bronze-400 mb-6 inline-flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-bronze-400 animate-pulse" />
              A Showcase by AmplifyX Solutions
            </div>
            <h1 className="font-display text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.95] tracking-tight">
              An imagined<br />
              <span className="italic text-bronze-400">Sydney</span> real estate brand
            </h1>
            <p className="mt-8 max-w-xl text-ivory-50/80 text-base md:text-lg leading-relaxed">
              Prestige Harbour is a fictional agency — nine invented listings, three made-up agents, zero real houses. Every pixel was built by AmplifyX Solutions to show what a premium real estate website could feel like.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Link to="/listings" className="btn-light">
                Explore the Collection
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5"/></svg>
              </Link>
              <Link
                to="/contact"
                className="text-xs uppercase tracking-widest text-ivory-50/80 border-b border-ivory-50/30 pb-1 hover:border-bronze-400 hover:text-bronze-400 transition-colors"
              >
                Request Private Viewing
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 right-10 hidden md:flex flex-col items-center gap-3 text-[10px] uppercase tracking-widest text-ivory-50/60">
          <span>Scroll</span>
          <span className="w-px h-16 bg-ivory-50/40" />
        </div>
      </section>

      {/* SEARCH BAR */}
      <section className="relative -mt-16 md:-mt-20 z-20">
        <div className="container-px">
          <SearchBar variant="floating" />
        </div>
      </section>

      {/* FEATURED PROPERTIES */}
      <section className="py-32 md:py-40">
        <div className="container-px">
          <motion.div {...fadeUp} className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16 md:mb-20">
            <div className="max-w-xl">
              <div className="eyebrow mb-4">Current Representation</div>
              <h2 className="font-display text-4xl md:text-6xl leading-[1.05] tracking-tight">
                Featured homes <span className="italic">of the moment</span>
              </h2>
            </div>
            <div className="flex flex-col items-start md:items-end gap-4">
              <p className="text-charcoal-900/60 text-sm max-w-sm">
                A curated glimpse of the collection. Off-market opportunities are shared privately with registered clients only.
              </p>
              <Link to="/listings" className="text-xs uppercase tracking-widest border-b border-charcoal-900/30 pb-1 hover:border-bronze-500 hover:text-bronze-500 transition-colors">
                View full portfolio →
              </Link>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {featured.map((p, i) => (
              <PropertyCard key={p.id} property={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-ivory-100 py-32 md:py-40">
        <div className="container-px">
          <motion.div {...fadeUp} className="max-w-2xl mb-20">
            <div className="eyebrow mb-4">The Prestige Harbour Standard</div>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.05] tracking-tight">
              A service designed around<br /><span className="italic">discretion and access</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-charcoal-900/10">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
                className="bg-ivory-100 p-10 md:p-12 group cursor-default"
              >
                <div className="flex items-start justify-between mb-8">
                  <span className="font-display text-bronze-500 text-2xl">{v.number}</span>
                  <span className="w-10 h-px bg-bronze-500 mt-3 group-hover:w-16 transition-all duration-500" />
                </div>
                <h3 className="font-display text-2xl md:text-[1.75rem] leading-tight mb-4">{v.title}</h3>
                <p className="text-charcoal-900/60 text-sm leading-relaxed">{v.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT / BRAND */}
      <section className="py-32 md:py-40">
        <div className="container-px grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1 }}
            className="lg:col-span-6 order-2 lg:order-1"
          >
            <div className="eyebrow mb-5">About This Showcase</div>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.05] tracking-tight mb-8">
              A fictional brand,<br /><span className="italic">real craft</span>
            </h2>
            <p className="text-charcoal-900/70 leading-relaxed mb-5 max-w-xl">
              Prestige Harbour is not a real agency. It's a portfolio demonstration imagining what Sydney's most considered real estate brand could look like — the kind of home, the kind of service, the kind of quiet confidence we think great architecture deserves.
            </p>
            <p className="text-charcoal-900/70 leading-relaxed mb-10 max-w-xl">
              Every listing, agent, testimonial and statistic on this site was invented. But the typography, spacing, interactions and design system are very real — and so is the team behind them. This is the level of work <a href="https://amplifyxsolutions.com.au" className="underline decoration-bronze-500 underline-offset-4 hover:text-bronze-600 transition-colors">AmplifyX Solutions</a> builds for real estate businesses every day.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-charcoal-900/10">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-3xl md:text-4xl text-bronze-600">{s.value}</div>
                  <div className="text-[10px] uppercase tracking-widest text-charcoal-900/50 mt-1">{s.label}</div>
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
              src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85"
              alt="Prestige Harbour interior"
              className="w-full aspect-[4/5] object-cover"
            />
            <div className="absolute -bottom-10 -left-10 hidden md:block bg-charcoal-900 text-ivory-50 p-10 max-w-xs">
              <div className="eyebrow text-bronze-400 mb-3">Designer's Note</div>
              <p className="text-sm leading-relaxed text-ivory-50/80">
                "Every detail — the typography, the spacing, the way each image breathes — was chosen to feel like the kind of home Prestige Harbour is pretending to sell."
              </p>
              <div className="mt-5 text-[11px] uppercase tracking-widest text-ivory-50/50">— AmplifyX Solutions</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-charcoal-900 text-ivory-50 py-32 md:py-40">
        <div className="container-px">
          <motion.div {...fadeUp} className="max-w-2xl mb-20">
            <div className="eyebrow text-bronze-400 mb-4">Fictional Testimonials</div>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.05] tracking-tight">
              Completely made up,<br /><span className="italic text-bronze-400">still kind of believable</span>
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
                className="border-t border-ivory-50/15 pt-10"
              >
                <svg width="32" height="24" viewBox="0 0 32 24" fill="none" className="text-bronze-400 mb-6">
                  <path d="M0 24V14.4C0 10.56 0.853333 7.2 2.56 4.32C4.26667 1.44 6.82667 -0.266667 10.24 -0.8L12 3.2C10.1333 3.73333 8.69333 4.69333 7.68 6.08C6.66667 7.46667 6.18667 8.96 6.24 10.56H12V24H0ZM20 24V14.4C20 10.56 20.8533 7.2 22.56 4.32C24.2667 1.44 26.8267 -0.266667 30.24 -0.8L32 3.2C30.1333 3.73333 28.6933 4.69333 27.68 6.08C26.6667 7.46667 26.1867 8.96 26.24 10.56H32V24H20Z" fill="currentColor" />
                </svg>
                <p className="font-display text-xl md:text-2xl leading-snug mb-8 text-ivory-50/90">
                  {t.quote}
                </p>
                <div className="text-xs uppercase tracking-widest text-bronze-400">{t.name}</div>
                <div className="text-xs text-ivory-50/50 mt-1">{t.attrib}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 md:py-40 bg-ivory-100">
        <div className="container-px">
          <motion.div
            {...fadeUp}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="eyebrow mb-5">Like What You See?</div>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.05] tracking-tight mb-8">
              Your agency could<br /><span className="italic">have a site like this</span>
            </h2>
            <p className="text-charcoal-900/60 max-w-2xl mx-auto mb-12 leading-relaxed">
              Prestige Harbour is a showcase built by AmplifyX Solutions — a Sydney-based studio designing and developing premium websites for real estate agencies, developers and property brands across Australia.
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
