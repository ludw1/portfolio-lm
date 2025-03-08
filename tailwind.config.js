/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./pages/*.html",
    "./js/*.js"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'nothingyoucoulddo': ['"Nothing You Could Do"', 'cursive'],
        'signika': ['Signika', 'sans-serif'],
      },
      colors: {
        neutral: {
          800: '#1f2937',
          900: '#111827',
        },
      },
      spacing: {
        '128': '32rem',
      },
    },
  },
  plugins: [],
} 