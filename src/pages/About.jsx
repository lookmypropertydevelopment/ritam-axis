import React, { useEffect, useRef, useState } from 'react'

function useReveal() {
    const ref = useRef(null)
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        const el = ref.current
        if (!el) return
        const obs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.12 })
        obs.observe(el)
        return () => obs.disconnect()
    }, [])
    return [ref, visible]
}

function Reveal({ children, direction = 'up', delay = 0, style = {} }) {
    const [ref, visible] = useReveal()
    const t = {
        up: visible ? 'translateY(0)' : 'translateY(48px)',
        left: visible ? 'translateX(0)' : 'translateX(-48px)',
        right: visible ? 'translateX(0)' : 'translateX(48px)'
    }
    return (
        <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: t[direction], transition: `opacity 0.8s ease ${delay}ms, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms`, ...style }}>
            {children}
        </div>
    )
}

const PROCESS = [
    { num: '01', title: 'Discover & Understand', desc: 'Understand house owners\u2019 lifestyle, preferences, budget, and spatial needs.' },
    { num: '02', title: 'Concept & Mood Board', desc: 'Develop a mood board that sets the theme, colour palette, and material choice to set the design tone.' },
    { num: '03', title: 'Design & Visualise', desc: 'Create Furniture Layouts, 3D Renders, and detailed drawings to visualise the space.' },
    { num: '04', title: 'Execute & Style', desc: 'Oversee installation, execution and add final styling touches for complete look.' },
]

const CORE_VALUES = [
    { title: 'Trustworthy', desc: 'We believe in building lasting relationships with our clients through transparency and reliability.' },
    { title: 'Customer Centric', desc: 'Structure, alignment, and execution with customer preferences in mind.' },
    { title: 'Precision in Every Detail', desc: 'Attention to detail all through design, build, execution, and handover.' },
    { title: 'Discipline in Execution', desc: 'Make right commitments, right communication, and responsible execution with core values in mind.' },
]

const s = {
    page: { background: '#050505', minHeight: '100vh', fontFamily: "'Inter', sans-serif", color: '#FAF9F6', paddingTop: '72px' },
    hero: { position: 'relative', height: '70vh', overflow: 'hidden', display: 'flex', alignItems: 'center' },
    heroImg: { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.35)' },
    heroContent: { position: 'relative', zIndex: 2, padding: '0 clamp(32px,8vw,120px)' },
    heroLabel: { fontSize: '11px', letterSpacing: '4px', color: '#D4AF37', textTransform: 'uppercase', marginBottom: '20px', display: 'block' },
    heroH1: { fontFamily: "'Playfair Display', serif", fontSize: 'clamp(40px,5vw,76px)', color: '#fff', fontWeight: 400, lineHeight: 1.1, margin: 0 },
    heroGold: { fontStyle: 'italic', backgroundImage: 'linear-gradient(135deg,#D4AF37,#e8c84a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
    section: { padding: '100px 40px', maxWidth: '1280px', margin: '0 auto' },
    label: { fontSize: '11px', letterSpacing: '4px', color: '#D4AF37', textTransform: 'uppercase', marginBottom: '16px' },
    h2: { fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px,4vw,52px)', fontWeight: 400, color: '#fff', margin: '0 0 48px' },
    divider: { borderTop: '1px solid rgba(255,255,255,0.05)' },
    gridPattern: { backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' },
    storyGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' },
    storyImg: { width: '100%', height: '500px', objectFit: 'cover', filter: 'grayscale(60%)' },
    storyP: { color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: 1.9, fontWeight: 300, marginBottom: '20px' },
    vmGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' },
    vmCard: { background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.06)', padding: '48px 44px' },
    vmLabel: { fontSize: '10px', letterSpacing: '4px', color: '#D4AF37', textTransform: 'uppercase', marginBottom: '20px', display: 'block' },
    vmH3: { fontFamily: "'Playfair Display', serif", fontSize: '28px', color: '#fff', fontWeight: 400, marginBottom: '24px' },
    vmP: { color: 'rgba(255,255,255,0.45)', fontSize: '15px', lineHeight: 1.85, fontWeight: 300, margin: 0 },
    valuesGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px', marginTop: '48px' },
    valueCard: { background: '#060606', padding: '48px 40px', borderLeft: '2px solid rgba(212,175,55,0.15)', position: 'relative', overflow: 'hidden', transition: 'all 0.5s', cursor: 'default' },
    valueNum: { position: 'absolute', right: '10px', bottom: '-20px', fontSize: '140px', fontFamily: "'Playfair Display', serif", color: 'rgba(255,255,255,0.02)', fontWeight: 700, lineHeight: 1, userSelect: 'none' },
    valueH4: { fontFamily: "'Playfair Display', serif", fontSize: '22px', color: '#fff', marginBottom: '16px', fontWeight: 400, position: 'relative', zIndex: 2 },
    valueP: { fontSize: '15px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.8, fontWeight: 300, position: 'relative', zIndex: 2, margin: 0 },
    whySplit: { display: 'flex', gap: '80px', alignItems: 'flex-start', flexWrap: 'wrap' },
    whyLeft: { flex: '1 1 320px', position: 'sticky', top: '120px' },
    whyRight: { flex: '2 1 500px' },
    processGrid: { display: 'grid', gridTemplateColumns: '1fr', gap: '32px', marginTop: '48px' },
    processCard: { display: 'flex', gap: '40px', alignItems: 'flex-start', background: '#0a0a0a', padding: '48px', border: '1px solid rgba(255,255,255,0.05)', transition: 'border-color 0.4s' },
    processNum: { fontFamily: "'Playfair Display', serif", fontSize: '48px', color: 'rgba(212,175,55,0.3)', lineHeight: 1, fontWeight: 700, flexShrink: 0 },
    processInfo: { flex: 1 },
    processTitle: { fontFamily: "'Playfair Display', serif", fontSize: '24px', color: '#fff', marginBottom: '16px', fontWeight: 400 },
    processDesc: { fontSize: '15px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.8, fontWeight: 300, margin: 0 },
}

export default function About() {
    return (
        <div style={s.page}>

            {/* ── HERO ── */}
            <div style={s.hero}>
                <img
                    src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1800&q=90"
                    alt="About Ritam Axis"
                    style={s.heroImg}
                />
                <div style={s.heroContent}>
                    <span style={s.heroLabel}>✦ &nbsp;Our Story</span>
                    <h1 style={s.heroH1}>
                        Designing Spaces<br />
                        with <em style={s.heroGold}>Precision</em>
                    </h1>
                </div>
            </div>

            {/* ── ABOUT US ── */}
            <div style={{ ...s.divider, ...s.gridPattern }}>
                <div style={s.section}>
                    <div style={s.storyGrid}>
                        <Reveal direction="left">
                            <img
                                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85"
                                alt="Ritam Axis Studio"
                                style={s.storyImg}
                            />
                        </Reveal>
                        <Reveal direction="right" delay={150}>
                            <p style={s.label}>About Us</p>
                            <h2 style={{ ...s.h2, fontSize: 'clamp(32px,4vw,50px)' }}>
                                Clarity to Precision,<br />
                                <em style={{ fontStyle: 'italic', color: '#D4AF37' }}>Aligned by Design</em>
                            </h2>
                            <p style={s.storyP}>
                                Ritam Axis is a design studio built on the belief that great interiors begin with clarity and end with precision. We create spaces that are thoughtfully aligned with the way you live — balancing aesthetics, functionality, and structure.
                            </p>
                            <p style={s.storyP}>
                                From concept to completion, our process is defined by discipline and detail. Every line, material, and element is carefully considered to deliver interiors that feel seamless, refined, and enduring.
                            </p>
                            <p style={s.storyP}>
                                At <strong style={{ color: '#fff' }}>Ritam Axis</strong>, we do not just design spaces — we align them with purpose and deliver with precision.
                            </p>
                        </Reveal>
                    </div>
                </div>
            </div>

            {/* ── VISION & MISSION ── */}
            <div style={{ background: '#030303', ...s.divider, ...s.gridPattern }}>
                <div style={s.section}>
                    <Reveal direction="up">
                        <p style={s.label}>What Drives Us</p>
                        <h2 style={{ ...s.h2, marginBottom: '56px' }}>Vision &amp; Mission</h2>
                    </Reveal>
                    <div style={s.vmGrid}>
                        <Reveal direction="left" delay={100}>
                            <div style={s.vmCard}>
                                <span style={s.vmLabel}>✦ &nbsp;Vision</span>
                                <h3 style={s.vmH3}>Structure Meets Soul</h3>
                                <p style={s.vmP}>
                                    At Ritam Axis, our vision is rooted in its name. &ldquo;Ritam&rdquo; stands for cosmic order, truth, and the natural rhythm that brings harmony to everything. &ldquo;Axis&rdquo; stands for the central line — the point of balance around which everything is aligned.
                                </p>
                                <p style={{ ...s.vmP, marginTop: '20px' }}>
                                    Together, they define our purpose. We create spaces that are not only beautiful, but perfectly balanced, deeply aligned, and inherently harmonious. We aim to set a new standard in interior design by crafting environments where structure meets soul — spaces that feel intuitive, purposeful, and timeless.
                                </p>
                            </div>
                        </Reveal>
                        <Reveal direction="right" delay={200}>
                            <div style={s.vmCard}>
                                <span style={s.vmLabel}>✦ &nbsp;Mission</span>
                                <h3 style={s.vmH3}>Harmony. Precision. Purpose.</h3>
                                <p style={s.vmP}>
                                    To bring the harmony of Ritam into every space, structured along an Axis of precision and purpose.
                                </p>
                                <p style={{ ...s.vmP, marginTop: '20px' }}>
                                    We design, align, and deliver interiors that are clear, functional, and timeless — crafted with attention to every detail.
                                </p>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>

            {/* ── CORE VALUES ── */}
            <div style={{ ...s.divider, ...s.gridPattern }}>
                <div style={s.section}>
                    <Reveal direction="up">
                        <p style={s.label}>What We Stand For</p>
                        <h2 style={s.h2}>Core Values</h2>
                        <p style={{ ...s.storyP, maxWidth: '700px', marginBottom: 0 }}>
                            Each project at Ritam Axis Design Studio is guided by our core values.
                        </p>
                    </Reveal>
                    <div style={s.valuesGrid}>
                        {CORE_VALUES.map((v, i) => (
                            <Reveal key={i} direction="up" delay={i * 100}>
                                <div
                                    style={s.valueCard}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.borderLeftColor = 'rgba(212,175,55,0.8)'
                                        e.currentTarget.style.background = '#0a0a0a'
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.borderLeftColor = 'rgba(212,175,55,0.15)'
                                        e.currentTarget.style.background = '#060606'
                                    }}
                                >
                                    <div style={s.valueNum}>0{i + 1}</div>
                                    <h4 style={s.valueH4}>{v.title}</h4>
                                    <p style={s.valueP}>{v.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── WHY RITAM AXIS ── */}
            <div style={{ background: '#030303', ...s.divider, ...s.gridPattern }}>
                <div style={s.section}>
                    <div style={s.whySplit}>
                        <div style={s.whyLeft}>
                            <Reveal direction="left">
                                <p style={s.label}>The Difference</p>
                                <h2 style={s.h2}>Why<br />Ritam Axis</h2>
                                <p style={s.storyP}>
                                    Over <strong style={{ color: '#D4AF37' }}>15+ years of Experience</strong>, trusted by many families living in gated, semi gated, and independent communities across Hyderabad and Secunderabad.
                                </p>
                                <p style={s.storyP}>
                                    Great designs are not accidental — it is aligned, precise, and purposeful. We create spaces that are clean, functional, and timeless, delivered through a process you can trust.
                                </p>
                            </Reveal>
                        </div>
                        <div style={s.whyRight}>
                            <Reveal direction="right" delay={150}>
                                <img
                                    src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=85"
                                    alt="Why Ritam Axis"
                                    style={{ width: '100%', height: '480px', objectFit: 'cover', filter: 'grayscale(50%)' }}
                                />
                            </Reveal>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── THE PROCESS ── */}
            <div style={{ ...s.divider, ...s.gridPattern }}>
                <div style={s.section}>
                    <Reveal direction="left">
                        <p style={s.label}>How We Work</p>
                        <h2 style={s.h2}>The Process</h2>
                        <p style={{ ...s.storyP, maxWidth: '800px' }}>
                            We follow a structured, disciplined process from the first conversation to the final handover — ensuring nothing is left to chance.
                        </p>
                    </Reveal>
                    <div style={s.processGrid}>
                        {PROCESS.map((p, i) => (
                            <Reveal key={i} direction="up" delay={i * 100}>
                                <div
                                    style={s.processCard}
                                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(212,175,55,0.35)'}
                                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'}
                                >
                                    <div style={s.processNum}>{p.num}</div>
                                    <div style={s.processInfo}>
                                        <h4 style={s.processTitle}>{p.title}</h4>
                                        <p style={s.processDesc}>{p.desc}</p>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}
