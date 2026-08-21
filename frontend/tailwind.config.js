/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: '#0F1B3D',
        'navy-dark': '#0A1330',
        gold: '#C99A3C',
        'gold-light': '#D4A84B',
        lightgray: '#F5F7FA',
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],   // ← Added
        body: ['Open Sans', 'sans-serif'],
      },
      borderRadius: {
        'xl': '12px',
      },
      boxShadow: {
        card: '0 4px 20px rgba(0,0,0,0.05)',
      },
    },
  },
  plugins: [],
}