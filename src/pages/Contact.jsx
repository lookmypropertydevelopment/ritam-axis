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

const s = {
    page: { background: '#050505', minHeight: '100vh', fontFamily: "'Inter', sans-serif", color: '#FAF9F6', paddingTop: '72px' },
    hero: { position: 'relative', height: '55vh', overflow: 'hidden', display: 'flex', alignItems: 'center' },
    heroImg: { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.3)' },
    heroContent: { position: 'relative', zIndex: 2, padding: '0 clamp(32px,8vw,120px)' },
    heroLabel: { fontSize: '11px', letterSpacing: '4px', color: '#D4AF37', textTransform: 'uppercase', marginBottom: '20px', display: 'block' },
    heroH1: { fontFamily: "'Playfair Display', serif", fontSize: 'clamp(40px,5vw,76px)', color: '#fff', fontWeight: 400, lineHeight: 1.1, margin: 0 },
    heroGold: { fontStyle: 'italic', backgroundImage: 'linear-gradient(135deg,#D4AF37,#e8c84a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
    section: { padding: '80px 40px', maxWidth: '1280px', margin: '0 auto' },
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start' },
    label: { fontSize: '11px', letterSpacing: '4px', color: '#D4AF37', textTransform: 'uppercase', marginBottom: '16px' },
    h2: { fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 400, color: '#fff', margin: '0 0 32px' },
    infoItem: { display: 'flex', gap: '16px', marginBottom: '28px', alignItems: 'flex-start' },
    infoIcon: { fontSize: '18px', color: '#D4AF37', marginTop: '2px', flexShrink: 0 },
    infoText: { fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, fontWeight: 300 },
    infoTitle: { fontSize: '11px', letterSpacing: '2px', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', marginBottom: '4px' },
    form: { display: 'flex', flexDirection: 'column', gap: '20px' },
    inputGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
    inputLabel: { fontSize: '10px', letterSpacing: '2px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' },
    input: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: '14px 16px', color: '#fff', fontSize: '14px', fontFamily: "'Inter', sans-serif", outline: 'none', transition: 'border-color 0.3s' },
    textarea: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: '14px 16px', color: '#fff', fontSize: '14px', fontFamily: "'Inter', sans-serif", outline: 'none', resize: 'vertical', minHeight: '140px', transition: 'border-color 0.3s' },
    submit: { padding: '16px 36px', background: '#D4AF37', color: '#000', border: 'none', fontSize: '11px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer', fontFamily: "'Inter', sans-serif", transition: 'background 0.3s', alignSelf: 'flex-start' },
    map: { width: '100%', height: '360px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '48px', position: 'relative', overflow: 'hidden' },
}

export default function Contact() {
    const [focused, setFocused] = useState(null)
    const [submitted, setSubmitted] = useState(false)
    const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
    }

    const inputStyle = (field) => ({
        ...s.input,
        borderColor: focused === field ? 'rgba(212,175,55,0.6)' : 'rgba(255,255,255,0.08)',
    })

    return (
        <div style={s.page}>
            <div style={s.hero}>
                <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=90" alt="Contact" style={s.heroImg} />
                <div style={s.heroContent}>
                    <span style={s.heroLabel}>✦ &nbsp;Get in Touch</span>
                    <h1 style={s.heroH1}>Let's Create<br /><em style={s.heroGold}>Together</em></h1>
                </div>
            </div>

            <div style={s.section}>
                <div style={s.grid}>
                    {/* LEFT: Info */}
                    <Reveal direction="left">
                        <div>
                            <p style={s.label}>Contact Information</p>
                            <h2 style={s.h2}>Start Your<br />Design Journey</h2>

                            <div style={s.infoItem}>
                                <span style={s.infoIcon}>📍</span>
                                <div>
                                    <p style={s.infoTitle}>Studio Address</p>
                                    <p style={s.infoText}>Madhapur, Hyderabad, Telangana — 500081</p>
                                </div>
                            </div>
                            <div style={s.infoItem}>
                                <span style={s.infoIcon}>📞</span>
                                <div>
                                    <p style={s.infoTitle}>Phone</p>
                                    <p style={s.infoText}>+91 98765 43210</p>
                                </div>
                            </div>
                            <div style={s.infoItem}>
                                <span style={s.infoIcon}>✉</span>
                                <div>
                                    <p style={s.infoTitle}>Email</p>
                                    <p style={s.infoText}>studio@ritamaxis.com</p>
                                </div>
                            </div>
                            <div style={s.infoItem}>
                                <span style={s.infoIcon}>🕐</span>
                                <div>
                                    <p style={s.infoTitle}>Studio Hours</p>
                                    <p style={s.infoText}>Mon – Sat: 9:00 AM – 7:00 PM</p>
                                </div>
                            </div>

                            {/* WhatsApp CTA */}
                            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
                                style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginTop: '12px', padding: '14px 28px', background: '#25D366', color: '#fff', fontSize: '11px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', textDecoration: 'none', fontFamily: "'Inter', sans-serif" }}>
                                <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326z" /></svg>
                                Chat on WhatsApp
                            </a>
                        </div>
                    </Reveal>

                    {/* RIGHT: Form */}
                    <Reveal direction="right" delay={150}>
                        {submitted ? (
                            <div style={{ textAlign: 'center', padding: '80px 40px', background: 'rgba(212,175,55,0.05)', border: '1px solid rgba(212,175,55,0.2)' }}>
                                <p style={{ fontSize: '40px', marginBottom: '20px' }}>✦</p>
                                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', color: '#fff', marginBottom: '12px', fontWeight: 400 }}>Thank You!</h3>
                                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', lineHeight: 1.7 }}>We'll be in touch within 24 hours to schedule your free consultation.</p>
                            </div>
                        ) : (
                            <form style={s.form} onSubmit={handleSubmit}>
                                <p style={s.label}>Send a Message</p>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                    <div style={s.inputGroup}>
                                        <label style={s.inputLabel}>Full Name *</label>
                                        <input required style={inputStyle('name')} value={form.name}
                                            onChange={e => setForm({ ...form, name: e.target.value })}
                                            onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
                                            placeholder="Your name" />
                                    </div>
                                    <div style={s.inputGroup}>
                                        <label style={s.inputLabel}>Email *</label>
                                        <input required type="email" style={inputStyle('email')} value={form.email}
                                            onChange={e => setForm({ ...form, email: e.target.value })}
                                            onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                                            placeholder="your@email.com" />
                                    </div>
                                </div>
                                <div style={s.inputGroup}>
                                    <label style={s.inputLabel}>Phone Number</label>
                                    <input style={inputStyle('phone')} value={form.phone}
                                        onChange={e => setForm({ ...form, phone: e.target.value })}
                                        onFocus={() => setFocused('phone')} onBlur={() => setFocused(null)}
                                        placeholder="+91 XXXXX XXXXX" />
                                </div>
                                <div style={s.inputGroup}>
                                    <label style={s.inputLabel}>Service Interested In</label>
                                    <select style={{ ...inputStyle('service'), background: '#0a0a0a' }} value={form.service}
                                        onChange={e => setForm({ ...form, service: e.target.value })}
                                        onFocus={() => setFocused('service')} onBlur={() => setFocused(null)}>
                                        <option value="">Select a service...</option>
                                        <option>Living Spaces</option>
                                        <option>Culinary Havens</option>
                                        <option>Private Retreats</option>
                                        <option>Turnkey Solution</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div style={s.inputGroup}>
                                    <label style={s.inputLabel}>Your Message *</label>
                                    <textarea required style={{ ...s.textarea, borderColor: focused === 'message' ? 'rgba(212,175,55,0.6)' : 'rgba(255,255,255,0.08)' }}
                                        value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                                        onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
                                        placeholder="Tell us about your project, space, and vision..." />
                                </div>
                                <button type="submit" style={s.submit}
                                    onMouseEnter={e => e.currentTarget.style.background = '#c8a22e'}
                                    onMouseLeave={e => e.currentTarget.style.background = '#D4AF37'}>
                                    Send Message ↗
                                </button>
                            </form>
                        )}
                    </Reveal>
                </div>
            </div>
        </div>
    )
}
