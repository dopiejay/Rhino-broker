/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#7B1E2B",
          dark: "#5F1520",
          deep: "#3F0E17",
          light: "#9E3542",
          soft: "#FAF1F2",
        },
        steel: {
          DEFAULT: "#9E3542",
          dark: "#852A36",
          light: "#B54955",
          soft: "#F9ECEE",
        },
        gold: {
          DEFAULT: "#D19A42",
          light: "#DDB06A",
          dark: "#B8832E",
          soft: "#FDF6EB",
        },
        cream: {
          DEFAULT: "#FAF6F0",
          dark: "#F1E9E0",
        },
        mist: {
          DEFAULT: "#F4F5F7",
          dark: "#E9EBEF",
        },
        charcoal: "#263238",
        green: {
          DEFAULT: "#9E3542",
          dark: "#852A36",
          light: "#B54955",
        },
        brass: {
          DEFAULT: "#D19A42",
          light: "#DDB06A",
          dark: "#B8832E",
        },
        parchment: {
          DEFAULT: "#FAF6F0",
          dark: "#F1E9E0",
        },
        ink: "#59636E",
      },
      fontFamily: {
        display: ["Manrope", "Inter", "system-ui", "sans-serif"],
        hero: ["Manrope", "Inter", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(63,14,23,0.06), 0 12px 32px -12px rgba(63,14,23,0.18)",
        lift: "0 2px 4px rgba(63,14,23,0.08), 0 24px 48px -16px rgba(63,14,23,0.28)",
        gold: "0 0 0 1px rgba(209,154,66,0.35), 0 16px 40px -12px rgba(209,154,66,0.4)",
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
