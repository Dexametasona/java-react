/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "primary-color": "#16191E",
      "secondary-color": "#ffffff",
      "highlight-color": "#FF2B2B",
      "line-color": "#FF5A5AFF",
      "modal":"rgba(86,93,109,0.3)",
      "gray-card": "#BDC0C9"
    },

    extend: {
      fontFamily: {
        title: [ "Catamaran", "sans-serif"],
        body: [ "Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
}

