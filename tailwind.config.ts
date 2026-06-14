import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-teal': '#3ebdad',
        'brand-yellow': '#d9cf72',
      },
      fontFamily: {
        'sans': ['var(--font-nunito)'],
        'inter': ['var(--font-inter)'],
      },
      keyframes: {
        'zoom-out': {
          '0%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        'zoom-out': 'zoom-out 16s ease-out forwards',
      },
    },
  },
  plugins: [],
}
export default config
