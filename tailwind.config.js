/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#00498C',
      },
      backgroundImage: {
        banner: `url('../public/images/banner.jpg')`,
      }
    },
  },
  plugins: [],
};

