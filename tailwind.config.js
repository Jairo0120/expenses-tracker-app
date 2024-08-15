/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dodger-blue": {
          50: "#f0f7ff",
          100: "#e1eefd",
          200: "#bcdcfb",
          300: "#81c1f8",
          400: "#3da1f3",
          500: "#1d8eeb",
          600: "#0768c2",
          700: "#07539d",
          800: "#0a4782",
          900: "#0f3c6b",
          950: "#0a2647",
        },
        "persian-red": {
          50: "#fff1f1",
          100: "#ffe0e1",
          200: "#ffc6c8",
          300: "#ff9ea1",
          400: "#ff676c",
          500: "#fc373d",
          600: "#da141a",
          700: "#c51015",
          800: "#a31115",
          900: "#861619",
          950: "#490608",
        },
      },
    },
  },
  plugins: [],
};
