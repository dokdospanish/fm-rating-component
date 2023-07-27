/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/rating/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'custom':  ['Overpass']
      },
      colors: {
        'primary-orange': 'hsl(25, 97%, 53%)',
        'light-grey': 'hsl(217, 12%, 63%)',
        'medium-grey': 'hsl(216, 12%, 54%)',
        'dark-blue': 'hsl(213, 19%, 18%)',
        'very-dark-blue': 'hsl(216, 12%, 8%)'
      }
    }
  },
  plugins: [],
}

