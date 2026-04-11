import { useState } from 'react'
import { motion } from 'framer-motion'

const offices = [
  {
    name: 'Double Bay',
    address: 'Level 3, 18 Bay Street\nDouble Bay NSW 2028',
    phone: '+61 2 9328 1000',
    hours: 'Mon–Fri · 9:00 – 18:00\nSat · By appointment',
  },
  {
    name: 'Mosman',
    address: '52 Military Road\nMosman NSW 2088',
    phone: '+61 2 9960 1200',
    hours: 'Mon–Fri · 9:00 – 18:00\nSat · By appointment',
  },
]

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [interest, setInterest] = useState('Buying')

  const onSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-20 bg-charcoal-900 text-ivory-50">
        <div className="container-px">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="max-w-3xl"
          >
            <div className="eyebrow text-bronze-400 mb-5">Start a Private Conversation</div>
            <h1 className="font-display text-5xl md:text-7xl leading-[1.02] tracking-tight">
              Let's speak<br /><span className="italic text-bronze-400">discreetly</span>
            </h1>
            <p className="mt-8 text-ivory-50/70 max-w-xl leading-relaxed">
              Every enquiry is handled personally by a director of Prestige Harbour. Whether you are buying, selling, or simply exploring the market — we would be honoured to assist.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form + offices */}
      <section className="py-20 md:py-28">
        <div className="container-px grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="lg:col-span-7"
          >
            <div className="eyebrow mb-4">Enquiry Form</div>
            <h2 className="font-display text-3xl md:text-5xl leading-tight mb-12">
              Tell us about your <span className="italic">brief</span>
            </h2>

            {sent ? (
              <div className="bg-ivory-100 p-12 border border-bronze-500/30">
                <div className="eyebrow text-bronze-600 mb-4">Thank you</div>
                <div className="font-display text-3xl mb-4">Your enquiry has been received.</div>
                <p className="text-charcoal-900/70 max-w-md">
                  A director will be in touch personally within one business day. For urgent matters please telephone <a href="tel:+61293281000" className="text-bronze-600 underline">+61 2 9328 1000</a>.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-10">
                {/* Interest */}
                <div>
                  <div className="eyebrow mb-4">I am</div>
                  <div className="flex flex-wrap gap-3">
                    {['Buying', 'Selling', 'Off-Market', 'General'].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setInterest(opt)}
                        className={`px-6 py-3 text-[11px] uppercase tracking-widest border transition-all duration-300 ${
                          interest === opt
                            ? 'bg-charcoal-900 text-ivory-50 border-charcoal-900'
                            : 'border-charcoal-900/20 text-charcoal-900 hover:border-charcoal-900'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <Field label="First Name" type="text" required />
                  <Field label="Last Name" type="text" required />
                  <Field label="Email" type="email" required />
                  <Field label="Phone" type="tel" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <Field label="Preferred Area" type="text" placeholder="e.g. Point Piper, Mosman" />
                  <Field label="Budget Range" type="text" placeholder="e.g. $10M – $18M" />
                </div>

                <div>
                  <label className="block">
                    <div className="eyebrow mb-2">Brief</div>
                    <textarea
                      rows="5"
                      placeholder="Tell us what you are looking for…"
                      className="input-clean resize-none"
                    />
                  </label>
                </div>

                <div className="flex items-start gap-3 pt-2">
                  <input type="checkbox" id="privacy" className="mt-1 accent-bronze-500" />
                  <label htmlFor="privacy" className="text-[11px] text-charcoal-900/60 leading-relaxed">
                    I consent to Prestige Harbour contacting me regarding my enquiry. All correspondence is handled in strict confidence.
                  </label>
                </div>

                <button type="submit" className="btn-primary">
                  Submit Enquiry
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5"/></svg>
                </button>
              </form>
            )}
          </motion.div>

          {/* Offices */}
          <motion.aside
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="lg:col-span-5 space-y-10"
          >
            <div className="eyebrow">Visit Our Studios</div>

            {offices.map((office) => (
              <div key={office.name} className="pb-10 border-b border-charcoal-900/10">
                <div className="font-display text-3xl mb-4">{office.name}</div>
                <div className="space-y-4 text-sm text-charcoal-900/75">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-charcoal-900/40 mb-1">Address</div>
                    <div className="whitespace-pre-line">{office.address}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-charcoal-900/40 mb-1">Telephone</div>
                    <a href={`tel:${office.phone.replace(/\s/g, '')}`} className="hover:text-bronze-500 transition-colors">{office.phone}</a>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-charcoal-900/40 mb-1">Hours</div>
                    <div className="whitespace-pre-line">{office.hours}</div>
                  </div>
                </div>
              </div>
            ))}

            <div>
              <div className="eyebrow mb-4">Direct</div>
              <div className="space-y-2 text-sm">
                <a href="mailto:enquiries@prestigeharbour.com.au" className="block hover:text-bronze-500 transition-colors">
                  enquiries@prestigeharbour.com.au
                </a>
                <a href="mailto:offmarket@prestigeharbour.com.au" className="block hover:text-bronze-500 transition-colors">
                  offmarket@prestigeharbour.com.au
                </a>
              </div>
            </div>
          </motion.aside>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="pb-24">
        <div className="container-px">
          <div className="relative aspect-[21/9] bg-ivory-100 border border-charcoal-900/10 overflow-hidden">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(rgba(184, 149, 106, 0.08) 1px, transparent 1px),
                linear-gradient(90deg, rgba(184, 149, 106, 0.08) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px'
            }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-4 h-4 bg-bronze-500 mx-auto mb-4 rotate-45" />
                <div className="font-display text-2xl">Double Bay Studio</div>
                <div className="text-[11px] uppercase tracking-widest text-charcoal-900/50 mt-1">Sydney Harbour</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function Field({ label, type, required, placeholder }) {
  return (
    <label className="block">
      <div className="eyebrow mb-2">{label}{required && ' *'}</div>
      <input type={type} required={required} placeholder={placeholder} className="input-clean" />
    </label>
  )
}
