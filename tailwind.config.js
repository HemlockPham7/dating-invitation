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
      fontSize: {
        // Small text increased by +10%
        xs: ['0.825rem', { lineHeight: '1.15rem' }],
        sm: ['0.9625rem', { lineHeight: '1.4rem' }],
        base: ['1.1rem', { lineHeight: '1.65rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        // Large headings decreased by -10%
        '3xl': ['1.6875rem', { lineHeight: '2.1rem' }],
        '4xl': ['2.025rem', { lineHeight: '2.35rem' }],
        '5xl': ['2.7rem', { lineHeight: '1.12' }],
        '6xl': ['3.375rem', { lineHeight: '1.08' }],
        '7xl': ['4.05rem', { lineHeight: '1.06' }],
        '8xl': ['5.4rem', { lineHeight: '1.04' }],
      },
      boxShadow: {
        editorial: '0 20px 50px -24px rgba(44, 34, 32, 0.18)',
        glow: '0 0 0 6px rgba(217, 119, 139, 0.15)',
      },
    },
  },
  plugins: [],
};

