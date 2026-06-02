// // tailwind.config.js
// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}", 
//   ],
//   theme: {
//     extend: {
//       fontFamily: {
//    sans: ['Poppins'],
//       },
//     },
//   },
//   plugins: [require("tailwind-scrollbar-hide")],
// };




/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins'], // default font
        styleScript: ['"Style Script"', 'cursive'],
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};