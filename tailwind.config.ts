//import type { Config } from "tailwindcss";
import { withUt } from "uploadthing/tw";

export default withUt ({
  content: [
    // "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    // "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    // "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    // "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{ts,tsx,mdx}"
  ],
  theme: {
    screens: {
      sm: "375px",
      md: "768px",
      lg: "1200px",
    },
    extend: {
      backgroundImage: {
        bannerImg: "url('/Frontpage.png')",
        menuPageImg: "url('/Frame-Menu.png')",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "20px",
          lg: "80px",
        },
      },
      colors: {
        accent: "#0989FF",
        topHeadingPrimary: "#010F1C",
        topHeadingSecondary: "#021D35",
        pink: "#FD4B6B",
      }
    },
  },
  plugins: [],
});

// export default config;
