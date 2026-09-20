/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#14171C",
        surface: "#1B1F26",
        surface2: "#232830",
        ink: "#E8E6E1",
        muted: "#8B92A0",
        line: "#2C323C",
        scan: "#5FB3D9",
        flag: "#E8A33D",
        clean: "#6FCF8F",
      },
      fontFamily: {
        display: ["'IBM Plex Serif'", "serif"],
        body: ["'IBM Plex Sans'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      keyframes: {
        sweep: {
          "0%": { transform: "translateY(-4%)" },
          "50%": { transform: "translateY(104%)" },
          "100%": { transform: "translateY(-4%)" },
        },
        stampIn: {
          "0%": { opacity: "0", transform: "scale(1.4) rotate(-14deg)" },
          "60%": { opacity: "1", transform: "scale(0.92) rotate(-7deg)" },
          "100%": { opacity: "1", transform: "scale(1) rotate(-6deg)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        sweep: "sweep 1.8s ease-in-out infinite",
        stampIn: "stampIn 0.45s cubic-bezier(0.2,0.8,0.2,1) forwards",
        fadeIn: "fadeIn 0.3s ease forwards",
      },
    },
  },
  plugins: [],
};
