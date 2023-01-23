/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.jsx',
    './components/**/*.jsx'
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif']
    },
    extend: {
      backgroundImage: {
        galaxy: 'url(/background-galaxy.png)',
        'game-gradient': 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.08%)'
      },
    },
  },
  plugins: [],
}
