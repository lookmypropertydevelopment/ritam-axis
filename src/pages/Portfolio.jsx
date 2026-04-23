import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { PROJECTS } from '../data/projects'

function useReveal() {
    const ref = useRef(null)
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        const el = ref.current
        if (!el) return
        const obs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.1 })
        obs.observe(el)
        return () => obs.disconnect()
    }, [])
    return [ref, visible]
}

function Reveal({ children, direction = 'up', delay = 0, style = {} }) {
    const [ref, visible] = useReveal()
    const t = { up: visible ? 'translateY(0)' : 'translateY(48px)', left: visible ? 'translateX(0)' : 'translateX(-48px)', right: visible ? 'translateX(0)' : 'translateX(48px)' }
    return (
        <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: t[direction], transition: `opacity 0.8s ease ${delay}ms, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms`, ...style }}>
            {children}
        </div>
    )
}



const FILTERS = ['All', 'Residential']

const s = {
    page: { background: '#050505', minHeight: '100vh', fontFamily: "'Inter', sans-serif", color: '#FAF9F6', paddingTop: '72px' },
    hero: { position: 'relative', height: '60vh', overflow: 'hidden', display: 'flex', alignItems: 'center' },
    heroImg: { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.3)' },
    heroContent: { position: 'relative', zIndex: 2, padding: '0 clamp(32px,8vw,120px)' },
    heroLabel: { fontSize: '11px', letterSpacing: '4px', color: '#D4AF37', textTransform: 'uppercase', marginBottom: '20px', display: 'block' },
    heroH1: { fontFamily: "'Playfair Display', serif", fontSize: 'clamp(40px,5vw,76px)', color: '#fff', fontWeight: 400, lineHeight: 1.1, margin: 0 },
    heroGold: { fontStyle: 'italic', backgroundImage: 'linear-gradient(135deg,#D4AF37,#e8c84a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
    section: { padding: '80px 40px', maxWidth: '1280px', margin: '0 auto' },
    filters: { display: 'flex', gap: '12px', marginBottom: '48px', flexWrap: 'wrap' },
    filterBtn: { padding: '10px 24px', border: '1px solid rgba(255,255,255,0.12)', background: 'transparent', color: 'rgba(255,255,255,0.5)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.3s', fontFamily: "'Inter', sans-serif" },
    filterBtnActive: { padding: '10px 24px', border: '1px solid #D4AF37', background: 'transparent', color: '#D4AF37', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer', fontFamily: "'Inter', sans-serif" },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' },
    card: { position: 'relative', overflow: 'hidden', cursor: 'pointer', height: '320px' },
    cardImg: { width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(70%)', transition: 'filter 0.6s, transform 0.7s', display: 'block' },
    overlay: { position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 55%)', opacity: 0, transition: 'opacity 0.4s', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '28px' },
    cardTitle: { fontFamily: "'Playfair Display', serif", fontSize: '20px', color: '#fff', margin: '0 0 6px' },
    cardCat: { fontSize: '9px', letterSpacing: '3px', color: '#D4AF37', textTransform: 'uppercase' },
}

function PortfolioCard({ p, i }) {
    const [hovered, setHovered] = useState(false)
    return (
        <Reveal direction={i % 2 === 0 ? 'left' : 'right'} delay={i * 80}>
            <Link to={`/project/${p.slug}`} style={{ ...s.card, display: 'block' }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}>
                <img src={p.img} alt={p.title} style={{ ...s.cardImg, filter: hovered ? 'grayscale(0%)' : 'grayscale(70%)', transform: hovered ? 'scale(1.06)' : 'scale(1)' }} />
                <div style={{ ...s.overlay, opacity: hovered ? 1 : 0 }}>
                    <p style={s.cardTitle}>{p.title}</p>
                    <p style={s.cardCat}>{p.cat}</p>
                </div>
            </Link>
        </Reveal>
    )
}

export default function Portfolio() {
    const [active, setActive] = useState('All')
    const filtered = active === 'All' ? PROJECTS : PROJECTS.filter(p => p.tag === active)

    return (
        <div style={s.page}>
            <div style={s.hero}>
                <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1800&q=90" alt="Portfolio" style={s.heroImg} />
                <div style={s.heroContent}>
                    <span style={s.heroLabel}>✦ &nbsp;Selected Works</span>
                    <h1 style={s.heroH1}>Our <em style={s.heroGold}>Portfolio</em><br />of Excellence</h1>
                </div>
            </div>

            <div style={s.section}>
                <Reveal direction="left">
                    <div style={s.filters}>
                        {FILTERS.map(f => (
                            <button key={f}
                                style={active === f ? s.filterBtnActive : s.filterBtn}
                                onClick={() => setActive(f)}>
                                {f}
                            </button>
                        ))}
                    </div>
                </Reveal>

                <div style={s.grid}>
                    {filtered.map((p, i) => (
                        <PortfolioCard key={p.title} p={p} i={i} />
                    ))}
                </div>
            </div>
        </div>
    )
}
