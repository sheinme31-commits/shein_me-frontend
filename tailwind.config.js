/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sf: {
          cream: '#FAF7F2',
          white: '#FFFFFF',
          beige: '#F0EAE0',
          'beige-dark': '#E5DDD0',
          rose: '#F2C4CE',
          'rose-dark': '#E8A8B5',
          'rose-soft': '#FBF0F2',
          sage: '#A8BBA8',
          'sage-dark': '#8DA68D',
          'sage-soft': '#EEF3EE',
          brown: '#8B6F5E',
          'brown-light': '#C4A898',
          text: '#3D3530',
          'text-soft': '#7A6E69',
          'text-light': '#A89F9A',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Nunito"', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease-out both',
        'fade-in': 'fadeIn 0.5s ease-out both',
        'marquee': 'marquee 35s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      boxShadow: {
        'soft': '0 4px 24px rgba(139, 111, 94, 0.08)',
        'soft-lg': '0 8px 40px rgba(139, 111, 94, 0.12)',
        'rose': '0 4px 24px rgba(242, 196, 206, 0.4)',
      },
    },
  },
  plugins: [],
}