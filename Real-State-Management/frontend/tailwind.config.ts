import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0f172a",
        sand: "#f8f3ea",
        moss: "#1f6f5b",
        clay: "#c47f4a",
        slateSoft: "#5f6b7a",
      },
      boxShadow: {
        glow: "0 30px 80px rgba(15, 23, 42, 0.18)",
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top left, rgba(31,111,91,0.18), transparent 28%), radial-gradient(circle at top right, rgba(196,127,74,0.18), transparent 24%), linear-gradient(135deg, #f8f3ea 0%, #f2ede4 45%, #eef2f7 100%)",
      },
      fontFamily: {
        display: ["Sora", "ui-sans-serif", "system-ui"],
        body: ["Manrope", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
} satisfies Config;
