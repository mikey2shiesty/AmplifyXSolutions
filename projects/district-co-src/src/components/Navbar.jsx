import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { to: '/', label: 'Home' },
  { to: '/listings', label: 'Listings' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location.pathname])

  const bg = scrolled
    ? 'bg-slate-900/95 backdrop-blur-md border-b border-white/5'
    : 'bg-transparent'

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-smooth ${bg}`}>
      <div className="container-px flex items-center justify-between h-20 md:h-24 text-white">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-teal-500 flex items-center justify-center">
            <span className="font-display text-sm font-bold text-slate-950 leading-none">D</span>
          </div>
          <div className="leading-tight">
            <div className="font-display text-lg md:text-xl font-semibold tracking-wide">District & Co.</div>
            <div className="text-[9px] uppercase tracking-[0.25em] text-white/50 -mt-0.5">A Fictional Showcase</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `text-xs uppercase tracking-[0.2em] transition-colors duration-300 ${
                  isActive ? 'text-teal-400' : 'text-white/70 hover:text-teal-400'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-6">
          <a
            href="https://amplifyxsolutions.com.au"
            className="group flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/50 hover:text-teal-400 transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            Demo by AmplifyX
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" className="transition-transform group-hover:translate-x-0.5"><path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
          </a>
          <Link to="/contact" className="px-5 py-3 text-xs uppercase tracking-[0.2em] border border-white/20 hover:border-teal-400 hover:text-teal-400 transition-all duration-500 ease-smooth">
            Book Inspection
          </Link>
        </div>

        <button aria-label="Open menu" onClick={() => setOpen((v) => !v)} className="lg:hidden flex flex-col gap-1.5 p-2">
          <span className={`block w-6 h-px bg-white transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block w-6 h-px bg-white transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-px bg-white transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-slate-900 border-t border-white/10"
          >
            <div className="container-px py-8 flex flex-col gap-6">
              {links.map((link) => (
                <NavLink key={link.to} to={link.to} end={link.to === '/'} className="font-display text-3xl text-white hover:text-teal-400 transition-colors">
                  {link.label}
                </NavLink>
              ))}
              <div className="border-t border-white/10 pt-6">
                <a href="https://amplifyxsolutions.com.au" className="text-xs uppercase tracking-[0.2em] text-teal-400 inline-flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                  Built by AmplifyX Solutions →
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
