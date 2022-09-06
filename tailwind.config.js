/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        ibmPlex: "'IBM Plex Sans', sans-serif",
        ibmMono: "'IBM Plex Mono', monospace",
      },
      colors: {
        primary: "#005C75",
        secondary: "#76808F",
        tertiary: "#F5F5F5",
      },
      letterSpacing: {
        min: "0.35px",
      },
    },
  },
  plugins: [],
};
