import React, { useMemo, useRef } from 'react'
import { ChevronLeft, ChevronRight, Image as ImageIcon, Hammer } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Gallery({ t, lang }) {
  const scrollRef = useRef(null)

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

  const onNav = (dir) => {
    const el = scrollRef.current
    if (!el) return
    const step = el.clientWidth * 0.9
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  return (
    <section id="gallery" className="relative py-20 bg-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(251,191,36,0.08),transparent_60%)] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between gap-6 mb-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-white">{t.gallery?.title || 'Galeri Produk & Proses'}</h2>
            <p className="mt-2 text-white/70">{t.gallery?.subtitle || 'Lihat contoh produk dan proses pembuatannya.'}</p>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <button onClick={() => onNav(-1)} className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={() => onNav(1)} className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div ref={scrollRef} className="overflow-x-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
          <div className="flex gap-5 snap-x snap-mandatory">
            {slides.map((s, idx) => (
              <motion.figure
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="relative min-w-[85%] sm:min-w-[48%] lg:min-w-[32%] snap-start rounded-2xl overflow-hidden border border-white/10 bg-white/5"
              >
                <div className="aspect-[16/10] w-full overflow-hidden">
                  <img src={s.src} alt={s.caption} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <figcaption className="absolute left-3 top-3 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full bg-amber-400 text-slate-900 shadow">
                    {s.tag === 'Product' || s.tag === 'Produk' || s.tag === 'المنتج' ? <ImageIcon className="w-3.5 h-3.5"/> : <Hammer className="w-3.5 h-3.5"/>}
                    {s.tag}
                  </span>
                </figcaption>
                <div className="p-4">
                  <div className="text-white text-sm/6 opacity-90">{s.caption}</div>
                </div>
              </motion.figure>
            ))}
          </div>
        </div>

        <div className="mt-6 flex sm:hidden items-center justify-center gap-3">
          <button onClick={() => onNav(-1)} className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={() => onNav(1)} className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
