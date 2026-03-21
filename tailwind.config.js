/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#fff9ea',
        bark: {
          50:  '#fdf8ef',
          100: '#f5e8cc',
          200: '#e8d0a0',
          300: '#d4b070',
          400: '#b88a40',
          500: '#7e5700',
          600: '#361f1a',
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
        sans:    ['var(--font-vietnam)', 'sans-serif'],
        display: ['var(--font-jakarta)', 'sans-serif'],
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
