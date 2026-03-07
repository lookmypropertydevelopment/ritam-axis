/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        surface: '#0a0a0a',
        surface2: '#111111',
        surface3: '#1a1a1a',
        'off-white': '#FAF9F6',
        charcoal: '#1a1a1a',
        gold: '#D4AF37',
        'gold-light': '#e8c84a',
        'grid-line': 'rgba(255, 255, 255, 0.06)',
        earth: {
          brown: '#8B5A2B',
          green: '#4A5D23',
          blue: '#2C3E50',
          orange: '#D35400',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
