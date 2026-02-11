/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        roast: {
          DEFAULT: "#FF453A",
          dark: "#8B0000",
        },
        background: "#0A0A0A",
        foreground: "#EDEDED",
      },
    },
  },
  plugins: [],
}