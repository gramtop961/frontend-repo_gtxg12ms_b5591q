import React, { useEffect, useRef, useState, lazy, Suspense } from 'react'
import { motion } from 'framer-motion'

// Lazy load Spline so it doesn't impact initial bundle
const LazySpline = lazy(() => import('@splinetool/react-spline'))

export default function Hero({ t }) {
  const sectionRef = useRef(null)
  const [showSpline, setShowSpline] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const saveData = navigator.connection && navigator.connection.saveData

    if (reduce || saveData) {
      // Respect user preference: skip heavy 3D on reduced motion or data saver
      setShowSpline(false)
      return
    }

    const el = sectionRef.current
    if (!el) return

    let observer
    const onVisible = () => {
      // Defer a bit to allow main thread to settle
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => setShowSpline(true), { timeout: 1500 })
      } else {
        setTimeout(() => setShowSpline(true), 400)
      }
    }

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onVisible()
            observer && observer.disconnect()
          }
        })
      }, { rootMargin: '200px 0px' })
      observer.observe(el)
    } else {
      // Fallback: show after a short delay
      onVisible()
    }

    return () => observer && observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-[90vh] w-full overflow-hidden" id="home">
      <div className="absolute inset-0">
        {showSpline ? (
          <Suspense fallback={<div className="w-full h-full bg-gradient-to-b from-slate-900 via-slate-900 to-slate-900"/>}>
            <LazySpline scene="https://prod.spline.design/atN3lqky4IzF-KEP/scene.splinecode" style={{ width: '100%', height: '100%' }} />
          </Suspense>
        ) : (
          // Lightweight placeholder background until Spline is ready/visible
          <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.08),transparent_50%)]" />
        )}
      </div>

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/50 to-slate-900 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-16 flex flex-col md:flex-row items-center gap-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight drop-shadow-[0_8px_40px_rgba(2,8,23,0.6)]">
            {t.hero.title}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/85">{t.hero.subtitle}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
            <a href={`https://wa.me/6285155417783?text=${encodeURIComponent(t.cta.whatsappMessage)}`} target="_blank" rel="noreferrer"
               className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-amber-400 text-slate-900 font-bold shadow-[0_12px_40px_rgba(251,191,36,0.6)] hover:scale-[1.02] active:scale-100 transition-transform will-change-transform">
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
