/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Brand scale — "navy"/"steel" tokens render the deep-green
        // Rhino brand so all existing components pick up the palette.
        navy: {
          DEFAULT: "#00652F", // Rhino Green · primary
          dark: "#004F23", // deep primary (hover)
          deep: "#003D25", // Deep Forest · dark sections
          deeper: "#002B1B", // deepest · hover on dark sections
          light: "#007A38",
          soft: "#F3F7F4", // Soft Ivory Green · backgrounds
        },
        // Deep Forest scale
        forest: {
          DEFAULT: "#003D25",
          light: "#005B36",
          dark: "#002413",
          soft: "#E7F1EB",
        },
        steel: {
          DEFAULT: "#45A36B", // Fresh Green · highlights / CTAs
          dark: "#2E8257",
          light: "#5FB183",
          soft: "#E7F3EB",
        },
        gold: {
          DEFAULT: "#F26A21", // Rhino Orange · accents / eyebrows
          light: "#F5833A",
          dark: "#D2560F",
          soft: "#FEF2EA",
        },
        cream: {
          DEFAULT: "#F3F7F4", // Soft Ivory Green
          dark: "#EAF3EE",
        },
        mist: {
          DEFAULT: "#F3F7F4",
          dark: "#EAF2ED",
        },
        charcoal: "#263238",
        green: {
          DEFAULT: "#45A36B",
          dark: "#2E8257",
          light: "#5FB183",
        },
        brass: {
          DEFAULT: "#F26A21",
          light: "#F5833A",
          dark: "#D2560F",
        },
        parchment: {
          DEFAULT: "#F3F7F4",
          dark: "#EAF3EE",
        },
        ink: "#59636E",
      },
      fontFamily: {
        display: ["Manrope", "Inter", "system-ui", "sans-serif"],
        hero: ["Manrope", "Inter", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(0,61,37,0.06), 0 12px 32px -12px rgba(0,61,37,0.18)",
        lift: "0 2px 4px rgba(0,61,37,0.08), 0 24px 48px -16px rgba(0,61,37,0.28)",
        gold: "0 0 0 1px rgba(242,106,33,0.35), 0 16px 40px -12px rgba(242,106,33,0.4)",
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
