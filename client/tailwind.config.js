// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // 👈 important for Tailwind to work in React
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
