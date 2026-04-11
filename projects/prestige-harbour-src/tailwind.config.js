/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#fbfaf6',
          100: '#f7f4ec',
          200: '#efeadd',
        },
        bronze: {
          400: '#c4a478',
          500: '#b8956a',
          600: '#9c7c52',
          700: '#7c6140',
        },
        charcoal: {
          800: '#1a1a1a',
          900: '#0f0f0f',
          950: '#060606',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.25em',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
