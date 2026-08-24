/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#ccfbf1', 
          DEFAULT: '#0d9488', // El verde azulado principal
          dark: '#0f766e', 
        },
        surface: '#f8fafc', // Gris muy claro para el fondo
      }
    },
  },
  plugins: [],
}