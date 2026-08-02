/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#10233F", dark: "#0A1729", light: "#1C3A5E" },
        green: { DEFAULT: "#4F8F52", dark: "#3B6B3D", light: "#7CB37E" },
        brass: { DEFAULT: "#B8874A", light: "#D4AC72", dark: "#8F6633" },
        parchment: { DEFAULT: "#FBFAF8", dark: "#F1EEE7" },
        ink: "#171E26",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
