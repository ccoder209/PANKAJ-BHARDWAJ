/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(37, 99, 235, 0.45)" },
          "50%": { boxShadow: "0 0 0 10px rgba(37, 99, 235, 0)" },
        },
        "shine-continuous": {
          "0%": { transform: "translateX(-150%)" },
          "100%": { transform: "translateX(250%)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pop": {
          "0%": { transform: "scale(1)" },
          "35%": { transform: "scale(1.15)" },
          "100%": { transform: "scale(1)" },
        },
        "slide-in-left": {
          "0%": { opacity: "0", transform: "translateX(-14px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        "pulse-glow": "pulse-glow 2.2s ease-in-out infinite",
        "shine-continuous": "shine-continuous 2.8s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.6s ease-out both",
        "pop": "pop 0.45s ease-out",
        "slide-in-left": "slide-in-left 0.45s ease-out both",
      },
    },
  },
  plugins: [],
};
