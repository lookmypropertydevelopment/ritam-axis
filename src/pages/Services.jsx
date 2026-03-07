import React, { useEffect, useRef, useState } from 'react'

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
        <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: t[direction], transition: `opacity 1.4s ease ${delay}ms, transform 1.4s cubic-bezier(0.22,1,0.36,1) ${delay}ms`, ...style }}>
            {children}
        </div>
    )
}

const SERVICES = [
    {
        num: '01',
        title: 'Living Spaces',
        desc: 'Premium lounges, family rooms, and foyer designs crafted to carefully mirror your lifestyle and impress your guests.',
        img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
        bullets: ['Custom Furniture Design', 'Lighting Curation', 'Art & Decor Placement']
    },
    {
        num: '02',
        title: 'Culinary Havens',
        desc: 'High-end modular kitchens where smart ergonomics naturally meet sleek, timeless aesthetics.',
        img: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=85',
        bullets: ['Premium Countertops', 'Smart Storage Solutions', 'High-End Appliances Integration']
    },
    {
        num: '03',
        title: 'Private Retreats',
        desc: 'Luxurious master suites, opulent walk-in closets, and spa-inspired bathrooms for ultimate relaxation.',
        img: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=85',
        bullets: ['Bespoke Wardrobes', 'Ambient Lighting', 'Textural Depth & Comfort']
    },
    {
        num: '04',
        title: 'Turnkey Solution',
        desc: 'End-to-end interior architecture from conceptualization to execution, ensuring a completely seamless handover.',
        img: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=1200&q=85',
        bullets: ['Architecture & Civil', 'Project Management', 'Final Styling & Handover']
    },
]

const s = {
    page: { background: '#050505', minHeight: '100vh', fontFamily: "'Inter', sans-serif", color: '#FAF9F6', paddingTop: '72px' },
    hero: { position: 'relative', height: '60vh', overflow: 'hidden', display: 'flex', alignItems: 'center' },
    heroImg: { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.3)' },
    heroContent: { position: 'relative', zIndex: 2, padding: '0 clamp(32px,8vw,120px)' },
    heroLabel: { fontSize: '11px', letterSpacing: '4px', color: '#D4AF37', textTransform: 'uppercase', marginBottom: '20px', display: 'block' },
    heroH1: { fontFamily: "'Playfair Display', serif", fontSize: 'clamp(40px,5vw,76px)', color: '#fff', fontWeight: 400, lineHeight: 1.1, margin: 0 },
    heroGold: { fontStyle: 'italic', backgroundImage: 'linear-gradient(135deg,#D4AF37,#e8c84a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
    section: { padding: '100px 40px', maxWidth: '1280px', margin: '0 auto' },
    serviceRow: { display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 1.2fr', gap: '80px', alignItems: 'center', marginBottom: '120px' },
    serviceRowReverse: { display: 'grid', gridTemplateColumns: '1.2fr minmax(300px, 1fr)', gap: '80px', alignItems: 'center', marginBottom: '120px' },
    imgWrapper: { position: 'relative', width: '100%', height: '480px', overflow: 'hidden' },
    img: { width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(30%)', transition: 'filter 0.6s, transform 0.6s' },
    num: { fontFamily: "'Playfair Display', serif", fontSize: '80px', color: 'rgba(212,175,55,0.1)', fontWeight: 700, lineHeight: 0.8, marginBottom: '20px' },
    h2: { fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px,3.5vw,48px)', fontWeight: 400, color: '#fff', margin: '0 0 24px' },
    desc: { color: 'rgba(255,255,255,0.5)', fontSize: '15px', lineHeight: 1.8, fontWeight: 300, marginBottom: '32px' },
    bulletList: { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' },
    bullet: { display: 'flex', alignItems: 'center', gap: '12px', color: 'rgba(255,255,255,0.8)', fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 300 },
    bulletDot: { width: '4px', height: '4px', background: '#D4AF37', borderRadius: '50%' },
}

export default function Services() {
    return (
        <div style={s.page}>
            <div style={s.hero}>
                <img src="https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=1800&q=90" alt="Services" style={s.heroImg} />
                <div style={s.heroContent}>
                    <span style={s.heroLabel}>✦ &nbsp;Our Expertise</span>
                    <h1 style={s.heroH1}>Bespoke <em style={s.heroGold}>Design</em><br />Solutions</h1>
                </div>
            </div>

            <div style={s.section}>
                {SERVICES.map((srv, i) => {
                    const isReverse = i % 2 !== 0
                    return (
                        <div key={srv.num} style={isReverse ? s.serviceRowReverse : s.serviceRow}>
                            {isReverse ? (
                                <>
                                    <Reveal direction="left" delay={0}>
                                        <div style={s.imgWrapper}
                                            onMouseEnter={e => { e.currentTarget.querySelector('img').style.filter = 'grayscale(0%)'; e.currentTarget.querySelector('img').style.transform = 'scale(1.05)' }}
                                            onMouseLeave={e => { e.currentTarget.querySelector('img').style.filter = 'grayscale(30%)'; e.currentTarget.querySelector('img').style.transform = 'scale(1)' }}>
                                            <img src={srv.img} alt={srv.title} style={s.img} />
                                        </div>
                                    </Reveal>
                                    <Reveal direction="right" delay={150}>
                                        <div style={s.num}>{srv.num}</div>
                                        <h2 style={s.h2}>{srv.title}</h2>
                                        <p style={s.desc}>{srv.desc}</p>
                                        <ul style={s.bulletList}>
                                            {srv.bullets.map(b => (
                                                <li key={b} style={s.bullet}><span style={s.bulletDot}></span> {b}</li>
                                            ))}
                                        </ul>
                                    </Reveal>
                                </>
                            ) : (
                                <>
                                    <Reveal direction="left" delay={150}>
                                        <div style={s.num}>{srv.num}</div>
                                        <h2 style={s.h2}>{srv.title}</h2>
                                        <p style={s.desc}>{srv.desc}</p>
                                        <ul style={s.bulletList}>
                                            {srv.bullets.map(b => (
                                                <li key={b} style={s.bullet}><span style={s.bulletDot}></span> {b}</li>
                                            ))}
                                        </ul>
                                    </Reveal>
                                    <Reveal direction="right" delay={0}>
                                        <div style={s.imgWrapper}
                                            onMouseEnter={e => { e.currentTarget.querySelector('img').style.filter = 'grayscale(0%)'; e.currentTarget.querySelector('img').style.transform = 'scale(1.05)' }}
                                            onMouseLeave={e => { e.currentTarget.querySelector('img').style.filter = 'grayscale(30%)'; e.currentTarget.querySelector('img').style.transform = 'scale(1)' }}>
                                            <img src={srv.img} alt={srv.title} style={s.img} />
                                        </div>
                                    </Reveal>
                                </>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
