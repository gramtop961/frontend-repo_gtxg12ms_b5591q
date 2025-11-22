import React from 'react'
import { motion } from 'framer-motion'
import { Trees, Globe, ShieldCheck, Sparkles } from 'lucide-react'

const items = (t) => [
  { icon: Trees, title: t.features.n1.title, desc: t.features.n1.desc },
  { icon: Globe, title: t.features.n2.title, desc: t.features.n2.desc },
  { icon: ShieldCheck, title: t.features.n3.title, desc: t.features.n3.desc },
  { icon: Sparkles, title: t.features.n4.title, desc: t.features.n4.desc },
]

export default function Features({ t }) {
  return (
    <section id="features" className="relative py-20 bg-slate-900 cv-auto">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.08),transparent_60%)] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-white">{t.features.title}</h2>
          <p className="mt-3 text-white/70">{t.features.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items(t).map((it, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur hover:bg-white/10 transition-colors will-change-transform"
            >
              <it.icon className="w-8 h-8 text-amber-400" />
              <h3 className="mt-4 text-lg font-bold text-white">{it.title}</h3>
              <p className="mt-2 text-white/70 text-sm">{it.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
