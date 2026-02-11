module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['var(--font-inter)', 'sans-serif'],
        'space-grotesk': ['var(--font-space-grotesk)', 'sans-serif']
      }
    }
  },
  plugins: [require('@tailwindcss/typography')],
}