/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        main: "#013E5D",
        primary: "#1B1717",
        grayColor: "#B3C5CE",
        textColor: "#1C1A1A",
        hoverButton:" #FF6B35 "
      },
    },
  },
  plugins: [],
};
