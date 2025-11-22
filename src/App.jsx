import React, { useMemo, useState, useEffect, lazy, Suspense } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Products from './components/Products'
const Gallery = lazy(() => import('./components/Gallery'))
import CTA from './components/CTA'
import Footer from './components/Footer'

const TRANSLATIONS = {
  id: {
    brandTagline: 'Produk kayu berkualitas untuk dunia',
    nav: { features: 'Keunggulan', products: 'Produk', contact: 'Kontak' },
    hero: {
      title: 'Kayu Berkualitas, Sentuhan Kartunis yang Menarik',
      subtitle: 'Promosi untuk pasar lokal dan internasional dengan gaya ceria dan interaktif.',
      note: 'Tema kartunis • Interaktif • Ramah semua umur',
    },
    cta: {
      primary: 'Pesan via WhatsApp',
      secondary: 'Lihat Keunggulan',
      whatsappMessage: 'Halo Kayu! Saya ingin memesan atau menanyakan produk kayu Anda.',
    },
    features: {
      title: 'Kenapa Memilih Kami',
      subtitle: 'Kualitas tinggi, ramah lingkungan, dan layanan mendunia.',
      n1: { title: 'Bahan Terbaik', desc: 'Kayu pilihan yang kuat, tahan lama, dan elegan.' },
      n2: { title: 'Jangkauan Global', desc: 'Lokal hingga internasional dengan dukungan multi-bahasa.' },
      n3: { title: 'Aman & Terpercaya', desc: 'Standar kualitas dan pengiriman yang terjamin.' },
      n4: { title: 'Desain Kreatif', desc: 'Sentuhan kartunis yang memikat anak-anak hingga dewasa.' },
    },
    products: {
      title: 'Produk Unggulan',
      subtitle: 'Contoh kategori produk kayu kami',
      items: [
        { name: 'Furniture Kayu', desc: 'Meja, kursi, lemari dengan finishing premium.' },
        { name: 'Dekorasi', desc: 'Hiasan dinding, rak unik, dan aksesoris aesthetic.' },
        { name: 'Kerajinan', desc: 'Souvenir custom bergaya kartun yang lucu.' },
      ],
    },
    gallery: {
      title: 'Galeri Produk & Proses',
      subtitle: 'Lihat contoh produk dan proses pembuatannya.',
    },
    footer: {
      tagline: 'Memberi nilai pada setiap serat kayu.',
      cta: 'Chat WhatsApp Sekarang',
      rights: 'Semua hak dilindungi.',
    },
  },
  en: {
    brandTagline: 'Quality wood products for the world',
    nav: { features: 'Features', products: 'Products', contact: 'Contact' },
    hero: {
      title: 'Premium Wood, Fun Cartoon Aesthetics',
      subtitle: 'Promoting to local and international audiences with playful, interactive style.',
      note: 'Cartoon theme • Interactive • For all ages',
    },
    cta: {
      primary: 'Order on WhatsApp',
      secondary: 'See Features',
      whatsappMessage: 'Hello Kayu! I would like to order or ask about your wood products.',
    },
    features: {
      title: 'Why Choose Us',
      subtitle: 'High quality, eco-friendly, and worldwide service.',
      n1: { title: 'Best Materials', desc: 'Selected wood that is strong, durable, and elegant.' },
      n2: { title: 'Global Reach', desc: 'From local to international with multi-language support.' },
      n3: { title: 'Safe & Reliable', desc: 'Guaranteed quality standards and shipping.' },
      n4: { title: 'Creative Design', desc: 'Cartoon touch that engages kids and adults alike.' },
    },
    products: {
      title: 'Featured Products',
      subtitle: 'Sample categories of our wood products',
      items: [
        { name: 'Wood Furniture', desc: 'Tables, chairs, wardrobes with premium finishing.' },
        { name: 'Decor', desc: 'Wall art, unique shelves, and aesthetic accessories.' },
        { name: 'Crafts', desc: 'Custom souvenirs with cute cartoon flair.' },
      ],
    },
    gallery: {
      title: 'Gallery: Products & Making',
      subtitle: 'See real products and how they are made.',
    },
    footer: {
      tagline: 'Adding value to every fiber of wood.',
      cta: 'Chat on WhatsApp Now',
      rights: 'All rights reserved.',
    },
  },
  ar: {
    brandTagline: 'منتجات خشبية عالية الجودة للعالم',
    nav: { features: 'المميزات', products: 'المنتجات', contact: 'تواصل' },
    hero: {
      title: 'خشب فاخر بطابع كرتوني ممتع',
      subtitle: 'ترويج للسوق المحلي والدولي بأسلوب مرِح وتفاعلي.',
      note: 'طابع كرتوني • تفاعلي • مناسب لكل الأعمار',
    },
    cta: {
      primary: 'اطلب عبر واتساب',
      secondary: 'استعراض المميزات',
      whatsappMessage: 'مرحبًا كايو! أود الطلب أو الاستفسار عن منتجاتكم الخشبية.',
    },
    features: {
      title: 'لماذا نحن',
      subtitle: 'جودة عالية، صديقة للبيئة، وخدمة عالمية.',
      n1: { title: 'أفضل الخامات', desc: 'خشب مختار قوي ومتين وأنيق.' },
      n2: { title: 'وصول عالمي', desc: 'من المحلي إلى الدولي مع دعم متعدد اللغات.' },
      n3: { title: 'أمان وموثوقية', desc: 'معايير جودة وشحن مضمون.' },
      n4: { title: 'تصميم مبتكر', desc: 'لمسة كرتونية تجذب الصغار والكبار.' },
    },
    products: {
      title: 'منتجات مميزة',
      subtitle: 'عينات من فئات منتجاتنا الخشبية',
      items: [
        { name: 'أثاث خشبي', desc: 'طاولات، كراسي، وخزائن بتشطيب فاخر.' },
        { name: 'ديكور', desc: 'لوحات جدارية ورفوف فريدة وإكسسوارات جمالية.' },
        { name: 'حِرَف يدوية', desc: 'هدايا تذكارية مخصصة بطابع كرتوني لطيف.' },
      ],
    },
    gallery: {
      title: 'المعرض: المنتجات والعملية',
      subtitle: 'شاهد المنتجات وكيفية تصنيعها.',
    },
    footer: {
      tagline: 'نضيف قيمة لكل ألياف الخشب.',
      cta: 'تحدث عبر واتساب الآن',
      rights: 'جميع الحقوق محفوظة.',
    },
  },
}

export default function App() {
  const [lang, setLang] = useState('id')
  const t = useMemo(() => TRANSLATIONS[lang], [lang])

  useEffect(() => {
    if (lang === 'ar') {
      document.documentElement.dir = 'rtl'
    } else {
      document.documentElement.dir = 'ltr'
    }
  }, [lang])

  // Ultra-smooth scroll for in-page anchors with easing and navbar offset
  useEffect(() => {
    const links = Array.from(document.querySelectorAll('a[href^="#"]'))

    const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

    const smoothScrollTo = (targetY, duration = 800) => {
      const startY = window.scrollY || window.pageYOffset
      const diff = targetY - startY
      if (diff === 0) return
      const start = performance.now()

      const step = (now) => {
        const elapsed = now - start
        const progress = Math.min(elapsed / duration, 1)
        const eased = easeInOutCubic(progress)
        window.scrollTo(0, startY + diff * eased)
        if (progress < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }

    const onClick = (e) => {
      const href = e.currentTarget.getAttribute('href')
      if (!href || href === '#' || !href.startsWith('#')) return
      const id = href.slice(1)
      const target = document.getElementById(id)
      if (!target) return
      e.preventDefault()
      const navbarOffset = 88
      const rect = target.getBoundingClientRect()
      const absoluteY = rect.top + window.pageYOffset - navbarOffset
      smoothScrollTo(absoluteY, 850)
    }

    links.forEach((a) => a.addEventListener('click', onClick))
    return () => links.forEach((a) => a.removeEventListener('click', onClick))
  }, [])

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(251,191,36,0.06),transparent_40%),radial-gradient(circle_at_90%_20%,rgba(56,189,248,0.06),transparent_45%),radial-gradient(circle_at_30%_80%,rgba(186,230,253,0.06),transparent_40%)]" />

      <Navbar lang={lang} setLang={setLang} t={t} />

      {/* Language transition wrapper: crossfade + slight slide */}
      <AnimatePresence mode="wait">
        <motion.main
          key={lang}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <Hero t={t} />
          <Features t={t} />
          <Products t={t} />
          <Suspense fallback={<section className="py-20 bg-slate-900"><div className="max-w-7xl mx-auto px-6"><div className="h-48 rounded-2xl bg-white/5 border border-white/10 animate-pulse"/></div></section>}>
            <Gallery t={t} lang={lang} />
          </Suspense>
          <CTA t={t} />
          <Footer t={t} />
        </motion.main>
      </AnimatePresence>
    </div>
  )
}
