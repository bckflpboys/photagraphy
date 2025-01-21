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
        primary: '#8B4513', // Saddle Brown
        secondary: '#3E2723', // Dark Brown
        accent: '#D7CCC8', // Light Brown/Beige
        dark: '#1A1A1A', // Almost Black
        light: '#F5F5F5', // Off White
      },
    },
  },
  plugins: [],
}
