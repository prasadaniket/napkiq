import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#D64238',
          hover: '#B82E25',
          light: '#E85D52',
        },
        secondary: {
          DEFAULT: '#00021D',
          light: '#5C5E70',
        },
        tertiary: {
          DEFAULT: '#FFB800',
          hover: '#E6A600',
        },
        neutral: {
          dark: '#00021D',
          medium: '#5C5E70',
          light: '#E2E3E8',
          'off-white': '#efeeeb',
          white: '#FFFFFF',
        },
        success: '#27AE60',
        warning: '#FFB800',
        error: '#E74C3C',
        info: '#3498DB',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'ui-serif', 'serif'],
      },
      borderRadius: {
        lg: '0.5rem',
        md: 'calc(0.5rem - 2px)',
        sm: 'calc(0.5rem - 4px)',
      },
    },
  },
  plugins: [],
}

export default config
