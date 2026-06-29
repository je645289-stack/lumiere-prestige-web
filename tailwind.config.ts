import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#001830",
          darker: "#000a18",
          navy: "#002261",
          red: "#ff2a2d",
          "red-dark": "#d92225",
          gold: "#ff2a2d",
          "gold-light": "#ff5558",
          cream: "#ffffff",
          muted: "#a8b4c4",
          surface: "#002261",
          border: "#1a4975",
          accent: "#5499cc",
          light: "#f5f7fa",
          "light-muted": "#64748b",
        },
      },
      fontFamily: {
        sans: ["var(--font-montserrat)", "system-ui", "sans-serif"],
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        label: ["var(--font-cinzel)", "Georgia", "serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "scroll-bounce": "scrollBounce 2s ease-in-out infinite",
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
        scrollBounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(8px)" },
        },
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(to right, rgba(0,24,48,0.95) 0%, rgba(0,24,48,0.75) 50%, rgba(0,24,48,0.4) 100%)",
        "section-gradient":
          "radial-gradient(ellipse at center, rgba(0,34,97,0.6) 0%, rgba(0,24,48,1) 70%)",
      },
    },
  },
  plugins: [],
};

export default config;
