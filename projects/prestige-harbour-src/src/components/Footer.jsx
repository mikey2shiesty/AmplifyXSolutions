import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-charcoal-900 text-ivory-50 pt-24 pb-10">
      <div className="container-px">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-ivory-50/10">
          <div className="md:col-span-5">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 border border-ivory-50 flex items-center justify-center">
                <span className="font-display text-xl leading-none -mt-0.5">P</span>
              </div>
              <div>
                <div className="font-display text-2xl tracking-wide">Prestige Harbour</div>
                <div className="text-[10px] uppercase tracking-widest opacity-50">A Fictional Showcase</div>
              </div>
            </Link>
            <p className="text-ivory-50/60 text-sm leading-relaxed max-w-md">
              A portfolio demonstration imagining what Sydney's most considered real estate brand could look like — built to show what AmplifyX Solutions can create for agencies in the premium property space.
            </p>
          </div>

          <div className="md:col-span-2">
            <div className="eyebrow text-bronze-400 mb-5">Navigate</div>
            <ul className="space-y-3 text-sm text-ivory-50/70">
              <li><Link to="/" className="hover:text-bronze-400 transition-colors">Home</Link></li>
              <li><Link to="/listings" className="hover:text-bronze-400 transition-colors">Listings</Link></li>
              <li><Link to="/contact" className="hover:text-bronze-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="eyebrow text-bronze-400 mb-5">In This Demo</div>
            <ul className="space-y-3 text-sm text-ivory-50/70">
              <li>9 Fictional Listings</li>
              <li>3 Invented Agents</li>
              <li>Working Filters</li>
              <li>Zero Real Properties</li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="eyebrow text-bronze-400 mb-5">Want One Like This?</div>
            <div className="text-sm text-ivory-50/70 space-y-3">
              <p>
                This demo was designed and built by AmplifyX Solutions as part of our portfolio.
              </p>
              <a
                href="https://amplifyxsolutions.com.au"
                className="inline-flex items-center gap-2 text-bronze-400 hover:text-bronze-300 transition-colors"
              >
                Visit AmplifyX Solutions
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px] uppercase tracking-widest text-ivory-50/40">
          <div>
            Prestige Harbour is a fictional brand · Designed & built by AmplifyX Solutions · {new Date().getFullYear()}
          </div>
          <div>
            <a href="https://amplifyxsolutions.com.au" className="hover:text-bronze-400 transition-colors">
              amplifyxsolutions.com.au ↗
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
