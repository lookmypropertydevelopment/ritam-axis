import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Link, Outlet, NavLink } from 'react-router-dom'
import { Phone, Menu, X } from 'lucide-react'
import { PROJECTS } from './data/projects'
import QuotePopup from './components/QuotePopup'
// Preloader is now handled by index.html (pure HTML/CSS/JS)

// ── Scroll Reveal Hook ──────────────────────────────────────────────────────
function useScrollReveal(options = {}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Toggle visibility both ways — show on scroll down, hide on scroll up
        setVisible(entry.isIntersecting)
      },
      { threshold: options.threshold ?? 0.12, rootMargin: options.rootMargin ?? '0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return [ref, visible]
}

// ── Reveal Wrapper ───────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, direction = 'up', style = {} }) {
  const [ref, visible] = useScrollReveal()

  const getTransform = () => {
    if (direction === 'up') return visible ? 'translateY(0)' : 'translateY(48px)'
    if (direction === 'down') return visible ? 'translateY(0)' : 'translateY(-48px)'
    if (direction === 'left') return visible ? 'translateX(0)' : 'translateX(-48px)'
    if (direction === 'right') return visible ? 'translateX(0)' : 'translateX(48px)'
    return 'none'
  }

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity 1.4s ease ${delay}ms, transform 1.4s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

const styles = {
  /* Layout */
  app: { background: '#050505', minHeight: '100vh', fontFamily: "'Inter', sans-serif", color: '#FAF9F6', overflowX: 'hidden', backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' },
  container: { maxWidth: '1280px', margin: '0 auto', padding: '0 40px' },

  /* Nav */
  nav: { position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: 'rgba(5,5,5,0.92)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)' },
  navInner: { maxWidth: '1280px', margin: '0 auto', padding: '0 40px', height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  logo: { display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' },
  logoR: { fontSize: '28px', fontFamily: "'Playfair Display', serif", fontWeight: 700, color: '#fff', lineHeight: 1 },
  logoDot: { width: '8px', height: '8px', background: '#D4AF37', borderRadius: '50%', marginBottom: '-4px' },
  logoText: { fontFamily: "'Playfair Display', serif", fontSize: '14px', letterSpacing: '4px', color: '#fff', textTransform: 'uppercase' },
  navLinks: { display: 'flex', gap: '40px', listStyle: 'none', padding: 0, margin: 0 },
  navLink: { color: '#fff', textDecoration: 'none', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', transition: 'color 0.3s', fontWeight: 700 },
  navCta: { padding: '10px 24px', border: '1px solid #D4AF37', color: '#D4AF37', background: 'transparent', cursor: 'pointer', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', transition: 'all 0.3s', fontFamily: "'Inter', sans-serif", fontWeight: 700 },

  /* Hero Slider */
  heroSlider: { position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', background: '#000' },
  heroSlide: { position: 'absolute', inset: 0, willChange: 'opacity, transform' },
  heroSlideImg: { width: '100%', height: '100%', objectFit: 'cover', display: 'block' },
  heroSlideOverlay: { position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.45) 100%)' },
  heroSlideContent: { position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', paddingLeft: 'clamp(32px, 8vw, 120px)', paddingRight: '40px', paddingTop: '72px' },
  heroCaption: { maxWidth: '600px', transition: 'opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s' },
  heroLabel: { fontSize: '11px', letterSpacing: '4px', color: '#D4AF37', textTransform: 'uppercase', marginBottom: '24px', display: 'block' },
  heroH1: { fontFamily: "'Playfair Display', serif", fontSize: 'clamp(44px, 5.5vw, 82px)', lineHeight: 1.08, margin: '0 0 24px', color: '#fff', fontWeight: 400 },
  heroGold: { fontStyle: 'italic', backgroundImage: 'linear-gradient(135deg, #D4AF37, #e8c84a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
  heroSub: { color: 'rgba(255,255,255,0.6)', fontSize: '16px', lineHeight: 1.7, marginBottom: '48px', fontWeight: 300 },
  heroBtns: { display: 'flex', gap: '16px', flexWrap: 'wrap' },
  btnGold: { display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '16px 32px', background: '#D4AF37', color: '#000', fontSize: '11px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', border: 'none', cursor: 'pointer', textDecoration: 'none', fontFamily: "'Inter', sans-serif", transition: 'all 0.3s' },
  btnOutline: { display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '16px 32px', background: 'transparent', color: '#fff', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', border: '1px solid rgba(255,255,255,0.4)', cursor: 'pointer', textDecoration: 'none', fontFamily: "'Inter', sans-serif", transition: 'all 0.3s' },
  /* Slider controls */
  sliderArrow: { position: 'absolute', top: '50%', transform: 'translateY(-50%)', zIndex: 10, width: '52px', height: '52px', background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.25)', backdropFilter: 'blur(8px)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', fontSize: '20px', transition: 'all 0.3s', userSelect: 'none' },
  sliderDots: { position: 'absolute', bottom: '36px', left: 'clamp(32px, 8vw, 120px)', display: 'flex', gap: '10px', zIndex: 10, alignItems: 'center' },
  sliderDot: { width: '28px', height: '2px', background: 'rgba(255,255,255,0.3)', cursor: 'pointer', transition: 'all 0.4s', padding: 0, border: 'none' },
  sliderDotActive: { background: '#D4AF37', width: '52px' },
  /* Autoplay progress bar */
  progressBar: { position: 'absolute', bottom: 0, left: 0, height: '3px', background: 'linear-gradient(90deg, #D4AF37, #e8c84a)', zIndex: 10, transition: 'none' },
  /* Slide counter */
  slideCounter: { position: 'absolute', bottom: '30px', right: '36px', zIndex: 10, color: 'rgba(255,255,255,0.4)', fontSize: '11px', letterSpacing: '3px', fontFamily: "'Playfair Display', serif" },

  /* Section common */
  section: { padding: '120px 40px', maxWidth: '1280px', margin: '0 auto' },
  sectionFull: { padding: '120px 0', borderTop: '1px solid rgba(255,255,255,0.05)' },
  sectionLabel: { fontSize: '11px', letterSpacing: '4px', color: '#D4AF37', textTransform: 'uppercase', marginBottom: '16px' },
  sectionTitle: { fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px, 4vw, 54px)', fontWeight: 400, lineHeight: 1.1, color: '#fff', margin: '0 0 60px' },
  sectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '60px', flexWrap: 'wrap', gap: '24px' },

  /* Services */
  servicesGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.05)' },
  serviceCard: { background: '#050505', padding: '48px 36px', cursor: 'pointer', borderBottom: '2px solid transparent', transition: 'all 0.4s' },
  serviceNum: { fontSize: '11px', letterSpacing: '3px', color: 'rgba(255,255,255,0.25)', marginBottom: '16px', display: 'block' },
  serviceImgBox: { height: '200px', overflow: 'hidden', marginBottom: '28px', background: 'rgba(255,255,255,0.03)' },
  serviceImg: { width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)', transition: 'filter 0.6s ease, transform 0.6s ease' },
  serviceH3: { fontFamily: "'Playfair Display', serif", fontSize: '22px', color: '#fff', marginBottom: '12px', fontWeight: 400 },
  serviceP: { fontSize: '14px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, marginBottom: '24px', fontWeight: 300 },
  arrowBtn: { width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: 'transparent', transition: 'all 0.3s' },

  /* Portfolio */
  portfolioSection: { background: '#030303', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '120px 40px', backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' },
  portfolioGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' },
  portfolioLeft: { display: 'flex', flexDirection: 'column', gap: '16px' },
  portfolioRight: { display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '60px' },
  portfolioCard: { position: 'relative', overflow: 'hidden', cursor: 'pointer' },
  portfolioImg: { width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(80%)', transition: 'filter 0.6s, transform 0.7s', display: 'block' },
  portfolioOverlay: { position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)', opacity: 0, transition: 'opacity 0.4s', display: 'flex', alignItems: 'flex-end', padding: '28px' },
  portfolioTitle: { fontFamily: "'Playfair Display', serif", fontSize: '20px', color: '#fff', margin: 0 },
  portfolioCat: { fontSize: '9px', letterSpacing: '3px', color: '#D4AF37', textTransform: 'uppercase', marginTop: '6px' },
  viewAllCard: { display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.07)', cursor: 'pointer', flexDirection: 'column', gap: '10px', height: '220px', transition: 'border-color 0.3s' },
  viewAllNum: { fontFamily: "'Playfair Display', serif", fontSize: '48px', color: 'rgba(255,255,255,0.15)' },
  viewAllText: { fontSize: '9px', letterSpacing: '4px', color: '#D4AF37', textTransform: 'uppercase' },

  /* Process */
  processGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.04)', marginTop: '20px' },
  processCard: { background: '#050505', padding: '48px 32px', transition: 'all 0.3s', cursor: 'default' },
  processNum: { fontFamily: "'Playfair Display', serif", fontSize: '52px', color: 'rgba(212,175,55,0.15)', lineHeight: 1, marginBottom: '20px', fontWeight: 700 },
  processBar: { width: '32px', height: '2px', background: 'rgba(212,175,55,0.5)', marginBottom: '20px', transition: 'width 0.5s' },
  processH4: { fontFamily: "'Playfair Display', serif", fontSize: '18px', color: '#fff', marginBottom: '12px', fontWeight: 400 },
  processP: { fontSize: '13px', color: 'rgba(255,255,255,0.38)', lineHeight: 1.7, fontWeight: 300 },

  /* CTA Strip */
  ctaSection: { background: '#000', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '100px 40px', textAlign: 'center', backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' },
  ctaH2: { fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px, 4vw, 56px)', color: '#fff', fontWeight: 400, marginBottom: '20px' },
  ctaP: { color: 'rgba(255,255,255,0.4)', fontSize: '15px', marginBottom: '48px', maxWidth: '400px', margin: '0 auto 48px', fontWeight: 300 },
  ctaBtns: { display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' },
  btnWA: { display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '16px 32px', background: '#25D366', color: '#fff', fontSize: '11px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', textDecoration: 'none', fontFamily: "'Inter', sans-serif" },

  /* Footer */
  footer: { background: '#020202', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '80px 40px 40px' },
  footerGrid: { maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '60px', marginBottom: '60px' },
  footerBrand: { fontFamily: "'Playfair Display', serif", fontSize: '13px', letterSpacing: '3px', color: '#fff', textTransform: 'uppercase', display: 'block', marginBottom: '20px' },
  footerP: { fontSize: '13px', color: 'rgba(255,255,255,0.3)', lineHeight: 1.8, maxWidth: '300px', fontWeight: 300, marginBottom: '24px' },
  footerSocials: { display: 'flex', gap: '12px' },
  socialIcon: { width: '36px', height: '36px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontSize: '14px', transition: 'all 0.3s' },
  footerH4: { fontFamily: "'Playfair Display', serif", fontSize: '13px', letterSpacing: '2px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: '24px', fontWeight: 400 },
  footerContact: { listStyle: 'none', padding: 0, margin: 0 },
  footerContactItem: { display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px', fontSize: '13px', color: 'rgba(255,255,255,0.35)', fontWeight: 300 },
  footerBottom: { maxWidth: '1280px', margin: '0 auto', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  footerCopy: { fontSize: '10px', letterSpacing: '2px', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase' },
  footerLinks: { display: 'flex', gap: '32px' },
  footerLink: { fontSize: '10px', letterSpacing: '2px', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', textDecoration: 'none', transition: 'color 0.3s' },

  /* WhatsApp Float */
  waFloat: { position: 'fixed', bottom: '32px', right: '32px', width: '56px', height: '56px', background: '#25D366', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999, boxShadow: '0 8px 32px rgba(37,211,102,0.4)', textDecoration: 'none', transition: 'transform 0.3s' },

  /* Phone Float */
  phoneFloat: { position: 'fixed', bottom: '104px', right: '32px', width: '56px', height: '56px', background: '#D4AF37', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999, boxShadow: '0 8px 32px rgba(212,175,55,0.4)', textDecoration: 'none', transition: 'transform 0.3s', color: '#000' },

  /* Stats Bar */
  statsBar: { background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '60px 40px', backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' },
  statsGrid: { maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.06)' },
  statItem: { background: '#0a0a0a', padding: '40px 48px', textAlign: 'center' },
  statNum: { fontFamily: "'Playfair Display', serif", fontSize: 'clamp(48px, 5vw, 72px)', color: '#D4AF37', fontWeight: 700, lineHeight: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: '4px' },
  statSup: { fontSize: '28px', marginTop: '8px', color: '#D4AF37' },
  statLabel: { fontSize: '11px', letterSpacing: '3px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginTop: '12px', fontWeight: 300 },

  /* Features Strip */
  featuresStrip: { background: '#050505', padding: '80px 40px', borderBottom: '1px solid rgba(255,255,255,0.05)', backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' },
  featuresGrid: { maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' },
  featureCard: { background: '#0c0c0c', border: '1px solid rgba(255,255,255,0.05)', padding: '40px 36px', display: 'flex', gap: '24px', alignItems: 'flex-start', transition: 'border-color 0.3s' },
  featureIcon: { width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '20px' },
  featureH4: { fontFamily: "'Playfair Display', serif", fontSize: '18px', color: '#fff', marginBottom: '8px', fontWeight: 400 },
  featureP: { fontSize: '13px', color: 'rgba(255,255,255,0.38)', lineHeight: 1.7, fontWeight: 300, margin: 0 },

  /* Team */
  teamSection: { background: '#030303', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '120px 40px', backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' },
  teamGrid: { maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.05)', marginTop: '60px' },
  teamCard: { background: '#030303', overflow: 'hidden', cursor: 'pointer', transition: 'background 0.3s' },
  teamImg: { width: '100%', height: '260px', objectFit: 'cover', filter: 'grayscale(100%)', transition: 'filter 0.6s, transform 0.6s', display: 'block' },
  teamInfo: { padding: '24px 20px' },
  teamName: { fontFamily: "'Playfair Display', serif", fontSize: '16px', color: '#fff', marginBottom: '6px', fontWeight: 400 },
  teamRole: { fontSize: '10px', letterSpacing: '2px', color: '#D4AF37', textTransform: 'uppercase', fontWeight: 300 },
}

const HERO_SLIDES = [
  { img: '/home-page-1.jpg', label: 'Living Space' },
  { img: '/home-page-2.jpg', label: 'Master Bedroom' },
  { img: '/home-page-3.jpg', label: 'Culinary Haven' },
  { img: '/home-page-4.jpg', label: 'Dining Room' },
  { img: '/home-page-5.jpg', label: 'Luxury Bath' },
  { img: '/home-page-6.jpg', label: 'Modern Living' },
  { img: '/home-page-7.jpg', label: 'Luxury Suite' },
  { img: '/home-page-8.jpg', label: 'Designer Kitchen' },
  { img: '/home-page-9.jpg', label: 'Urban Living' },
  { img: '/home-page-10.jpg', label: 'Modern Bedroom' },
]

const STATS = [
  { num: '30', sup: '+', label: 'Years of Experience' },
  { num: '400', sup: '+', label: 'Projects Delivered' },
  { num: '1', sup: 'M+', label: 'Sq.ft. Designed & Built' },
]

// ── Animated Counter Component ─────────────────────────────────────────────
function Counter({ value, duration = 2000 }) {
  const [ref, visible] = useScrollReveal()
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!visible) return
    let start = null
    let rafId

    const numValue = parseInt(value, 10)
    if (isNaN(numValue)) {
      setCount(value)
      return
    }

    const easeOutQuart = t => 1 - (--t) * t * t * t

    const step = (timestamp) => {
      if (!start) start = timestamp
      const progress = timestamp - start
      const percentage = Math.min(progress / duration, 1)
      const currentCount = Math.floor(easeOutQuart(percentage) * numValue)

      setCount(currentCount)

      if (progress < duration) {
        rafId = requestAnimationFrame(step)
      } else {
        setCount(numValue)
      }
    }

    rafId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafId)
  }, [value, duration, visible])

  return <span ref={ref}>{count}</span>
}

const FEATURES = [
  { icon: '🏠', title: 'One-Stop Solution', desc: 'Complete design, contracting, and procurement — all under one roof for a seamless experience.' },
  { icon: '🌿', title: 'Committed to Sustainability', desc: 'Local materials, less waste, and energy-smart homes that care for the world we live in.' },
]

const TEAM_MEMBERS = [
  { name: 'Alekhya Akenepally', role: 'Jr. Architect', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=85' },
  { name: 'Ramesh Venkata Naga P', role: 'Deputy General Manager — Finishes', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=85' },
  { name: 'Farooq Syed Suhail', role: 'Jr. Interior Designer', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=85' },
  { name: 'Kumkum Nath', role: 'Jr. Interior Designer', img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=85' },
]

const SERVICES = [
  { num: '01', title: 'Space planning & interior design', desc: 'Optimizing spatial flow and aesthetic harmony to create functional residential environments.', img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=85' },
  { num: '02', title: 'Modular kitchen & wardrobe solutions', desc: 'High-end modular systems that combine ergonomic efficiency with sleek design.', img: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=85' },
  { num: '03', title: 'Custom furniture & carpentry work', desc: 'Bespoke furniture pieces handcrafted to your exact specifications and needs.', img: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=85' },
]



const STEPS = [
  {
    num: '01', title: 'Understand',
    desc: "Understand the client's lifestyle, preferences, budget, and spatial needs.",
    img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=900&q=85',
  },
  {
    num: '02', title: 'Concept',
    desc: 'Develop a theme, color palette, and material selection to set the design tone.',
    images: [
      '/ritam-axis-our-process-1.png',
      '/ritam-axis-our-process-2.png',
      '/ritam-axis-our-process-3.png',
      '/ritam-axis-our-process-4.png'
    ],
  },
  {
    num: '03', title: 'Design',
    desc: 'Create layouts, 3D renders, and detailed drawings to visualize the space.',
    images: [
      '/design-section-1.png',
      '/design-section-2.png',
      '/design-section-3.png',
      '/design-section-4.png',
      '/design-section-5.png',
      '/design-section-6.png',
      '/design-section-7.png',
      '/design-section-8.png'
    ],
  },
  {
    num: '04', title: 'Execution',
    desc: 'Oversee installation, coordinate vendors, and add final styling touches for a complete look.',
    images: [
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&w=900&q=85'
    ],
  },
]

const AUTOPLAY_MS = 6000

// ── One effect per slide (10 total) ──────────────────────────────────────────
const SLIDE_EFFECTS = [
  'zoom',         // 0 – zoom in from centre
  'shatter',      // 1 – broken-glass shards
  'water',        // 2 – water-ripple displacement
  'glitch',       // 3 – digital glitch strips
  'blurFade',     // 4 – blur-to-sharp
  'mosaic',       // 5 – tile grid flies in
  'curtain',      // 6 – curtain panels open
  'circleReveal', // 7 – circle expands from centre
  'venetian',     // 8 – venetian-blind strips
  'pixelate',     // 9 – pixelated dissolve
]

// ── Mosaic tiles (4×5 = 20 rectangles) ───────────────────────────────────────
const MOSAIC_TILES = Array.from({ length: 20 }, (_, idx) => {
  const col = idx % 4, row = Math.floor(idx / 4)
  const dirs = [[-1, -1], [1, -1], [1, 1], [-1, 1], [-1, 0], [1, 0], [0, -1], [0, 1]]
  const [dx, dy] = dirs[idx % 8]
  return {
    clip: `polygon(${col * 25}% ${row * 20}%, ${(col + 1) * 25}% ${row * 20}%, ${(col + 1) * 25}% ${(row + 1) * 20}%, ${col * 25}% ${(row + 1) * 20}%)`,
    tx: dx * (55 + (idx * 17) % 75), ty: dy * (45 + (idx * 23) % 65), delay: (row * 4 + col) * 30 + (idx % 3) * 15,
  }
})

// ── Broken-glass shards (9 polygon fragments covering 100% of the frame) ────
const SHARDS = [
  { clip: 'polygon(0% 0%, 42% 0%, 22% 55%)', tx: -170, ty: -130, delay: 0 },
  { clip: 'polygon(42% 0%, 78% 0%, 65% 42%)', tx: 0, ty: -170, delay: 65 },
  { clip: 'polygon(78% 0%, 100% 0%, 100% 48%, 65% 42%)', tx: 190, ty: -105, delay: 30 },
  { clip: 'polygon(22% 55%, 42% 0%, 65% 42%, 55% 88%)', tx: 35, ty: 55, delay: 95 },
  { clip: 'polygon(0% 0%, 22% 55%, 0% 78%)', tx: -210, ty: 25, delay: 20 },
  { clip: 'polygon(0% 78%, 22% 55%, 55% 88%, 32% 100%)', tx: -130, ty: 170, delay: 80 },
  { clip: 'polygon(32% 100%, 55% 88%, 100% 100%)', tx: 0, ty: 210, delay: 50 },
  { clip: 'polygon(55% 88%, 65% 42%, 100% 48%, 100% 100%)', tx: 160, ty: 140, delay: 40 },
  { clip: 'polygon(0% 78%, 32% 100%, 0% 100%)', tx: -185, ty: 205, delay: 70 },
]

// ── Glitch horizontal slices ─────────────────────────────────────────────────
const GLITCH_SLICES = Array.from({ length: 12 }, (_, i) => ({
  top: (i / 12) * 100,
  bottom: ((i + 1) / 12) * 100,
  gx: (i % 2 === 0 ? 1 : -1) * (18 + (i * 19) % 65),
  delay: i * 48,
}))

// ── Shatter Effect Component ─────────────────────────────────────────────────
function ShatterEffect({ img, alt, animKey }) {
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <style>{`
        @keyframes shardFly {
          from { opacity: 0; transform: translate(var(--tx), var(--ty)) scale(0.86); filter: brightness(2); }
          40%  { filter: brightness(1.2); }
          to   { opacity: 1; transform: translate(0,0) scale(1); filter: brightness(1); }
        }
      `}</style>
      {SHARDS.map((s, i) => (
        <div key={`sh-${animKey}-${i}`} style={{
          position: 'absolute', inset: 0,
          clipPath: s.clip,
          '--tx': `${s.tx}px`,
          '--ty': `${s.ty}px`,
          animation: `shardFly 1.15s cubic-bezier(0.16,1,0.3,1) ${s.delay}ms both`,
        }}>
          <img src={img} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
      ))}
    </div>
  )
}

// ── Water Ripple Effect Component (JS-animated SVG displacement) ─────────────
function WaterEffect({ img, alt, animKey }) {
  const svgRef = useRef(null)
  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    const disp = svg.querySelector('feDisplacementMap')
    const turb = svg.querySelector('feTurbulence')
    if (!disp || !turb) return
    let start = null
    const DURATION = 2400
    const raf = requestAnimationFrame(function tick(ts) {
      if (!start) start = ts
      const t = Math.min((ts - start) / DURATION, 1)
      const scale = 90 * Math.exp(-5 * t)
      const freq = 0.01 + 0.035 * Math.exp(-3.5 * t)
      disp.setAttribute('scale', scale.toFixed(1))
      turb.setAttribute('baseFrequency', `${freq.toFixed(5)} ${(freq * 1.8).toFixed(5)}`)
      if (t < 1) requestAnimationFrame(tick)
      else disp.setAttribute('scale', '0')
    })
    return () => cancelAnimationFrame(raf)
  }, [animKey])

  const fid = `wf-${animKey}`
  return (
    <div style={{ position: 'absolute', inset: 0, animation: 'wfFadeIn 0.5s ease both' }}>
      <style>{`@keyframes wfFadeIn { from{opacity:0} to{opacity:1} }`}</style>
      <svg ref={svgRef} style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
        <defs>
          <filter id={fid} x="-15%" y="-15%" width="130%" height="130%" colorInterpolationFilters="sRGB">
            <feTurbulence type="turbulence" baseFrequency="0.045 0.081" numOctaves="4" seed="12" stitchTiles="stitch" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="90" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
      <img src={img} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: `url(#${fid})` }} />
    </div>
  )
}

// ── Digital Glitch Effect Component ──────────────────────────────────────────
function GlitchEffect({ img, alt, animKey }) {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <style>{`
        @keyframes glitchSlice {
          0%   { transform: translateX(var(--gx)); opacity: 0.4; filter: hue-rotate(90deg) brightness(1.6); }
          20%  { transform: translateX(calc(var(--gx) * -0.55)); filter: hue-rotate(0deg) brightness(1.1); }
          42%  { transform: translateX(calc(var(--gx) * 0.22)); opacity: 1; }
          62%  { transform: translateX(calc(var(--gx) * -0.08)); }
          80%  { transform: translateX(calc(var(--gx) * 0.02)); filter: none; }
          100% { transform: translateX(0); filter: none; opacity: 1; }
        }
      `}</style>
      {GLITCH_SLICES.map((s, i) => (
        <div key={`gl-${animKey}-${i}`} style={{
          position: 'absolute', inset: 0,
          clipPath: `polygon(0% ${s.top}%, 100% ${s.top}%, 100% ${s.bottom}%, 0% ${s.bottom}%)`,
          '--gx': `${s.gx}px`,
          animation: `glitchSlice 0.9s cubic-bezier(0.22,1,0.36,1) ${s.delay}ms both`,
        }}>
          <img src={img} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
      ))}
    </div>
  )
}

// ── MosaicEffect (rectangular tile grid flies in) ────────────────────────────
function MosaicEffect({ img, alt, animKey }) {
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <style>{`@keyframes mosaicTile{from{opacity:0;transform:translate(var(--tx),var(--ty)) scale(.82)}to{opacity:1;transform:translate(0,0) scale(1)}}`}</style>
      {MOSAIC_TILES.map((t, i) => (
        <div key={`mo-${animKey}-${i}`} style={{ position: 'absolute', inset: 0, clipPath: t.clip, '--tx': `${t.tx}px`, '--ty': `${t.ty}px`, animation: `mosaicTile 1.0s cubic-bezier(.16,1,.3,1) ${t.delay}ms both` }}>
          <img src={img} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
      ))}
    </div>
  )
}

// ── CurtainEffect (left & right panels slide in from sides) ──────────────────
function CurtainEffect({ img, alt, animKey }) {
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <style>{`@keyframes curtainL{from{transform:translateX(-105%)}to{transform:translateX(0)}}@keyframes curtainR{from{transform:translateX(105%)}to{transform:translateX(0)}}`}</style>
      {[
        { clip: 'polygon(0% 0%,50% 0%,50% 100%,0% 100%)', anim: 'curtainL 1.1s cubic-bezier(.16,1,.3,1) both' },
        { clip: 'polygon(50% 0%,100% 0%,100% 100%,50% 100%)', anim: 'curtainR 1.1s cubic-bezier(.16,1,.3,1) both' },
      ].map((p, i) => (
        <div key={`cu-${animKey}-${i}`} style={{ position: 'absolute', inset: 0, clipPath: p.clip, animation: p.anim }}>
          <img src={img} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
      ))}
    </div>
  )
}

// ── VenetianEffect (horizontal strips fold open from top) ─────────────────────
function VenetianEffect({ img, alt, animKey }) {
  const N = 10, h = 100 / N
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <style>{`@keyframes venetianIn{from{transform:scaleY(0)}to{transform:scaleY(1)}}`}</style>
      {Array.from({ length: N }, (_, i) => (
        <div key={`ven-${animKey}-${i}`} style={{
          position: 'absolute', left: 0, right: 0, top: `${i * h}%`, height: `${h}%`,
          transformOrigin: 'center top', overflow: 'hidden',
          animation: `venetianIn .48s ease-out ${i * 72}ms both`,
          backgroundImage: `url(${img})`,
          backgroundSize: `100% ${N * 100}%`,
          backgroundPosition: `50% ${N === 1 ? 0 : i / (N - 1) * 100}%`,
        }} />
      ))}
    </div>
  )
}

// ── Hero Slider ───────────────────────────────────────────────────────────────
function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [animKey, setAnimKey] = useState(0)
  const [progress, setProgress] = useState(0)
  const [paused, setPaused] = useState(false)
  const currentRef = useRef(0)
  const animatingRef = useRef(false)
  const timerRef = useRef(null)
  const progressRef = useRef(null)
  const progressStartRef = useRef(null)
  const count = HERO_SLIDES.length

  useEffect(() => { currentRef.current = current }, [current])
  useEffect(() => { animatingRef.current = animating }, [animating])

  const goTo = useCallback((idx) => {
    if (animatingRef.current) return
    animatingRef.current = true
    setAnimating(true)
    setCurrent(idx)
    setAnimKey(k => k + 1)
    currentRef.current = idx
    setProgress(0)
    progressStartRef.current = Date.now()
    setTimeout(() => { animatingRef.current = false; setAnimating(false) }, 1500)
  }, [])

  const next = useCallback(() => goTo((currentRef.current + 1) % count), [goTo, count])
  const prev = useCallback(() => goTo((currentRef.current - 1 + count) % count), [goTo, count])

  useEffect(() => {
    if (paused) { clearInterval(timerRef.current); return }
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => goTo((currentRef.current + 1) % count), AUTOPLAY_MS)
    return () => clearInterval(timerRef.current)
  }, [paused, goTo, count])

  useEffect(() => {
    if (paused) return
    progressStartRef.current = Date.now()
    setProgress(0)
    const tick = () => {
      const elapsed = Date.now() - progressStartRef.current
      const pct = Math.min((elapsed / AUTOPLAY_MS) * 100, 100)
      setProgress(pct)
      if (pct < 100) progressRef.current = requestAnimationFrame(tick)
    }
    progressRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(progressRef.current)
  }, [current, paused])

  const effect = SLIDE_EFFECTS[current % SLIDE_EFFECTS.length]
  const slide = HERO_SLIDES[current]

  const renderEffect = () => {
    if (effect === 'shatter') return <ShatterEffect key={animKey} img={slide.img} alt={slide.label} animKey={animKey} />
    if (effect === 'water') return <WaterEffect key={animKey} img={slide.img} alt={slide.label} animKey={animKey} />
    if (effect === 'glitch') return <GlitchEffect key={animKey} img={slide.img} alt={slide.label} animKey={animKey} />
    if (effect === 'mosaic') return <MosaicEffect key={animKey} img={slide.img} alt={slide.label} animKey={animKey} />
    if (effect === 'curtain') return <CurtainEffect key={animKey} img={slide.img} alt={slide.label} animKey={animKey} />
    if (effect === 'venetian') return <VenetianEffect key={animKey} img={slide.img} alt={slide.label} animKey={animKey} />
    // CSS-only effects
    const cssAnims = {
      zoom: 'heroZoomIn    1.3s cubic-bezier(.22,1,.36,1) both',
      blurFade: 'heroBlurFade  1.4s cubic-bezier(.22,1,.36,1) both',
      circleReveal: 'heroCircle    1.2s cubic-bezier(.22,1,.36,1) both',
      pixelate: 'heroPixelate  1.5s cubic-bezier(.22,1,.36,1) both',
    }
    return (
      <div key={animKey} style={{ position: 'absolute', inset: 0, animation: cssAnims[effect] }}>
        <img src={slide.img} alt={slide.label} style={styles.heroSlideImg} />
      </div>
    )
  }

  return (
    <section style={styles.heroSlider}>
      <style>{`
        @keyframes heroZoomIn    { from{opacity:0;transform:scale(1.22)} to{opacity:1;transform:scale(1)} }
        @keyframes heroBlurFade  { from{opacity:0;filter:blur(32px) brightness(1.5);transform:scale(1.1)} 55%{filter:blur(8px) brightness(1.15)} to{opacity:1;filter:blur(0) brightness(1);transform:scale(1)} }
        @keyframes heroCircle    { from{clip-path:circle(0% at 50% 50%);opacity:.5} to{clip-path:circle(150% at 50% 50%);opacity:1} }
        @keyframes heroPixelate  { from{opacity:0;filter:blur(22px) contrast(6) brightness(2);transform:scale(1.12)} 35%{filter:blur(9px) contrast(2) brightness(1.3)} 70%{filter:blur(2px) contrast(1.05);transform:scale(1.02)} to{opacity:1;filter:none;transform:scale(1)} }
      `}</style>

      {/* Inactive slides sit below as plain images (instant swap) */}
      {HERO_SLIDES.map((s, i) => i !== current && (
        <div key={i} style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
          <img src={s.img} alt={s.label} style={styles.heroSlideImg} />
        </div>
      ))}

      {/* Active slide — unique effect layer */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 2 }}>
        {renderEffect()}
      </div>

      {/* ARROWS */}
      <button style={{ ...styles.sliderArrow, left: '28px' }}
        onClick={prev}
        onMouseEnter={e => { e.currentTarget.style.background = '#D4AF37'; e.currentTarget.style.borderColor = '#D4AF37'; e.currentTarget.style.color = '#000' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.45)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.color = '#fff' }}
        aria-label="Previous slide">‹</button>
      <button style={{ ...styles.sliderArrow, right: '28px' }}
        onClick={next}
        onMouseEnter={e => { e.currentTarget.style.background = '#D4AF37'; e.currentTarget.style.borderColor = '#D4AF37'; e.currentTarget.style.color = '#000' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.45)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.color = '#fff' }}
        aria-label="Next slide">›</button>

      {/* DOTS */}
      <div style={styles.sliderDots}>
        {HERO_SLIDES.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} aria-label={`Go to slide ${i + 1}`}
            style={i === current ? { ...styles.sliderDot, ...styles.sliderDotActive } : styles.sliderDot} />
        ))}
      </div>

      {/* COUNTER */}
      <div style={styles.slideCounter}>
        <span style={{ color: '#D4AF37', fontWeight: 700 }}>{String(current + 1).padStart(2, '0')}</span>{' / '}{String(count).padStart(2, '0')}
      </div>

      {/* PROGRESS BAR */}
      <div style={{ ...styles.progressBar, width: `${progress}%` }} />
    </section>
  )
}

function NavItem({ to, label, end }) {
  const [hovered, setHovered] = useState(false)
  return (
    <NavLink
      to={to}
      end={end}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={({ isActive }) => ({
        ...styles.navLink,
        color: isActive ? '#D4AF37' : hovered ? '#D4AF37' : '#fff',
        position: 'relative',
        display: 'inline-block'
      })}
    >
      {({ isActive }) => (
        <>
          {label}
          <span style={{
            position: 'absolute',
            bottom: '-4px',
            left: '50%',
            width: (isActive || hovered) ? '100%' : '0%',
            height: '1px',
            background: '#D4AF37',
            transition: 'all 0.3s ease',
            transform: 'translateX(-50%)'
          }} />
        </>
      )}
    </NavLink>
  )
}

function InlineSlider({ images }) {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = images.length

  useEffect(() => {
    if (paused) return
    const timer = setInterval(() => {
      setCurrent(c => (c + 1) % count)
    }, 4000)
    return () => clearInterval(timer)
  }, [paused, count])

  return (
    <div 
      style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', cursor: 'pointer' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div style={{
        display: 'flex', width: '100%', height: '100%',
        transform: `translateX(-${current * 100}%)`, transition: 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
      }}>
        {images.map((url, i) => (
          <img key={i} src={url} alt={`Slide ${i}`} style={{ width: '100%', height: '100%', flexShrink: 0, objectFit: 'cover', display: 'block' }} />
        ))}
      </div>
      <div style={{ position: 'absolute', bottom: '20px', left: '0', right: '0', display: 'flex', justifyContent: 'center', gap: '10px', zIndex: 10 }}>
        {images.map((_, i) => (
          <button key={i} onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCurrent(i) }} aria-label={`Go to slide ${i}`} style={{
            width: current === i ? '24px' : '8px', height: '8px', borderRadius: '4px', border: 'none', padding: 0, cursor: 'pointer',
            background: current === i ? '#D4AF37' : 'rgba(255,255,255,0.4)', transition: 'all 0.4s ease'
          }} />
        ))}
      </div>
    </div>
  )
}

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [isQuoteOpen, setIsQuoteOpen] = useState(false)
  const [isAppReady, setIsAppReady] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    // Match the HTML preloader timing: 5s animation + 0.5s pause before fade
    const timer = setTimeout(() => setIsAppReady(true), 5500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.85)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // set initial state
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div style={styles.app} className={`app-content ${isAppReady ? 'ready' : ''}`}>
      {/* — NAV — */}
      <nav style={{
        ...styles.nav,
        background: scrolled ? '#0a0a0a' : 'rgba(0,0,0,0.28)',
        backdropFilter: scrolled ? 'blur(20px)' : 'blur(2px)',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(255,255,255,0.04)',
        boxShadow: scrolled ? '0 1px 0 rgba(255,255,255,0.04)' : 'none',
        transition: 'background 0.5s ease, backdrop-filter 0.5s ease',
      }}>
        <div style={styles.navInner}>
          <Link to="/" style={{ ...styles.logo, flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <div style={{ fontSize: '24px', fontFamily: "'Playfair Display', serif", fontWeight: 700, color: '#fff', lineHeight: 1, letterSpacing: '2px', textAlign: 'center' }}>RITAM AXIS</div>
            <div style={{ fontSize: '7.5px', fontFamily: "'Inter', sans-serif", color: '#D4AF37', letterSpacing: '3px', textTransform: 'uppercase', textAlign: 'center' }}>Interior Design Studio</div>
          </Link>
          <ul style={{ ...styles.navLinks, ...(isMobile ? { display: 'none' } : {}) }}>
            {[
              { label: 'Home', to: '/', end: true },
              { label: 'About', to: '/about' },
              { label: 'Services', to: '/services' },
              { label: 'Portfolio', to: '/portfolio' },
              { label: 'Blog', to: '/blog' },
              { label: 'Contact', to: '/contact' },
            ].map(({ label, to, end }) => (
              <li key={label}>
                <NavItem to={to} label={label} end={end} />
              </li>
            ))}
          </ul>
          
          {!isMobile && (
            <button onClick={() => setIsQuoteOpen(true)} style={{ ...styles.navCta, textDecoration: 'none', display: 'inline-block' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#D4AF37'; e.currentTarget.style.color = '#000' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#D4AF37' }}>
              Free Quote
            </button>
          )}

          {isMobile && (
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle mobile menu" style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          )}
        </div>
        
        {/* MOBILE MENU OVERLAY */}
        {isMobile && isMobileMenuOpen && (
          <div style={{
            position: 'absolute', top: '72px', left: 0, right: 0, height: 'calc(100vh - 72px)',
            background: 'rgba(5,5,5,0.98)', backdropFilter: 'blur(10px)', zIndex: 99,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start',
            paddingTop: '60px', gap: '32px', borderTop: '1px solid rgba(255,255,255,0.1)'
          }}>
            {[
              { label: 'Home', to: '/', end: true },
              { label: 'About', to: '/about' },
              { label: 'Services', to: '/services' },
              { label: 'Portfolio', to: '/portfolio' },
              { label: 'Blog', to: '/blog' },
              { label: 'Contact', to: '/contact' },
            ].map(({ label, to, end }) => (
              <div key={label} onClick={() => setIsMobileMenuOpen(false)}>
                <NavItem to={to} label={label} end={end} />
              </div>
            ))}
            <button onClick={() => { setIsMobileMenuOpen(false); setIsQuoteOpen(true); }} style={{ ...styles.navCta, textDecoration: 'none', display: 'inline-block', marginTop: '20px' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#D4AF37'; e.currentTarget.style.color = '#000' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#D4AF37' }}>
              Free Quote
            </button>
          </div>
        )}
      </nav>

      <Outlet />

      {/* — FOOTER — */}
      <footer style={styles.footer}>
        <Reveal direction="left" delay={0}>
          <div style={styles.footerGrid}>
            <div>
              <span style={styles.footerBrand}>Ritam Axis</span>
              <p style={styles.footerP}>Designing the soul of your home through architectural minimalism and supreme functionality. Hyderabad's premier luxury interior studio.</p>
              <div style={styles.footerSocials}>
                {['In', 'Ig', 'Fb'].map(s => (
                  <a key={s} href="#" style={styles.socialIcon}
                    onMouseEnter={e => { e.currentTarget.style.color = '#D4AF37'; e.currentTarget.style.borderColor = '#D4AF37' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}>
                    {s}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 style={styles.footerH4}>Studio</h4>
              <ul style={styles.footerContact}>
                <li style={styles.footerContactItem}><span style={{ color: '#D4AF37' }}>📍</span> Madhapur, Hyderabad, Telangana — 500081</li>
                <li style={styles.footerContactItem}><span style={{ color: '#D4AF37' }}>📞</span> <a href="tel:+919876543210" style={{ color: 'inherit', textDecoration: 'none' }}>+91 98765 43210</a></li>
                <li style={styles.footerContactItem}><span style={{ color: '#D4AF37' }}>✉</span> studio@ritamaxis.com</li>
              </ul>
            </div>
            <div>
              <h4 style={styles.footerH4}>Newsletter</h4>
              <p style={{ ...styles.footerP, maxWidth: '100%' }}>Get our free 2025 Design Trends guide.</p>
              <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px' }}>
                <input type="email" placeholder="your@email.com" style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontSize: '13px', fontFamily: "'Inter', sans-serif" }} />
                <button style={{ background: 'none', border: 'none', color: '#D4AF37', cursor: 'pointer', fontSize: '20px' }}>›</button>
              </div>
            </div>
          </div>
        </Reveal>
        <div style={styles.footerBottom}>
          <p style={styles.footerCopy}>© {new Date().getFullYear()} Ritam Axis. All Rights Reserved.</p>
          <div style={styles.footerLinks}>
            <a href="#" style={styles.footerLink}>Privacy Policy</a>
            <a href="#" style={styles.footerLink}>Terms</a>
          </div>
        </div>
      </footer>

      {/* — FLOATING CALL — */}
      <a href="tel:+919876543210" style={styles.phoneFloat}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.12)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
        <Phone size={24} />
      </a>

      {/* — FLOATING WHATSAPP — */}
      <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" style={styles.waFloat}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.12)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
        <svg width="26" height="26" fill="white" viewBox="0 0 16 16"><path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" /></svg>
      </a>

      <QuotePopup isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />


      <style>{`
        .app-content {
          opacity: 0;
          transition: opacity 1.2s ease-in-out;
        }
        .app-content.ready {
          opacity: 1;
        }
      `}</style>
    </div>
  )
}

export function Home() {
  const [hoveredService, setHoveredService] = useState(null)
  const [hoveredProject, setHoveredProject] = useState(null)

  return (
    <>
      {/* — HERO SLIDER — */}
      <HeroSlider />

      {/* — STATS BAR — */}
      <div style={styles.statsBar}>
        <Reveal direction="up" delay={0}>
          <div style={styles.statsGrid}>
            {STATS.map((s, i) => (
              <div key={i} style={styles.statItem}>
                <div style={styles.statNum}>
                  <Counter value={s.num} /><span style={styles.statSup}>{s.sup}</span>
                </div>
                <p style={styles.statLabel}>{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* — FEATURES STRIP — */}
      <div style={styles.featuresStrip}>
        <div style={styles.featuresGrid}>
          {FEATURES.map((f, i) => (
            <Reveal key={i} direction={i === 0 ? 'left' : 'right'} delay={i * 150}>
              <div style={styles.featureCard}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(212,175,55,0.35)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'}>
                <div style={styles.featureIcon}>{f.icon}</div>
                <div>
                  <h4 style={styles.featureH4}>{f.title}</h4>
                  <p style={styles.featureP}>{f.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* — SERVICES — */}
      <section id="services" style={{ ...styles.sectionFull, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>
          <Reveal direction="left" delay={0}>
            <div style={styles.sectionHeader}>
              <div>
                <p style={styles.sectionLabel}>What We Do</p>
                <h2 style={{ ...styles.sectionTitle, margin: 0, position: 'relative', paddingBottom: '20px' }}>Our Expertise</h2>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.3)', maxWidth: '280px', fontSize: '14px', lineHeight: 1.7, fontWeight: 300 }}>
                Architectural minimalism meets functional luxury — every space is a bespoke story.
              </p>
            </div>
          </Reveal>
        </div>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>
          <div style={styles.servicesGrid}>
            {SERVICES.map((s, i) => (
              <Reveal key={i} direction={i === 0 ? 'left' : i === 1 ? 'up' : 'right'} delay={i * 120}>
                <div
                  style={{ ...styles.serviceCard, borderBottom: hoveredService === i ? '2px solid #D4AF37' : '2px solid transparent', height: '100%' }}
                  onMouseEnter={() => setHoveredService(i)}
                  onMouseLeave={() => setHoveredService(null)}>
                  <span style={styles.serviceNum}>{s.num}</span>
                  <div style={styles.serviceImgBox}>
                    <img src={s.img} alt={s.title} style={{ ...styles.serviceImg, filter: hoveredService === i ? 'grayscale(0%)' : 'grayscale(100%)', transform: hoveredService === i ? 'scale(1.06)' : 'scale(1)' }} />
                  </div>
                  <h3 style={styles.serviceH3}>{s.title}</h3>
                  <p style={styles.serviceP}>{s.desc}</p>
                  <div style={{ ...styles.arrowBtn, background: hoveredService === i ? '#D4AF37' : 'transparent', borderColor: hoveredService === i ? '#D4AF37' : 'rgba(255,255,255,0.15)' }}>
                    <span style={{ color: hoveredService === i ? '#000' : '#fff', fontSize: '16px', lineHeight: 1 }}>↗</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* — PORTFOLIO — */}
      <section id="portfolio" style={styles.portfolioSection}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <Reveal direction="left" delay={0}>
            <div style={{ marginBottom: '60px' }}>
              <p style={styles.sectionLabel}>Selected Works</p>
              <h2 style={{ ...styles.sectionTitle, margin: 0, position: 'relative', paddingBottom: '20px' }}>Portfolio</h2>
            </div>
          </Reveal>
          <div style={styles.portfolioGrid}>
            <Reveal direction="left" delay={0} style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={styles.portfolioLeft}>
                {[PROJECTS[0], PROJECTS[1]].map((p, i) => (
                  <Link to={`/project/${p.slug}`} key={i}
                    style={{ ...styles.portfolioCard, height: `${p.h}px`, display: 'block' }}
                    onMouseEnter={() => setHoveredProject(i)}
                    onMouseLeave={() => setHoveredProject(null)}>
                    <img src={p.img} alt={p.title}
                      style={{ ...styles.portfolioImg, filter: hoveredProject === i ? 'grayscale(0%)' : 'grayscale(70%)', transform: hoveredProject === i ? 'scale(1.05)' : 'scale(1)' }} />
                    <div style={{ ...styles.portfolioOverlay, opacity: hoveredProject === i ? 1 : 0 }}>
                      <div>
                        <p style={styles.portfolioTitle}>{p.title}</p>
                        <p style={styles.portfolioCat}>{p.cat}</p>
                      </div>
                      <div style={{ marginLeft: 'auto', width: '40px', height: '40px', background: '#D4AF37', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <span style={{ color: '#000', fontSize: '18px' }}>↗</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </Reveal>
            <Reveal direction="right" delay={150} style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={styles.portfolioRight}>
                <Link to={`/project/${PROJECTS[2].slug}`}
                  style={{ ...styles.portfolioCard, height: `${PROJECTS[2].h}px`, display: 'block' }}
                  onMouseEnter={() => setHoveredProject(2)}
                  onMouseLeave={() => setHoveredProject(null)}>
                  <img src={PROJECTS[2].img} alt={PROJECTS[2].title}
                    style={{ ...styles.portfolioImg, filter: hoveredProject === 2 ? 'grayscale(0%)' : 'grayscale(70%)', transform: hoveredProject === 2 ? 'scale(1.05)' : 'scale(1)' }} />
                  <div style={{ ...styles.portfolioOverlay, opacity: hoveredProject === 2 ? 1 : 0 }}>
                    <div>
                      <p style={styles.portfolioTitle}>{PROJECTS[2].title}</p>
                      <p style={styles.portfolioCat}>{PROJECTS[2].cat}</p>
                    </div>
                    <div style={{ marginLeft: 'auto', width: '40px', height: '40px', background: '#D4AF37', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ color: '#000', fontSize: '18px' }}>↗</span>
                    </div>
                  </div>
                </Link>
                <Link to="/portfolio" style={{ ...styles.viewAllCard, textDecoration: 'none', display: 'flex' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(212,175,55,0.4)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}>
                  <span style={styles.viewAllNum}>+12</span>
                  <span style={styles.viewAllText}>View All Projects</span>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* — PROCESS — */}
      <section id="process" style={{ background: '#050505', padding: '100px 0', backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>

          {/* Big editorial title */}
          <Reveal direction="left" delay={0}>
            <h2 style={{ ...styles.sectionTitle, margin: 0, position: 'relative', paddingBottom: '20px' }}>
              The Design Process
            </h2>
          </Reveal>

          {/* Alternating rows */}
          {STEPS.map((step, i) => {
            const isOdd = i % 2 !== 0
            return (
              <Reveal key={i} direction={isOdd ? 'right' : 'left'} delay={i * 80}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0',
                  alignItems: 'stretch',
                  marginBottom: '2px',
                  direction: isOdd ? 'rtl' : 'ltr',
                }}>
                  {/* Text side */}
                  <div style={{
                    direction: 'ltr',
                    display: 'flex', flexDirection: 'column',
                    justifyContent: 'center',
                    padding: isOdd ? '60px 60px 60px 80px' : '60px 80px 60px 60px',
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                  }}>
                    <span style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: '13px', letterSpacing: '4px',
                      color: '#D4AF37', marginBottom: '20px', display: 'block',
                    }}>{step.num}</span>
                    <h3 style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 'clamp(22px, 2.5vw, 32px)',
                      fontWeight: 400, color: '#fff',
                      margin: '0 0 20px',
                    }}>{step.title}</h3>
                    <p style={{
                      color: 'rgba(255,255,255,0.5)',
                      fontSize: '15px', lineHeight: 1.8,
                      maxWidth: '400px', margin: 0,
                    }}>{step.desc}</p>
                  </div>

                  {/* Image side */}
                  <div style={{
                    direction: 'ltr',
                    overflow: 'hidden',
                    aspectRatio: '4/3',
                    minHeight: '320px',
                  }}>
                    {step.images ? (
                      <InlineSlider images={step.images} />
                    ) : (
                      <img
                        src={step.img} alt={step.title}
                        style={{
                          width: '100%', height: '100%',
                          objectFit: 'cover', display: 'block',
                          transition: 'transform 0.7s ease',
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                      />
                    )}
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      {/* — TEAM — */}
      <section style={styles.teamSection}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <Reveal direction="left" delay={0}>
            <p style={styles.sectionLabel}>The Incredible Design Team</p>
            <h2 style={{ ...styles.sectionTitle, margin: 0, position: 'relative', paddingBottom: '20px' }}>We're a Creative Team</h2>
          </Reveal>
          <div style={styles.teamGrid}>
            {TEAM_MEMBERS.map((m, i) => (
              <Reveal key={i} direction={i % 2 === 0 ? 'left' : 'right'} delay={i * 100}>
                <div style={styles.teamCard}
                  onMouseEnter={e => { e.currentTarget.querySelector('img').style.filter = 'grayscale(0%)'; e.currentTarget.querySelector('img').style.transform = 'scale(1.06)' }}
                  onMouseLeave={e => { e.currentTarget.querySelector('img').style.filter = 'grayscale(100%)'; e.currentTarget.querySelector('img').style.transform = 'scale(1)' }}>
                  <img src={m.img} alt={m.name} style={styles.teamImg} />
                  <div style={styles.teamInfo}>
                    <p style={styles.teamName}>{m.name}</p>
                    <p style={styles.teamRole}>{m.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* — CTA — */}
      <section style={styles.ctaSection}>
        <Reveal direction="left" delay={0}>
          <p style={styles.sectionLabel}>Let's Build Together</p>
          <h2 style={{ ...styles.sectionTitle, margin: 0, position: 'relative', paddingBottom: '20px' }}>Ready to transform your space?</h2>
          <p style={styles.ctaP}>Book a free consultation and let's explore how we can bring your dream home to life.</p>
        </Reveal>
        <Reveal direction="right" delay={200}>
          <div style={styles.ctaBtns}>
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" style={styles.btnWA}>
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" /></svg>
              Chat on WhatsApp
            </a>
            <Link to="/contact" style={{ ...styles.btnGold, textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}
              onMouseEnter={e => e.currentTarget.style.background = '#c8a22e'}
              onMouseLeave={e => e.currentTarget.style.background = '#D4AF37'}>
              Get a Free Quote
            </Link>
          </div>
        </Reveal>
      </section>

    </>
  )
}
