import React, { useEffect, useMemo, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Image as ImageIcon, Hammer } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Gallery({ t, lang }) {
  const scrollRef = useRef(null)
  const [current, setCurrent] = useState(0)
  const [hovered, setHovered] = useState(false)

  const slides = useMemo(() => {
    const lbl = {
      id: { product: 'Produk', process: 'Proses Pembuatan' },
      en: { product: 'Product', process: 'Making Process' },
      ar: { product: 'المنتج', process: 'عملية التصنيع' },
    }
    const L = lbl[lang] || lbl.en
    return [
      {
        src: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1600&q=60',
        tag: L.product,
        caption: 'Meja makan solid wood',
      },
      {
        src: 'https://images.unsplash.com/photo-1516383607781-913a19294fd1?auto=format&fit=crop&w=1600&q=60',
        tag: L.product,
        caption: 'Kerajinan kayu detail',
      },
      {
        src: 'https://images.unsplash.com/photo-1509718443690-d8e2fb3474b7?auto=format&fit=crop&w=1600&q=60',
        tag: L.process,
        caption: 'Log kayu pilihan',
      },
      {
        src: 'https://images.unsplash.com/photo-1706434232109-340eb724732d?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxMb2clMjBrYXl1JTIwcGlsaWhhbnxlbnwwfDB8fHwxNzYzNzY5MzczfDA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
        tag: L.process,
        caption: 'Workshop pemotongan',
      },
      {
        src: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1600&q=60',
        tag: L.product,
        caption: 'Rak dinding dekoratif',
      },
      {
        src: 'https://images.unsplash.com/photo-1673157082033-365b3c38c964?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxSYWslMjBkaW5kaW5nJTIwZGVrb3JhdGlmfGVufDB8MHx8fDE3NjM3NjkzNzN8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
        tag: L.process,
        caption: 'Finishing & pengamplasan',
      },
    ]
  }, [lang])

  const getItemWidth = () => {
    const el = scrollRef.current
    if (!el || !el.firstChild) return 0
    const firstCard = el.querySelector('[data-card]')
    return firstCard ? firstCard.clientWidth + 20 /* gap */ : el.clientWidth
  }

  const scrollToIndex = (index) => {
    const el = scrollRef.current
    if (!el) return
    const width = getItemWidth()
    el.scrollTo({ left: index * width, behavior: 'smooth' })
  }

  const onNav = (dir) => {
    const next = Math.max(0, Math.min(slides.length - 1, current + dir))
    setCurrent(next)
    scrollToIndex(next)
  }

  // Sync current index with scroll position
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const onScroll = () => {
      const width = getItemWidth()
      if (width > 0) {
        const idx = Math.round(el.scrollLeft / width)
        setCurrent(Math.max(0, Math.min(slides.length - 1, idx)))
      }
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [slides.length])

  // Auto-play slider, pause on hover and respect prefers-reduced-motion or save-data
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const saveData = navigator.connection && navigator.connection.saveData
    if (hovered || reduce || saveData) return

    const id = setInterval(() => {
      setCurrent((prev) => {
        const next = prev + 1 >= slides.length ? 0 : prev + 1
        requestAnimationFrame(() => scrollToIndex(next))
        return next
      })
    }, 4500)

    return () => clearInterval(id)
  }, [hovered, slides.length])

  return (
    <section id="gallery" className="relative py-20 bg-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(251,191,36,0.08),transparent_60%)] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between gap-6 mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">{t.gallery?.title || 'Galeri Produk & Proses'}</h2>
            <p className="mt-2 text-white/70 text-base md:text-lg">{t.gallery?.subtitle || 'Lihat contoh produk dan proses pembuatannya.'}</p>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <button aria-label="Previous" onClick={() => onNav(-1)} className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button aria-label="Next" onClick={() => onNav(1)} className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="overflow-x-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent will-change-scroll"
        >
          <div className="flex gap-5 snap-x snap-mandatory">
            {slides.map((s, idx) => (
              <motion.figure
                key={idx}
                data-card
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="relative min-w-[85%] sm:min-w-[52%] lg:min-w-[34%] snap-start rounded-2xl overflow-hidden border border-white/10 bg-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
              >
                <div className="aspect-[16/10] w-full overflow-hidden">
                  <img
                    src={s.src}
                    alt={s.caption}
                    className="w-full h-full object-cover scale-[1.02] hover:scale-100 transition-transform duration-700 ease-out"
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 640px) 85vw, (max-width: 1024px) 52vw, 34vw"
                    width="1600"
                    height="1000"
                    fetchpriority="low"
                  />
                  {/* gradient overlay bottom */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/0 to-transparent" />
                </div>

                <figcaption className="absolute left-3 top-3 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full bg-amber-400 text-slate-900 shadow">
                    {s.tag === 'Product' || s.tag === 'Produk' || s.tag === 'المنتج' ? <ImageIcon className="w-3.5 h-3.5"/> : <Hammer className="w-3.5 h-3.5"/>}
                    {s.tag}
                  </span>
                </figcaption>

                <div className="absolute left-4 right-4 bottom-4">
                  <div className="backdrop-blur-[2px] inline-flex px-3 py-2 rounded-lg bg-black/30 ring-1 ring-white/10">
                    <div className="text-white text-sm md:text-base font-medium drop-shadow">{s.caption}</div>
                  </div>
                </div>
              </motion.figure>
            ))}
          </div>
        </div>

        {/* Dots indicator */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => { setCurrent(i); scrollToIndex(i) }}
              className={`h-2.5 rounded-full transition-all ${
                current === i ? 'w-6 bg-amber-400' : 'w-2.5 bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Mobile nav */}
        <div className="mt-6 flex sm:hidden items-center justify-center gap-3">
          <button aria-label="Previous" onClick={() => onNav(-1)} className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button aria-label="Next" onClick={() => onNav(1)} className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
