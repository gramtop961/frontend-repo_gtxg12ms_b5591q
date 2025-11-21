import React, { useMemo, useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Products from './components/Products'
import Gallery from './components/Gallery'
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

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(251,191,36,0.06),transparent_40%),radial-gradient(circle_at_90%_20%,rgba(56,189,248,0.06),transparent_45%),radial-gradient(circle_at_30%_80%,rgba(186,230,253,0.06),transparent_40%)]" />

      <Navbar lang={lang} setLang={setLang} t={t} />
      <Hero t={t} />
      <Features t={t} />
      <Products t={t} />
      <Gallery t={t} lang={lang} />
      <CTA t={t} />
      <Footer t={t} />
    </div>
  )
}
