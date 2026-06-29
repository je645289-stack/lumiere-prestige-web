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
        brand: {
          // Premium dark base
          dark: "#0a0a0f",
          darker: "#050508",
          secondary: "#0d0d1a",
          surface: "#12121f",
          border: "#1e1e2e",
          // Text
          cream: "#ffffff",
          muted: "#9999aa",
          // Accents (kept under legacy names so existing classes map to red)
          gold: "#cc0000", // primary red
          "gold-light": "#ff3333", // bright red accent
          red: "#cc0000",
          "red-bright": "#ff3333",
          blue: "#0033cc",
          "blue-bright": "#2a5cff",
        },
      },
      fontFamily: {
        display: ["var(--font-bebas)", "Impact", "sans-serif"],
        heading: ["var(--font-montserrat)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #0a0a0f 0%, #0d0033 100%)",
        "red-blue": "linear-gradient(135deg, #cc0000 0%, #0033cc 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        glow: "glow 2.5s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(204,0,0,0.35)" },
          "50%": { boxShadow: "0 0 40px rgba(0,51,204,0.45)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
