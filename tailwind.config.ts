import type { Config } from "tailwindcss";
import defaultTheme from 'tailwindcss/defaultTheme';
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        inter: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      backgroundImage:{
        'green-backdrop':"url('/backdrop.jpg')",
      },
      colors: {
        fadedText: "rgba(255, 255, 255, 0.6)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        greenText: "rgba(177, 255, 41, 1)",
        grayedText:"rgba(153, 159, 157, 1)",
        darkGreen:"rgba(25, 39, 33, 1)",
        grayedGreen:"rgba(102, 112, 107, 1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
