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
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  const transparent = isHome && !scrolled
  const textColor = transparent ? 'text-ivory-50' : 'text-charcoal-900'
  const bg = transparent
    ? 'bg-transparent'
    : 'bg-ivory-50/95 backdrop-blur-md border-b border-charcoal-900/5'

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-smooth ${bg}`}>
      <div className={`container-px flex items-center justify-between h-20 md:h-24 ${textColor}`}>
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 border border-current flex items-center justify-center">
            <span className="font-display text-lg leading-none -mt-0.5">P</span>
          </div>
          <div className="leading-tight">
            <div className="font-display text-lg md:text-xl tracking-wide">Prestige Harbour</div>
            <div className="text-[9px] uppercase tracking-widest opacity-60 -mt-0.5">A Fictional Showcase</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `text-xs uppercase tracking-widest transition-colors duration-300 ${
                  isActive ? 'text-bronze-500' : 'hover:text-bronze-500'
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
            className="group flex items-center gap-2 text-[10px] uppercase tracking-widest opacity-75 hover:opacity-100 transition-opacity"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-bronze-500 animate-pulse" />
            Demo by AmplifyX
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" className="transition-transform group-hover:translate-x-0.5"><path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
          </a>
          <Link
            to="/contact"
            className={`px-5 py-3 text-xs uppercase tracking-widest border transition-all duration-500 ease-smooth ${
              transparent
                ? 'border-ivory-50/40 hover:border-ivory-50 hover:bg-ivory-50 hover:text-charcoal-900'
                : 'border-charcoal-900/20 hover:border-charcoal-900 hover:bg-charcoal-900 hover:text-ivory-50'
            }`}
          >
            Private Viewing
          </Link>
        </div>

        <button
          aria-label="Open menu"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden flex flex-col gap-1.5 p-2"
        >
          <span className={`block w-6 h-px bg-current transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block w-6 h-px bg-current transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-px bg-current transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-ivory-50 border-t border-charcoal-900/10"
          >
            <div className="container-px py-8 flex flex-col gap-6 text-charcoal-900">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className="font-display text-3xl hover:text-bronze-500 transition-colors"
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="border-t border-charcoal-900/10 pt-6 flex flex-col gap-3">
                <div className="text-[10px] uppercase tracking-widest text-bronze-600">A Fictional Showcase</div>
                <a href="https://amplifyxsolutions.com.au" className="text-xs uppercase tracking-widest inline-flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-bronze-500" />
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
