/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#FAF6F0',
          200: '#F0E4DF',
        },
        blush: {
          100: '#F9E8EC',
          200: '#F4D5DC',
          300: '#E8B4C0',
        },
        'rose-accent': '#D9778B',
        espresso: '#2C2220',
        taupe: '#7A6A66',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        editorial: '0 20px 50px -24px rgba(44, 34, 32, 0.18)',
        glow: '0 0 0 6px rgba(217, 119, 139, 0.15)',
      },
    },
  },
  plugins: [],
};

