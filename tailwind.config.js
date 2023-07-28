/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "375px",
      md: "960px",
      xl: "1440px",
    },
    extend: {
      colors: {
        elmts: "var(--elmts)",
        bckg: "var(--bckg)",
        text: "var(--text)",
        input: "var(--input)",
      },
    },
  },
  plugins: [],
};
