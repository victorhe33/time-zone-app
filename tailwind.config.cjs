/** @type {import('tailwindcss').Config} */
const path = require('path');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", './dist/index.html'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7DFDFE',
      },
    },
  },
  plugins: [],
}
// #7DFDFE
// #1B73E8

