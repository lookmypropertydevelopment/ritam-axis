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
    const t = { up: visible ? 'translateY(0)' : 'translateY(48px)', left: visible ? 'translateX(0)' : 'translateX(-48px)', right: visible ? 'translateX(0)' : 'translateX(48px)' }
    return (
        <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: t[direction], transition: `opacity 1.4s ease ${delay}ms, transform 1.4s cubic-bezier(0.22,1,0.36,1) ${delay}ms`, ...style }}>
            {children}
        </div>
    )
}

const PROCESS = [
    { num: '01', title: 'Discovery & Agreement', desc: 'We listen to your lifestyle and expectations. Work begins only after a transparent agreement and alignment, so there are no surprises.' },
    { num: '02', title: 'Concept Development', desc: 'Mood boards, layouts, and design directions created around your culture, taste, and vision.' },
    { num: '03', title: 'Design Finalization', desc: 'Detailed drawings, material choices, and schedules prepared for flawless execution.' },
    { num: '04', title: 'Execution & Manufacturing', desc: 'Precision craftsmanship, premium materials, and strict site supervision ensure top-class quality.' },
    { num: '05', title: 'Styling & Handover', desc: 'Final styling, finishing touches, and checks to make your home feel truly complete.' },
]

const WHY_US = [
    { title: 'Personalization', desc: 'We don’t just do your interiors. We bring Vibes into your homes. Personalized interiors that is thoughtfully planned and mindfully executed. Interior design, for us, is not a transaction. It is a commitment.' },
    { title: 'Trust and Transparency', desc: 'Transparent communication, and delivering what we promise. Our process is collaborative, professional, and designed to inspire confidence.' },
    { title: 'Stress Free Experience', desc: 'With Ritam Axis, you don’t manage the project — you enjoy the transformation. We take care of the planning, coordination, and execution so you can experience design without stress, delays, or confusion.' },
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
    storyGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' },
    storyImg: { width: '100%', height: '500px', objectFit: 'cover', filter: 'grayscale(60%)' },
    storyP: { color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: 1.9, fontWeight: 300, marginBottom: '20px' },
    whySplit: { display: 'flex', gap: '80px', alignItems: 'flex-start', flexWrap: 'wrap' },
    whyLeft: { flex: '1 1 300px', position: 'sticky', top: '120px' },
    whyRight: { flex: '2 1 500px', display: 'flex', flexDirection: 'column', gap: '32px' },
    whyItem: { background: '#060606', padding: '56px 48px', borderLeft: '2px solid rgba(212,175,55,0.1)', position: 'relative', overflow: 'hidden', transition: 'all 0.5s', cursor: 'default' },
    whyNum: { position: 'absolute', right: '10px', bottom: '-20px', fontSize: '180px', fontFamily: "'Playfair Display', serif", color: 'rgba(255,255,255,0.02)', fontWeight: 700, lineHeight: 1, userSelect: 'none', transition: 'all 0.5s' },
    valueH4: { fontFamily: "'Playfair Display', serif", fontSize: '24px', color: '#fff', marginBottom: '20px', fontWeight: 400, position: 'relative', zIndex: 2 },
    valueP: { fontSize: '16px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.8, fontWeight: 300, position: 'relative', zIndex: 2 },
    processGrid: { display: 'grid', gridTemplateColumns: '1fr', gap: '32px', marginTop: '48px' },
    processCard: { display: 'flex', gap: '40px', alignItems: 'flex-start', background: '#0a0a0a', padding: '48px', border: '1px solid rgba(255,255,255,0.05)' },
    processNum: { fontFamily: "'Playfair Display', serif", fontSize: '48px', color: 'rgba(212,175,55,0.3)', lineHeight: 1, fontWeight: 700 },
    processInfo: { flex: 1 },
    processTitle: { fontFamily: "'Playfair Display', serif", fontSize: '24px', color: '#fff', marginBottom: '16px', fontWeight: 400 },
    processDesc: { fontSize: '15px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.8, fontWeight: 300 },
}

export default function About() {
    return (
        <div style={s.page}>
            {/* HERO */}
            <div style={s.hero}>
                <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1800&q=90" alt="About" style={s.heroImg} />
                <div style={s.heroContent}>
                    <span style={s.heroLabel}>✦ &nbsp;Our Story</span>
                    <h1 style={s.heroH1}>Designing Spaces<br />with <em style={s.heroGold}>Purpose</em></h1>
                </div>
            </div>

            {/* STORY */}
            <div style={{ ...s.divider, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' }}>
                <div style={s.section}>
                    <div style={s.storyGrid}>
                        <Reveal direction="left">
                            <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85" alt="Studio" style={s.storyImg} />
                        </Reveal>
                        <Reveal direction="right" delay={150}>
                            <p style={s.label}>Ritam Axis</p>
                            <h2 style={{ ...s.h2, fontSize: 'clamp(36px, 4vw, 56px)' }}>"Amplifies your Vibes"</h2>
                            <p style={s.storyP}>Vibes define us. They shape our mood, our mindset, and our way of living. Each of us carries a vibe—and home is where it speaks the loudest.</p>
                            <p style={s.storyP}>Thoughtfully designed interiors don’t just showcase your vibe, they amplify it.</p>
                            <p style={s.storyP}>At <strong>Ritam Axis</strong>, we blend rooted designs, smart engineering, and creative thinking to help you discover and realize your vibe through our complete turnkey interior solutions.</p>
                        </Reveal>
                    </div>
                </div>
            </div>

            {/* PROCESS */}
            <div style={{ background: '#030303', ...s.divider, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' }}>
                <div style={s.section}>
                    <Reveal direction="left">
                        <p style={s.label}>How We Work</p>
                        <h2 style={s.h2}>Our Process</h2>
                        <p style={{ ...s.storyP, maxWidth: '800px' }}>We follow a structured process that is trusted and proven. If you value our philosophy and respect our process, we can create the best turnkey interiors for your lifestyle. Our process includes the following five stages.</p>
                    </Reveal>
                    <div style={s.processGrid}>
                        {PROCESS.map((p, i) => (
                            <Reveal key={i} direction="up" delay={i * 100}>
                                <div style={s.processCard} onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(212,175,55,0.35)'} onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'}>
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

            {/* WHY CHOOSE US - NEW LAYOUT */}
            <div style={{ ...s.divider, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' }}>
                <div style={s.section}>
                    <div style={s.whySplit}>
                        <div style={s.whyLeft}>
                            <Reveal direction="left">
                                <p style={s.label}>The Difference</p>
                                <h2 style={s.h2}>Why Choose<br />Ritam Axis</h2>
                                <p style={s.storyP}>We bring a highly personalized and transparent approach to interior design, ensuring peace of mind from discovery to handover.</p>
                            </Reveal>
                        </div>
                        <div style={s.whyRight}>
                            {WHY_US.map((w, i) => (
                                <Reveal key={i} direction="up" delay={i * 150}>
                                    <div style={s.whyItem}
                                        onMouseEnter={e => {
                                            e.currentTarget.style.borderLeftColor = 'rgba(212,175,55,0.8)'
                                            e.currentTarget.style.background = '#0a0a0a'
                                            e.currentTarget.querySelector('.why-num').style.color = 'rgba(212,175,55,0.05)'
                                            e.currentTarget.querySelector('.why-num').style.transform = 'scale(1.05)'
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.borderLeftColor = 'rgba(212,175,55,0.1)'
                                            e.currentTarget.style.background = '#060606'
                                            e.currentTarget.querySelector('.why-num').style.color = 'rgba(255,255,255,0.02)'
                                            e.currentTarget.querySelector('.why-num').style.transform = 'scale(1)'
                                        }}>
                                        <div className="why-num" style={s.whyNum}>0{i + 1}</div>
                                        <h4 style={s.valueH4}>{w.title}</h4>
                                        <p style={s.valueP}>{w.desc}</p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
