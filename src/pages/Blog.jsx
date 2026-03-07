import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
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

import { POSTS } from '../data/posts'


const s = {
    page: { background: '#050505', minHeight: '100vh', fontFamily: "'Inter', sans-serif", color: '#FAF9F6', paddingTop: '72px' },
    hero: { position: 'relative', height: '55vh', overflow: 'hidden', display: 'flex', alignItems: 'center' },
    heroImg: { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.3)' },
    heroContent: { position: 'relative', zIndex: 2, padding: '0 clamp(32px,8vw,120px)' },
    heroLabel: { fontSize: '11px', letterSpacing: '4px', color: '#D4AF37', textTransform: 'uppercase', marginBottom: '20px', display: 'block' },
    heroH1: { fontFamily: "'Playfair Display', serif", fontSize: 'clamp(40px,5vw,76px)', color: '#fff', fontWeight: 400, lineHeight: 1.1, margin: 0 },
    heroGold: { fontStyle: 'italic', backgroundImage: 'linear-gradient(135deg,#D4AF37,#e8c84a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
    section: { padding: '80px 40px', maxWidth: '1280px', margin: '0 auto' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px' },
    card: { background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden', cursor: 'pointer', transition: 'border-color 0.3s' },
    cardImg: { width: '100%', height: '220px', objectFit: 'cover', filter: 'grayscale(60%)', transition: 'filter 0.5s, transform 0.5s', display: 'block' },
    cardBody: { padding: '28px 24px' },
    cardMeta: { display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' },
    cardCat: { fontSize: '9px', letterSpacing: '3px', color: '#D4AF37', textTransform: 'uppercase' },
    cardDate: { fontSize: '11px', color: 'rgba(255,255,255,0.25)' },
    cardTitle: { fontFamily: "'Playfair Display', serif", fontSize: '19px', color: '#fff', marginBottom: '12px', fontWeight: 400, lineHeight: 1.3 },
    cardExcerpt: { fontSize: '13px', color: 'rgba(255,255,255,0.38)', lineHeight: 1.7, fontWeight: 300 },
    readMore: { display: 'inline-block', marginTop: '20px', fontSize: '10px', letterSpacing: '3px', color: '#D4AF37', textTransform: 'uppercase', textDecoration: 'none' },
}

function BlogCard({ post, index }) {
    const [hovered, setHovered] = useState(false)
    return (
        <Reveal direction={index % 2 === 0 ? 'left' : 'right'} delay={index * 80}>
            <Link to={`/blog/${post.slug}`} style={{ ...s.card, display: 'block', textDecoration: 'none', borderColor: hovered ? 'rgba(212,175,55,0.3)' : 'rgba(255,255,255,0.05)' }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}>
                <img src={post.img} alt={post.title} style={{ ...s.cardImg, filter: hovered ? 'grayscale(0%)' : 'grayscale(60%)', transform: hovered ? 'scale(1.04)' : 'scale(1)' }} />
                <div style={s.cardBody}>
                    <div style={s.cardMeta}>
                        <span style={s.cardCat}>{post.cat}</span>
                        <span style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
                        <span style={s.cardDate}>{post.date}</span>
                    </div>
                    <h3 style={s.cardTitle}>{post.title}</h3>
                    <p style={s.cardExcerpt}>{post.excerpt}</p>
                    <span style={s.readMore}>Read More →</span>
                </div>
            </Link>
        </Reveal>
    )
}

export default function Blog() {
    return (
        <div style={s.page}>
            <div style={s.hero}>
                <img src="https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=1800&q=90" alt="Blog" style={s.heroImg} />
                <div style={s.heroContent}>
                    <span style={s.heroLabel}>✦ &nbsp;Insights & Ideas</span>
                    <h1 style={s.heroH1}>The Design <em style={s.heroGold}>Journal</em></h1>
                </div>
            </div>
            <div style={s.section}>
                <div style={s.grid}>
                    {POSTS.map((post, i) => <BlogCard key={i} post={post} index={i} />)}
                </div>
            </div>
        </div>
    )
}
