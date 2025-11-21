import React from 'react'
import { motion } from 'framer-motion'

export default function Products({ t }) {
  const products = t.products.items
  return (
    <section id="products" className="relative py-20 bg-slate-950">
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
              <div className="aspect-video bg-gradient-to-br from-amber-300/40 via-amber-400/30 to-amber-500/40" />
              <div className="p-5">
                <div className="font-bold text-white text-lg">{p.name}</div>
                <div className="text-white/70 text-sm mt-1">{p.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
