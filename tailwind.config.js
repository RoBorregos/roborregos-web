/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}', './public/index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        roboblue: '#0A38EF',
        bright: '#5C7AFF',
        navy: '#051B72',
        rbrgs: '#0070F3',
        steel: '#4F72B8',
        cyan: { accent: '#00FFFA' },
        card: '#13191E',
        footer: 'rgb(10,15,20)',
      },
      fontFamily: {
        archivo: ['Archivo', 'system-ui', 'sans-serif'],
        anton: ['Anton', 'Impact', 'sans-serif'],
        jersey: ['"Jersey 25"', 'Archivo', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
