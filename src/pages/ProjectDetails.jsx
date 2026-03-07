import React, { useEffect, useRef, useState } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
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
        <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: t[direction], transition: `opacity 1.4s ease ${delay}ms, transform 1.4s cubic-bezier(0.22,1,0.36,1) ${delay}ms`, ...style }}>
            {children}
        </div>
    )
}

const s = {
    page: { background: '#050505', minHeight: '100vh', fontFamily: "'Inter', sans-serif", color: '#FAF9F6', paddingTop: '72px' },
    hero: { position: 'relative', height: '60vh', overflow: 'hidden', display: 'flex', alignItems: 'flex-end', paddingBottom: '60px' },
    heroImg: { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.4)' },
    heroContent: { position: 'relative', zIndex: 2, padding: '0 clamp(32px,8vw,120px)', width: '100%' },
    backLink: { display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#D4AF37', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', textDecoration: 'none', marginBottom: '32px', transition: 'opacity 0.3s' },
    heroCat: { fontSize: '11px', letterSpacing: '4px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: '16px', display: 'block' },
    heroH1: { fontFamily: "'Playfair Display', serif", fontSize: 'clamp(40px,5vw,76px)', color: '#fff', fontWeight: 400, lineHeight: 1.1, margin: 0 },
    section: { padding: '100px 40px', maxWidth: '1000px', margin: '0 auto' },
    descHeader: { display: 'flex', gap: '60px', alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: '80px' },
    descLabel: { fontSize: '11px', letterSpacing: '4px', color: '#D4AF37', textTransform: 'uppercase', flexShrink: 0, width: '160px' },
    descText: { fontSize: '20px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, fontWeight: 300, flex: 1, minWidth: '300px', fontFamily: "'Playfair Display', serif" },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' },
    galleryItem: { position: 'relative', overflow: 'hidden', cursor: 'pointer', height: '400px', borderRadius: '4px' },
    galleryImg: { width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'grayscale(50%)', transition: 'transform 0.8s cubic-bezier(0.2, 1, 0.2, 1), filter 0.8s' },
    videoSection: { marginTop: '100px', background: '#0a0a0a', padding: '60px', border: '1px solid rgba(255,255,255,0.05)' },
    videoTitle: { fontFamily: "'Playfair Display', serif", fontSize: '32px', marginBottom: '32px', textAlign: 'center' },
    videoWrapper: { width: '100%', background: '#000', display: 'flex', justifyContent: 'center', borderRadius: '4px', overflow: 'hidden' },

    /* Lightbox Styles */
    lbOverlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(16px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' },
    lbClose: { position: 'absolute', top: '32px', right: '32px', background: 'none', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', width: '48px', height: '48px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', transition: 'all 0.3s' },
    lbArrow: { position: 'absolute', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', width: '64px', height: '64px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', transition: 'all 0.3s', userSelect: 'none' },
    lbImg: { maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', boxShadow: '0 32px 64px rgba(0,0,0,0.5)', borderRadius: '4px', animation: 'lbFade 0.6s cubic-bezier(0.2, 1, 0.2, 1)' },
    lbCounter: { position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.5)', fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase' },
}

export default function ProjectDetails() {
    const { slug } = useParams()
    const project = PROJECTS.find(p => p.slug === slug)
    const [selectedIdx, setSelectedIdx] = useState(null)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [slug])

    useEffect(() => {
        const handleKeys = (e) => {
            if (selectedIdx === null) return
            if (e.key === 'Escape') setSelectedIdx(null)
            if (e.key === 'ArrowRight') setSelectedIdx(prev => (prev + 1) % project.gallery.length)
            if (e.key === 'ArrowLeft') setSelectedIdx(prev => (prev - 1 + project.gallery.length) % project.gallery.length)
        }
        window.addEventListener('keydown', handleKeys)
        if (selectedIdx !== null) document.body.style.overflow = 'hidden'
        else document.body.style.overflow = 'auto'
        return () => {
            window.removeEventListener('keydown', handleKeys)
            document.body.style.overflow = 'auto'
        }
    }, [selectedIdx, project])

    if (!project) return <Navigate to="/portfolio" />

    const nextIdx = () => setSelectedIdx(prev => (prev + 1) % project.gallery.length)
    const prevIdx = () => setSelectedIdx(prev => (prev - 1 + project.gallery.length) % project.gallery.length)

    return (
        <div style={s.page}>
            <style>{`
                @keyframes lbFade { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
            `}</style>

            <div style={s.hero}>
                <img src={project.img} alt={project.title} style={s.heroImg} />
                <div style={s.heroContent}>
                    <Reveal direction="up" delay={0}>
                        <Link to="/portfolio" style={s.backLink} onMouseEnter={e => e.currentTarget.style.opacity = 0.7} onMouseLeave={e => e.currentTarget.style.opacity = 1}>
                            ‹ &nbsp; Back to Portfolio
                        </Link>
                        <span style={s.heroCat}>{project.cat}</span>
                        <h1 style={s.heroH1}>{project.title}</h1>
                    </Reveal>
                </div>
            </div>

            <div style={s.section}>
                <Reveal direction="up">
                    <div style={s.descHeader}>
                        <div style={s.descLabel}>Project Overview</div>
                        <div style={s.descText}>{project.desc}</div>
                    </div>
                </Reveal>

                <Reveal direction="up" delay={200}>
                    <div style={{ marginBottom: '40px' }}>
                        <span style={s.descLabel}>Gallery</span>
                    </div>
                    <div style={s.grid}>
                        {project.gallery && project.gallery.map((imgUrl, i) => (
                            <Reveal key={i} direction="up" delay={i * 120}>
                                <div style={s.galleryItem}
                                    onClick={() => setSelectedIdx(i)}
                                    onMouseEnter={e => { e.currentTarget.firstChild.style.transform = 'scale(1.08)'; e.currentTarget.firstChild.style.filter = 'grayscale(0%)' }}
                                    onMouseLeave={e => { e.currentTarget.firstChild.style.transform = 'scale(1)'; e.currentTarget.firstChild.style.filter = 'grayscale(50%)' }}>
                                    <img src={imgUrl} alt={`${project.title} Gallery ${i + 1}`} style={s.galleryImg} />
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </Reveal>

                {project.videos && project.videos.length > 0 && (
                    <Reveal direction="up" delay={100}>
                        <div style={{ marginBottom: '40px', marginTop: '100px' }}>
                            <span style={s.descLabel}>Videos</span>
                        </div>
                        <div style={s.grid}>
                            {project.videos.map((vidUrl, i) => (
                                <Reveal key={i} direction="up" delay={i * 120}>
                                    <div style={{ ...s.galleryItem, background: '#000', cursor: 'default' }}>
                                        <video src={vidUrl} controls autoPlay muted loop style={{ ...s.galleryImg, filter: 'none' }} />
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </Reveal>
                )}
            </div>

            {/* Lightbox Overlay */}
            {selectedIdx !== null && (
                <div style={s.lbOverlay} onClick={() => setSelectedIdx(null)}>
                    <button style={s.lbClose} onClick={(e) => { e.stopPropagation(); setSelectedIdx(null); }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = '#fff' }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)' }}>
                        ✕
                    </button>

                    <button style={{ ...s.lbArrow, left: '32px' }} onClick={(e) => { e.stopPropagation(); prevIdx(); }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = '#fff' }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}>
                        ‹
                    </button>

                    <img key={selectedIdx} src={project.gallery[selectedIdx]} alt="Lightbox View" style={s.lbImg} onClick={(e) => e.stopPropagation()} />

                    <button style={{ ...s.lbArrow, right: '32px' }} onClick={(e) => { e.stopPropagation(); nextIdx(); }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = '#fff' }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}>
                        ›
                    </button>

                    <div style={s.lbCounter}>
                        {selectedIdx + 1} / {project.gallery.length}
                    </div>
                </div>
            )}
        </div>
    )
}
