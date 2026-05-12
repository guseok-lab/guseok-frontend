/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./index.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#FFC300",
        secondary: "#8b5cf6",
        bk:"#000000",
        gr200:"#B2B2B2",
        point:"#DF0000",
        bg:"#FFFFFF"
      },
    },
  },
  plugins: [],
};
