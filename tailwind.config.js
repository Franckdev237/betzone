/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#fff8e1',
          100: '#ffecb3',
          200: '#ffe082',
          300: '#ffd54f',
          400: '#ffca28',
          500: '#ffc107',  // Gold principal
          600: '#ffb300',
          700: '#ffa000',
          800: '#ff8f00',
          900: '#ff6f00',
        },
        dark: {
          50:  '#eceff1',
          100: '#cfd8dc',
          200: '#b0bec5',
          300: '#90a4ae',
          400: '#78909c',
          500: '#607d8b',
          600: '#546e7a',
          700: '#455a64',
          800: '#1a1f2e',   // Card background
          900: '#0d1117',   // Page background
          950: '#080b10',   // Deep black
        },
        success: '#00e676',
        danger:  '#ff1744',
        info:    '#00b0ff',
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body:    ['var(--font-body)', 'sans-serif'],
        mono:    ['var(--font-mono)', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial':  'radial-gradient(var(--tw-gradient-stops))',
        'gradient-brand':   'linear-gradient(135deg, #ffc107 0%, #ff6f00 100%)',
        'gradient-dark':    'linear-gradient(180deg, #0d1117 0%, #1a1f2e 100%)',
        'card-shine':       'linear-gradient(135deg, rgba(255,193,7,0.08) 0%, transparent 60%)',
      },
      boxShadow: {
        'brand':     '0 0 20px rgba(255,193,7,0.3)',
        'brand-lg':  '0 0 40px rgba(255,193,7,0.2)',
        'card':      '0 4px 24px rgba(0,0,0,0.4)',
        'card-hover':'0 8px 40px rgba(0,0,0,0.6)',
      },
      animation: {
        'pulse-gold':  'pulseGold 2s ease-in-out infinite',
        'slide-up':    'slideUp 0.4s ease-out',
        'fade-in':     'fadeIn 0.3s ease-out',
        'shimmer':     'shimmer 1.5s infinite',
      },
      keyframes: {
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(255,193,7,0.2)' },
          '50%':      { boxShadow: '0 0 30px rgba(255,193,7,0.5)' },
        },
        slideUp: {
          from: { opacity: 0, transform: 'translateY(20px)' },
          to:   { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: 0 },
          to:   { opacity: 1 },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition:  '200% 0' },
        },
      },
    },
  },
  plugins: [],
};
