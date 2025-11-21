import React from 'react'

export default function Footer({ t }) {
  return (
    <footer id="contact" className="bg-slate-950 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <div className="text-white font-black text-xl">Kayu</div>
          <div className="text-white/70 text-sm">{t.footer.tagline}</div>
        </div>
        <a href={`https://wa.me/6285155417783?text=${encodeURIComponent(t.cta.whatsappMessage)}`} target="_blank" rel="noreferrer"
           className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-amber-400 text-slate-900 font-bold shadow-[0_12px_40px_rgba(251,191,36,0.6)] hover:scale-[1.02] active:scale-100 transition-transform">
          {t.footer.cta}
        </a>
        <div className="text-white/40 text-xs">© {new Date().getFullYear()} Kayu. {t.footer.rights}</div>
      </div>
    </footer>
  )
}
