import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white pt-24 pb-10 border-t border-white/5">
      <div className="container-px">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          <div className="md:col-span-5">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-md bg-teal-500 flex items-center justify-center">
                <span className="font-display text-lg font-bold text-slate-950 leading-none">D</span>
              </div>
              <div>
                <div className="font-display text-2xl font-semibold tracking-wide">District & Co.</div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-white/40">A Fictional Showcase</div>
              </div>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-md">
              A portfolio demonstration imagining what Perth's boldest inner-city property brand could look like — built to show what AmplifyX Solutions can create for urban real estate agencies.
            </p>
          </div>

          <div className="md:col-span-2">
            <div className="eyebrow mb-5">Navigate</div>
            <ul className="space-y-3 text-sm text-white/60">
              <li><Link to="/" className="hover:text-teal-400 transition-colors">Home</Link></li>
              <li><Link to="/listings" className="hover:text-teal-400 transition-colors">Listings</Link></li>
              <li><Link to="/contact" className="hover:text-teal-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="eyebrow mb-5">In This Demo</div>
            <ul className="space-y-3 text-sm text-white/60">
              <li>9 Fictional Listings</li>
              <li>3 Invented Agents</li>
              <li>3D Virtual Tour</li>
              <li>Zero Real Properties</li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="eyebrow mb-5">Want One Like This?</div>
            <div className="text-sm text-white/60 space-y-3">
              <p>This demo was designed and built by AmplifyX Solutions as part of our portfolio.</p>
              <a href="https://amplifyxsolutions.com.au" className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 transition-colors">
                Visit AmplifyX Solutions
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px] uppercase tracking-[0.25em] text-white/30">
          <div>District & Co. is a fictional brand · Designed & built by AmplifyX Solutions · {new Date().getFullYear()}</div>
          <a href="https://amplifyxsolutions.com.au" className="hover:text-teal-400 transition-colors">amplifyxsolutions.com.au ↗</a>
        </div>
      </div>
    </footer>
  )
}
