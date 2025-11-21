import React from 'react'
import { motion } from 'framer-motion'

export default function Products({ t }) {
  const products = t.products.items
  const images = [
    'https://images.unsplash.com/photo-1523419409543-a2f07a5160e8?auto=format&fit=crop&w=1600&q=60', // furniture/workbench
    'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1600&q=60', // decor rack
    'https://images.unsplash.com/photo-1516383607781-913a19294fd1?auto=format&fit=crop&w=1600&q=60', // crafts detail
  ]

  return (
    <section id="products" className="relative py-20 bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(251,191,36,0.06),transparent_60%)] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-white">{t.products.title}</h2>
          <p className="mt-3 text-white/70">{t.products.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-2xl overflow-hidden bg-white/5 border border-white/10">
              <div className="relative aspect-video">
                <img src={images[i % images.length]} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
              </div>
              <div className="p-5">
                <div className="font-bold text-white text-lg">{p.name}</div>
                <div className="text-white/70 text-sm mt-1">{p.desc}</div>
                <div className="mt-4 flex items-center gap-3">
                  <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-300/30">Premium</span>
                  <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-400/15 text-emerald-300 border border-emerald-300/30">Eco</span>
                </div>
                <a
                  href={`https://wa.me/6285155417783?text=${encodeURIComponent(t.cta.whatsappMessage)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center justify-center px-4 py-2 rounded-lg bg-amber-400 text-slate-900 font-bold shadow-[0_10px_30px_rgba(251,191,36,0.45)] hover:scale-[1.02] active:scale-100 transition-transform"
                >
                  {t.cta.primary}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
