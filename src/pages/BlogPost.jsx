import React, { useEffect, useRef, useState } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import { POSTS } from '../data/posts'

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

const s = {
    page: { background: '#050505', minHeight: '100vh', fontFamily: "'Inter', sans-serif", color: '#FAF9F6', paddingTop: '72px' },
    hero: { position: 'relative', height: '60vh', overflow: 'hidden', display: 'flex', alignItems: 'flex-end', paddingBottom: '60px' },
    heroImg: { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.3)' },
    heroContent: { position: 'relative', zIndex: 2, padding: '0 clamp(32px,8vw,120px)', width: '100%', maxWidth: '1000px', margin: '0 auto' },
    backLink: { display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#D4AF37', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', textDecoration: 'none', marginBottom: '32px', transition: 'opacity 0.3s' },
    meta: { display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '24px' },
    heroCat: { fontSize: '11px', letterSpacing: '3px', color: '#D4AF37', textTransform: 'uppercase' },
    heroDate: { fontSize: '11px', color: 'rgba(255,255,255,0.4)' },
    heroH1: { fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px,5vw,64px)', color: '#fff', fontWeight: 400, lineHeight: 1.15, margin: 0 },
    article: { padding: '80px 40px', maxWidth: '800px', margin: '0 auto', fontSize: '18px', lineHeight: 1.8, color: 'rgba(255,255,255,0.7)', fontWeight: 300 },
    paragraph: { marginBottom: '32px' },
    relatedSection: { padding: '80px 40px', maxWidth: '1280px', margin: '0 auto', borderTop: '1px solid rgba(255,255,255,0.05)' },
    relatedTitle: { fontFamily: "'Playfair Display', serif", fontSize: '32px', marginBottom: '40px', color: '#fff' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' },
    card: { background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden', cursor: 'pointer', transition: 'border-color 0.3s', display: 'block', textDecoration: 'none' },
    cardImg: { width: '100%', height: '220px', objectFit: 'cover', filter: 'grayscale(60%)', transition: 'filter 0.5s, transform 0.5s', display: 'block' },
    cardBody: { padding: '28px 24px' },
    cardMeta: { display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' },
    cardTitle: { fontFamily: "'Playfair Display', serif", fontSize: '19px', color: '#fff', marginBottom: '0', fontWeight: 400, lineHeight: 1.3 },
}

function RelatedCard({ post }) {
    const [hovered, setHovered] = useState(false)
    return (
        <Link to={`/blog/${post.slug}`} style={{ ...s.card, borderColor: hovered ? 'rgba(212,175,55,0.3)' : 'rgba(255,255,255,0.05)' }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}>
            <img src={post.img} alt={post.title} style={{ ...s.cardImg, filter: hovered ? 'grayscale(0%)' : 'grayscale(60%)', transform: hovered ? 'scale(1.04)' : 'scale(1)' }} />
            <div style={s.cardBody}>
                <div style={s.cardMeta}>
                    <span style={s.heroCat}>{post.cat}</span>
                    <span style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
                    <span style={s.heroDate}>{post.date}</span>
                </div>
                <h3 style={s.cardTitle}>{post.title}</h3>
            </div>
        </Link>
    )
}

export default function BlogPost() {
    const { slug } = useParams()
    const post = POSTS.find(p => p.slug === slug)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [slug])

    if (!post) return <Navigate to="/blog" />

    const relatedPosts = POSTS.filter(p => p.slug !== slug).slice(0, 3)

    return (
        <div style={s.page}>
            <div style={s.hero}>
                <img src={post.img} alt={post.title} style={s.heroImg} />
                <div style={s.heroContent}>
                    <Reveal direction="up" delay={0}>
                        <Link to="/blog" style={s.backLink} onMouseEnter={e => e.currentTarget.style.opacity = 0.7} onMouseLeave={e => e.currentTarget.style.opacity = 1}>
                            ‹ &nbsp; Back to Journal
                        </Link>
                        <div style={s.meta}>
                            <span style={s.heroCat}>{post.cat}</span>
                            <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
                            <span style={s.heroDate}>{post.date}</span>
                        </div>
                        <h1 style={s.heroH1}>{post.title}</h1>
                    </Reveal>
                </div>
            </div>

            <div style={s.article}>
                {post.content && post.content.map((p, i) => (
                    <Reveal key={i} direction="up" delay={i * 80}>
                        <p style={s.paragraph}>{p}</p>
                    </Reveal>
                ))}
            </div>

            <div style={s.relatedSection}>
                <Reveal direction="up">
                    <h2 style={s.relatedTitle}>You Might Also Like</h2>
                    <div style={s.grid}>
                        {relatedPosts.map((relatedPost, i) => (
                            <Reveal key={relatedPost.slug} direction="up" delay={i * 100}>
                                <RelatedCard post={relatedPost} />
                            </Reveal>
                        ))}
                    </div>
                </Reveal>
            </div>
        </div>
    )
}
