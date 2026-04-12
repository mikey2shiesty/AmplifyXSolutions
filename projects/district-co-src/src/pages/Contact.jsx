import { useState } from 'react'
import { motion } from 'framer-motion'

const offices = [
  { name: 'Subiaco Studio', address: '14 Rokeby Road\nSubiaco WA 6008', phone: '+61 8 6114 2200', hours: 'Mon–Fri · 9:00 – 18:00\nSat · By appointment' },
  { name: 'East Perth Studio', address: 'Level 2, 8 Adelaide Terrace\nEast Perth WA 6004', phone: '+61 8 6114 2210', hours: 'Mon–Fri · 9:00 – 18:00\nSat · By appointment' },
]

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [interest, setInterest] = useState('Buying')

  return (
    <>
      <section className="pt-40 pb-20 bg-slate-900">
        <div className="container-px">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="max-w-3xl">
            <div className="eyebrow mb-5">Start a Conversation</div>
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.02] tracking-tight">
              Let's talk<br /><span className="text-teal-400">property</span>
            </h1>
            <p className="mt-8 text-white/60 max-w-xl leading-relaxed">
              Every enquiry is handled personally by one of our team. Whether you're buying, selling or just looking — we'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-px grid grid-cols-1 lg:grid-cols-12 gap-16">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} className="lg:col-span-7">
            <div className="eyebrow mb-4">Enquiry Form</div>
            <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight mb-12">Tell us what you're <span className="text-teal-400">looking for</span></h2>

            {sent ? (
              <div className="bg-slate-800 border border-teal-500/30 p-12">
                <div className="eyebrow mb-4">Thank you</div>
                <div className="font-display text-3xl font-semibold mb-4">Your enquiry has been received.</div>
                <p className="text-white/60 max-w-md">An agent will be in touch within one business day. For urgent matters, call <a href="tel:+61861142200" className="text-teal-400 underline">+61 8 6114 2200</a>.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} className="space-y-10">
                <div>
                  <div className="eyebrow mb-4">I am</div>
                  <div className="flex flex-wrap gap-3">
                    {['Buying', 'Selling', 'Renting', 'General'].map((opt) => (
                      <button key={opt} type="button" onClick={() => setInterest(opt)}
                        className={`px-6 py-3 text-[11px] uppercase tracking-[0.2em] border transition-all duration-300 ${
                          interest === opt ? 'bg-teal-500 text-slate-950 border-teal-500 font-semibold' : 'border-white/20 text-white hover:border-teal-400'
                        }`}>
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
                  <Field label="Preferred Suburb" type="text" placeholder="e.g. Subiaco, East Perth" />
                  <Field label="Budget Range" type="text" placeholder="e.g. $800K – $1.2M" />
                </div>

                <div>
                  <label className="block">
                    <div className="eyebrow mb-2">Brief</div>
                    <textarea rows="5" placeholder="Tell us what you're looking for…" className="input-dark resize-none" />
                  </label>
                </div>

                <button type="submit" className="btn-primary">
                  Submit Enquiry
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5"/></svg>
                </button>
              </form>
            )}
          </motion.div>

          <motion.aside initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.1 }} className="lg:col-span-5 space-y-10">
            <div className="eyebrow">Visit Our Studios</div>
            {offices.map((office) => (
              <div key={office.name} className="pb-10 border-b border-white/10">
                <div className="font-display text-3xl font-semibold mb-4">{office.name}</div>
                <div className="space-y-4 text-sm text-white/60">
                  <div><div className="text-[10px] uppercase tracking-[0.25em] text-white/30 mb-1">Address</div><div className="whitespace-pre-line">{office.address}</div></div>
                  <div><div className="text-[10px] uppercase tracking-[0.25em] text-white/30 mb-1">Telephone</div><a href={`tel:${office.phone.replace(/\s/g, '')}`} className="hover:text-teal-400 transition-colors">{office.phone}</a></div>
                  <div><div className="text-[10px] uppercase tracking-[0.25em] text-white/30 mb-1">Hours</div><div className="whitespace-pre-line">{office.hours}</div></div>
                </div>
              </div>
            ))}
            <div>
              <div className="eyebrow mb-4">Direct</div>
              <div className="space-y-2 text-sm">
                <a href="mailto:hello@districtco.com.au" className="block hover:text-teal-400 transition-colors">hello@districtco.com.au</a>
                <a href="mailto:offmarket@districtco.com.au" className="block hover:text-teal-400 transition-colors">offmarket@districtco.com.au</a>
              </div>
            </div>
          </motion.aside>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-px">
          <div className="relative aspect-[21/9] bg-slate-800 border border-white/10 overflow-hidden">
            <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(45,212,191,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,191,0.06) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-4 h-4 bg-teal-500 mx-auto mb-4 rotate-45" />
                <div className="font-display text-2xl font-semibold">Subiaco Studio</div>
                <div className="text-[11px] uppercase tracking-[0.2em] text-white/40 mt-1">Perth Inner West</div>
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
      <input type={type} required={required} placeholder={placeholder} className="input-dark" />
    </label>
  )
}
