module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'thin-black': 'rgba(32, 32, 32, 0.9)',
        'slid-black': '#2e2e2e',
        'bg-gray': 'rgb(54, 54, 54)',
        'wine': '#5a09a7',
        'secondary': '#dd4b39',
        'orange': 'rgb(226, 147, 0)',
        'thin-orange': 'rgb(255, 230, 183)',
        'green': 'rgb(0, 185, 46)',
        'thin-green': 'rgb(179, 255, 198)',
        'gray': 'rgb(100, 99, 99)',
        'thin-gray': 'rgb(175, 175, 175)'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
