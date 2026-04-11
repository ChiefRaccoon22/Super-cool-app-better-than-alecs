import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "mw-green": "#2D5016",
        "mw-orange": "#C75B1A",
        "mw-navy": "#1B2A4A",
        "mw-cream": "#F5E6C8",
        "mw-red": "#C0392B",
        "mw-gold": "#D4A017",
      },
      fontFamily: {
        display: ["Oswald", "Impact", "Arial Narrow", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      keyframes: {
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "15%": { transform: "translateX(-6px) rotate(-0.5deg)" },
          "30%": { transform: "translateX(6px) rotate(0.5deg)" },
          "45%": { transform: "translateX(-4px)" },
          "60%": { transform: "translateX(4px)" },
          "75%": { transform: "translateX(-2px)" },
        },
        floatUp: {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(-80px)", opacity: "0" },
        },
        popIn: {
          "0%": { transform: "scale(0)" },
          "60%": { transform: "scale(1.2)" },
          "80%": { transform: "scale(0.9)" },
          "100%": { transform: "scale(1)" },
        },
        pulseGlow: {
          "0%, 100%": {
            boxShadow:
              "0 0 20px rgba(212, 160, 23, 0.4), 0 0 40px rgba(212, 160, 23, 0.1)",
          },
          "50%": {
            boxShadow:
              "0 0 40px rgba(212, 160, 23, 0.9), 0 0 80px rgba(199, 91, 26, 0.5), 0 0 120px rgba(192, 57, 43, 0.2)",
          },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        shake: "shake 0.4s ease-in-out",
        "float-up": "floatUp 1.5s ease-out forwards",
        "pop-in": "popIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
