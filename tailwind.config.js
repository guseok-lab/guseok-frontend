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
        primary: "#FDD54B",
        primary100: "#FDF6DB",
        primary300: "#FDD54B",
        primary400: "#FBB80E",
        bk:"#000000",
        gr100:"#E1E1E1",
        gr200:"#B2B2B2",
        gr700:"#292A29",
        point:"#E21010",
        point100:"#FDE9E9",
        point200:"#EFABAB",
        bg:"#FCFCFC",
        wh:"#FFFFFF"
      },
    },
  },
  plugins: [],
};
