import React from 'react'

export default function CTA({ t }) {
  return (
    <section className="relative py-16 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h3 className="text-2xl md:text-3xl font-black text-white">
          {t.ctaHeadline || t.hero.title}
        </h3>
        <p className="mt-3 text-white/70">
          {t.ctaSub || 'Siap memesan atau konsultasi cepat? Tim kami akan membantu menentukan pilihan terbaik.'}
        </p>
        <a
          href={`https://wa.me/6285155417783?text=${encodeURIComponent(t.cta.whatsappMessage)}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center px-6 py-3 mt-6 rounded-xl bg-amber-400 text-slate-900 font-bold shadow-[0_12px_40px_rgba(251,191,36,0.6)] hover:scale-[1.02] active:scale-100 transition-transform"
        >
          {t.cta.primary}
        </a>
      </div>
    </section>
  )
}
