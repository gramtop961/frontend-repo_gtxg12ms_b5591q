import React from 'react'
import { Globe2 } from 'lucide-react'

const LANGS = [
  { code: 'id', label: 'Indonesia' },
  { code: 'en', label: 'English' },
  { code: 'ar', label: 'العربية' },
]

export default function Navbar({ lang, setLang, t, dir }) {
  return (
    <header className="relative z-20 w-full">
      <nav className={`max-w-7xl mx-auto flex items-center justify-between px-6 py-4`}
        aria-label="Top">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-400 shadow-[0_10px_30px_rgba(251,191,36,0.5)] flex items-center justify-center">
            <span className="text-slate-900 font-extrabold text-lg">K</span>
          </div>
          <div className="leading-tight">
            <div className="font-black text-white text-lg tracking-tight">Kayu</div>
            <div className="text-xs text-white/70">{t.brandTagline}</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-6 text-white/80">
            <a href="#features" className="hover:text-white transition-colors">{t.nav.features}</a>
            <a href="#products" className="hover:text-white transition-colors">{t.nav.products}</a>
            <a href="#contact" className="hover:text-white transition-colors">{t.nav.contact}</a>
          </div>

          <div className="h-6 w-px bg-white/20 mx-3 hidden md:block" />

          <div className="relative">
            <button className="flex items-center gap-2 text-white/90 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full px-3 py-1.5 transition-colors">
              <Globe2 className="w-4 h-4" />
              <span className="text-sm">{LANGS.find(l=>l.code===lang)?.label}</span>
            </button>
            {/* Language menu */}
            <div className="absolute right-0 mt-2 min-w-[160px] bg-slate-900/90 backdrop-blur border border-white/10 rounded-xl shadow-xl p-2 hidden group">
            </div>
          </div>

          <div className="ml-2 flex items-center gap-1">
            {LANGS.map(l => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`px-3 py-1.5 rounded-full text-sm transition-all ${lang===l.code ? 'bg-amber-400 text-slate-900 shadow-[0_10px_30px_rgba(251,191,36,0.6)]' : 'bg-white/10 text-white/80 hover:bg-white/20'}`}
                aria-pressed={lang===l.code}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}
