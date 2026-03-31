import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const QuotePopup = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            // Reset form when closed
            setFormData({ name: '', email: '', phone: '', service: '', message: '' });
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Mock submission
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            setTimeout(() => {
                setIsSuccess(false);
                onClose();
                setFormData({ name: '', email: '', phone: '', service: '', message: '' });
            }, 3000);
        }, 1500);
    };

    if (!isOpen) return null;

    const SERVICES_LIST = [
        "Space planning & interior design",
        "Modular kitchen & wardrobe solutions",
        "Custom furniture & carpentry work",
        "Electrical & lighting execution",
        "False ceiling & wall treatments",
        "Flooring & civil modifications",
        "Painting, finishes & textures",
        "Material sourcing & quality checks",
        "Complete project execution & handover"
    ];

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button style={styles.closeBtn} onClick={onClose}>
                    <X size={20} />
                </button>

                {!isSuccess ? (
                    <>
                        <div style={styles.header}>
                            <p style={styles.label}>Get in Touch</p>
                            <h2 style={styles.title}>Request a <span style={styles.gold}>Free Quote</span></h2>
                        </div>

                        <form onSubmit={handleSubmit} style={styles.form}>
                            <div style={styles.inputGroup}>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    required
                                    style={styles.input}
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div style={styles.row}>
                                <div style={{ ...styles.inputGroup, flex: 1 }}>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                        required
                                        style={styles.input}
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div style={{ ...styles.inputGroup, flex: 1 }}>
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Phone Number"
                                        required
                                        style={styles.input}
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div style={styles.inputGroup}>
                                <select
                                    name="service"
                                    required
                                    style={styles.select}
                                    value={formData.service}
                                    onChange={handleChange}
                                >
                                    <option value="" disabled style={styles.option}>Select Services</option>
                                    {SERVICES_LIST.map((service, idx) => (
                                        <option key={idx} value={service} style={styles.option}>{service}</option>
                                    ))}
                                </select>
                            </div>

                            <div style={styles.inputGroup}>
                                <textarea
                                    name="message"
                                    placeholder="Your Message (Optional)"
                                    rows="4"
                                    style={styles.textarea}
                                    value={formData.message}
                                    onChange={handleChange}
                                />
                            </div>

                            <button type="submit" disabled={isSubmitting} style={styles.submitBtn}>
                                {isSubmitting ? 'Sending...' : 'Get My Quote'}
                            </button>
                        </form>
                    </>
                ) : (
                    <div style={styles.successMessage}>
                        <div style={styles.successIcon}>✓</div>
                        <h3 style={styles.successTitle}>Thank You!</h3>
                        <p style={styles.successText}>Our team will contact you shortly to discuss your vision.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(10px)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
    },
    modal: {
        background: '#0a0a0a',
        border: '1px solid rgba(212, 175, 55, 0.2)',
        padding: '48px',
        width: '100%',
        maxWidth: '560px',
        position: 'relative',
        boxShadow: '0 24px 64px rgba(0, 0, 0, 0.6)',
    },
    closeBtn: {
        position: 'absolute',
        top: '24px',
        right: '24px',
        background: 'none',
        border: 'none',
        color: 'rgba(255, 255, 255, 0.5)',
        cursor: 'pointer',
        transition: 'color 0.3s',
    },
    header: {
        marginBottom: '32px',
        textAlign: 'center',
    },
    label: {
        fontSize: '11px',
        letterSpacing: '4px',
        color: '#D4AF37',
        textTransform: 'uppercase',
        marginBottom: '12px',
    },
    title: {
        fontFamily: "'Playfair Display', serif",
        fontSize: '32px',
        color: '#fff',
        fontWeight: 400,
        margin: 0,
    },
    gold: {
        color: '#D4AF37',
        fontStyle: 'italic',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    row: {
        display: 'flex',
        gap: '20px',
    },
    inputGroup: {
        width: '100%',
    },
    input: {
        width: '100%',
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '14px 18px',
        color: '#fff',
        fontSize: '14px',
        fontFamily: "'Inter', sans-serif",
        outline: 'none',
        transition: 'border-color 0.3s',
        boxSizing: 'border-box',
    },
    select: {
        width: '100%',
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '14px 18px',
        color: '#fff',
        fontSize: '14px',
        fontFamily: "'Inter', sans-serif",
        outline: 'none',
        cursor: 'pointer',
        boxSizing: 'border-box',
        appearance: 'none',
    },
    option: {
        background: '#0a0a0a',
        color: '#fff',
    },
    textarea: {
        width: '100%',
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '14px 18px',
        color: '#fff',
        fontSize: '14px',
        fontFamily: "'Inter', sans-serif",
        outline: 'none',
        resize: 'none',
        boxSizing: 'border-box',
    },
    submitBtn: {
        background: '#D4AF37',
        color: '#000',
        border: 'none',
        padding: '16px',
        fontSize: '11px',
        fontWeight: 700,
        letterSpacing: '2px',
        textTransform: 'uppercase',
        cursor: 'pointer',
        transition: 'all 0.3s',
        marginTop: '12px',
        fontFamily: "'Inter', sans-serif",
    },
    successMessage: {
        textAlign: 'center',
        padding: '40px 0',
    },
    successIcon: {
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        background: 'rgba(212, 175, 55, 0.1)',
        border: '1px solid #D4AF37',
        color: '#D4AF37',
        fontSize: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 24px',
    },
    successTitle: {
        fontFamily: "'Playfair Display', serif",
        fontSize: '28px',
        color: '#fff',
        marginBottom: '12px',
    },
    successText: {
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: '14px',
        lineHeight: 1.6,
    },
};

export default QuotePopup;
