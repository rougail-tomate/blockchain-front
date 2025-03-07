import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        light_green: "#5BECC0",
        light_orange: "#F6AE5C",
        salmon: "#ECB7D6",
        bg_color: "#030116",
        deep_purple: "#050223"
      },
    },
  },
  plugins: [],
} satisfies Config;