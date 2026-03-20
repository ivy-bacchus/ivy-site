/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FAF8F5',
        bark: {
          100: '#F5EFE6',
          200: '#E8D9C5',
          300: '#D4B896',
          400: '#B89270',
          500: '#8B6A3E',
          600: '#6B4F2D',
        },
        sage: {
          100: '#EDF2EB',
          200: '#C8D9C4',
          300: '#9BBF96',
          400: '#6B9E66',
          500: '#4A7A47',
        },
      },
      fontFamily: {
        sans: ['var(--font-nunito)', 'sans-serif'],
      },
      animation: {
        'heart-pop': 'heartPop 0.35s ease',
        'fade-in': 'fadeIn 0.2s ease',
        'slide-up': 'slideUp 0.25s ease',
      },
      keyframes: {
        heartPop: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.4)' },
          '100%': { transform: 'scale(1)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
