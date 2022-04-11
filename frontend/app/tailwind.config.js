module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'thin-black': 'rgba(32, 32, 32, 0.9)',
        'slid-black': '#2e2e2e',
        'wine': '#5a09a7',
        'secondary': '#dd4b39',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
