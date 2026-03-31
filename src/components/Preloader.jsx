import React, { useEffect, useState } from 'react';

const Preloader = () => {
    const [show, setShow] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);
    const [count, setCount] = useState(0);

    const START_Y = 220;
    const END_Y = 40;

    useEffect(() => {
        let c = 0;
        const timer = setInterval(() => {
            c++;
            setCount(c);

            if (c >= 100) {
                clearInterval(timer);
                setTimeout(() => {
                    setFadeOut(true);
                    setTimeout(() => setShow(false), 700);
                }, 600);
            }
        }, 50);

        return () => clearInterval(timer);
    }, []);

    if (!show) return null;

    const fillLevel = count >= 100
        ? 0
        : START_Y - ((count / 100) * (START_Y - END_Y));

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            margin: 0,
            background: '#0d0d0d',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            zIndex: 9999,
            opacity: fadeOut ? 0 : 1,
            transition: 'opacity 0.7s ease-in-out',
        }}>
            {/* All animation styles defined as CSS classes — more reliable for SVG */}
            <style>{`
                .preloader-bg-text {
                    fill: #222;
                    font-size: 110px;
                    font-weight: 900;
                    letter-spacing: 2px;
                    font-family: 'Arial Black', Gadget, sans-serif;
                }
                .preloader-mask-text {
                    font-size: 110px;
                    font-weight: 900;
                    letter-spacing: 2px;
                    font-family: 'Arial Black', Gadget, sans-serif;
                }
                .preloader-wave-group {
                    transition: transform 0.1s linear;
                }
                .preloader-wave-path {
                    fill: #ffffff;
                    animation: preloaderWaveFlow 2s linear infinite;
                }
                @keyframes preloaderWaveFlow {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(-400px); }
                }
            `}</style>

            <div style={{ width: '90%', maxWidth: '1000px' }}>
                <svg viewBox="0 0 1000 300" xmlns="http://www.w3.org/2000/svg">
                    {/* Background dark text */}
                    <text
                        x="50%"
                        y="50%"
                        dominantBaseline="middle"
                        textAnchor="middle"
                        className="preloader-bg-text"
                    >
                        RITAM AXIS
                    </text>

                    <defs>
                        <mask id="text-mask">
                            <text
                                x="50%"
                                y="50%"
                                dominantBaseline="middle"
                                textAnchor="middle"
                                fill="white"
                                className="preloader-mask-text"
                            >
                                RITAM AXIS
                            </text>
                        </mask>
                    </defs>

                    {/* Wave fill masked to text shape */}
                    <g mask="url(#text-mask)">
                        <g
                            className="preloader-wave-group"
                            style={{ transform: `translateY(${fillLevel}px)` }}
                        >
                            <path
                                className="preloader-wave-path"
                                d="M0 0 Q 100 -40 200 0 T 400 0 T 600 0 T 800 0 T 1000 0 T 1200 0 T 1400 0 V 400 H 0 Z"
                            />
                        </g>
                    </g>
                </svg>
            </div>

            {/* Loading percentage text */}
            <div style={{
                marginTop: '30px',
                color: '#888',
                fontSize: '1.5rem',
                letterSpacing: '5px',
                fontWeight: 'bold',
                fontFamily: "'Arial Black', Gadget, sans-serif",
            }}>
                {count < 100 ? `LOADING... ${count}%` : 'COMPLETED'}
            </div>
        </div>
    );
};

export default Preloader;
