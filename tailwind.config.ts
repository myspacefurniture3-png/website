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
        'primary-blue': '#1E3A8A',
        'secondary-blue': '#2563EB',
        'light-gray': '#F5F5F5',
        'dark-gray': '#333333',
      },
      fontFamily: {
        sans: ['Jost', 'Helvetica Neue', 'Arial', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Times New Roman', 'serif'],
        playfair: ['Cormorant Garamond', 'Times New Roman', 'serif'],
      },
    },
  },
  plugins: [],
}
export default config
