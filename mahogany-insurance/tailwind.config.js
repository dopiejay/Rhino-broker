/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0B1F3A",
          dark: "#081729",
          deep: "#040E1C",
          light: "#1E3A5F",
          soft: "#E9EEF5",
        },
        emerald: {
          DEFAULT: "#0F6B4F",
          dark: "#0A4E3A",
          deep: "#063426",
          light: "#3B9072",
          soft: "#E2F1EA",
        },
        gold: {
          DEFAULT: "#C9A227",
          light: "#DFC04E",
          dark: "#9C7D1B",
          soft: "#F7EFD8",
        },
        cream: {
          DEFAULT: "#FAF8F3",
          dark: "#F2EDE1",
        },
        charcoal: "#171B26",
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(11,31,58,0.06), 0 12px 32px -12px rgba(11,31,58,0.18)",
        lift: "0 2px 4px rgba(11,31,58,0.08), 0 24px 48px -16px rgba(11,31,58,0.28)",
        gold: "0 0 0 1px rgba(201,162,39,0.35), 0 16px 40px -12px rgba(201,162,39,0.4)",
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
