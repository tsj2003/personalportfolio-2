/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#0a0a1f',
          accent: '#00f3ff',
          pink: '#bc13fe',
          yellow: '#f9f871',
        }
      },
      fontFamily: {
        mono: ['Courier New', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
