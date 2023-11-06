import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: '#1a73e8',
        secondary: '#ff6d00',
        accent: '#34a853',
        background: '#f7f8fa',
        text: '#202124',
      },
      fontFamily: {
        header: ['Poppins', 'sans-serif'],
        body: ['Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
export default config
