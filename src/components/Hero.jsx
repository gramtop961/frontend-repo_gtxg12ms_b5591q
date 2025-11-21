import React from 'react'
import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'

export default function Hero({ t }) {
  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden" id="home">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/atN3lqky4IzF-KEP/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/50 to-slate-900 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-16 flex flex-col md:flex-row items-center gap-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight drop-shadow-[0_8px_40px_rgba(2,8,23,0.6)]">
            {t.hero.title}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/85">{t.hero.subtitle}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
            <a href={`https://wa.me/6285155417783?text=${encodeURIComponent(t.cta.whatsappMessage)}`} target="_blank" rel="noreferrer"
               className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-amber-400 text-slate-900 font-bold shadow-[0_12px_40px_rgba(251,191,36,0.6)] hover:scale-[1.02] active:scale-100 transition-transform">
              {t.cta.primary}
            </a>
            <a href="#features" className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white/10 text-white font-semibold border border-white/20 hover:bg-white/20 transition-colors">
              {t.cta.secondary}
            </a>
          </div>
          <div className="mt-6 text-xs text-white/70">{t.hero.note}</div>
        </motion.div>
      </div>
    </section>
  )
}
