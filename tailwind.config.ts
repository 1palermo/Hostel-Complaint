import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        custom: {
          primary: '#0A36A0',
          secondary: '#47A4A5',
        },
      },
    },
  },

  plugins: [require('daisyui')],

  daisyui: {
    themes: ["light"],
  },
}
export default config;
