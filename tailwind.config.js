/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#37047C',
        secondary: '#051036',
      },
      fontFamily: {
        dm: ['DM Sans', 'sans-serif'],
      },
      maxWidth: {
        'container': '1430px',
      },
    },
  },
  plugins: [],
}
