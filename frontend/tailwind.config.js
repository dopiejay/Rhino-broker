/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#15314F",
          dark: "#112B44",
          deep: "#0D2339",
          light: "#1E3A5F",
          soft: "#E9EEF5",
        },
        emerald: {
          DEFAULT: "#00FA9A",
          dark: "#00D988",
          deep: "#00C27A",
          light: "#00FA9A",
          soft: "#2ECC8C",
          ink: "#3a8f22",
        },
        gold: {
          DEFAULT: "#16A5B1",
          light: "#4FC3CC",
          dark: "#0B6672",
          soft: "#E0F4F5",
        },
        cream: {
          DEFAULT: "#F8F9FA",
          dark: "#EEF1F5",
        },
        charcoal: "#171B26",
        green: {
          DEFAULT: "#4F8F52",
          dark: "#3B6B3D",
          light: "#7CB37E",
        },
        brass: {
          DEFAULT: "#B8874A",
          light: "#D4AC72",
          dark: "#8F6633",
        },
        parchment: {
          DEFAULT: "#FBFAF8",
          dark: "#F1EEE7",
        },
        ink: "#171E26",
      },
      fontFamily: {
        display: ["Outfit", "Inter", "system-ui", "sans-serif"],
        hero: ["Poppins", "Outfit", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(11,31,58,0.06), 0 12px 32px -12px rgba(11,31,58,0.18)",
        lift: "0 2px 4px rgba(11,31,58,0.08), 0 24px 48px -16px rgba(11,31,58,0.28)",
        gold: "0 0 0 1px rgba(22,165,177,0.35), 0 16px 40px -12px rgba(22,165,177,0.4)",
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        kenburns: "kenburns 14s ease-out forwards",
        fadeup: "fadeup 0.9s cubic-bezier(0.16,1,0.3,1) both",
        fadein: "fadein 1.1s ease both",
        float: "float 7s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        kenburns: {
          "0%": { transform: "scale(1.12)" },
          "100%": { transform: "scale(1)" },
        },
        fadeup: {
          "0%": { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadein: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
