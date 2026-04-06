/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#09090b',
          900: '#0c0c0f',
          850: '#111114',
          800: '#16161a',
          750: '#1c1c21',
          700: '#232329',
          600: '#2e2e36',
          500: '#3d3d47',
          400: '#52525e',
          300: '#71717f',
          200: '#a1a1af',
          100: '#d4d4dc',
          50:  '#f4f4f6',
        },
        gold: {
          950: '#2a1a00',
          900: '#4a2f00',
          800: '#6b4400',
          700: '#8c5a00',
          600: '#ad7100',
          500: '#c9850a',
          400: '#d4a033',
          300: '#e0bb5c',
          200: '#ebd48a',
          100: '#f5eab8',
          50:  '#fcf8e8',
        },
      },
      fontFamily: {
        heading: ['Inter', 'SF Pro Display', 'system-ui', 'sans-serif'],
        body: ['Inter', 'SF Pro Text', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'Fira Code', 'monospace'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        glow: '0 0 20px rgba(201, 133, 10, 0.15)',
        'glow-strong': '0 0 40px rgba(201, 133, 10, 0.25)',
        glass: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.05)',
      },
      letterSpacing: {
        caps: '0.15em',
      },
    },
  },
  plugins: [],
};
