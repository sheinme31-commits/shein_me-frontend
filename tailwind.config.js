/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        lm: {
          ivory: '#F8F4EE',
          cream: '#EDE8DF',
          sand: '#D4C9B5',
          gold: '#B8976A',
          'gold-light': '#D4B896',
          taupe: '#8B7355',
          brown: '#5C4A32',
          noir: '#1A1614',
          'noir-soft': '#2C2420',
          white: '#FDFAF6',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        italic: ['"Cormorant"', 'Georgia', 'serif'],
        body: ['"Jost"', 'sans-serif'],
      },
      letterSpacing: {
        luxury: '0.25em',
        ultra: '0.4em',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease-out both',
        'fade-in': 'fadeIn 0.6s ease-out both',
        'line-grow': 'lineGrow 0.8s ease-out both',
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(24px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        lineGrow: {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}