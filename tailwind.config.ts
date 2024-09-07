/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#FF9900", // Amazon Orange
          "orange": "#FF9900",
          "black": "#131921" // Amazon Dark Gray/Black
        },
        secondary: "#232F3E", // Amazon Navy
        "gray-200": "#EAECF0",
        "gray-300": "D0D5DD",
        "gray-500": "#667085",
        "gray-600": "#475467",
        "gray-700": "#344054",
        "gray-900": "#131921", // Amazon Dark Gray/Black
        "white-100": "#F4F4F4",
        "white-200": "#EDF0F8",
        "black-100": "#131921", // Amazon Dark Gray/Black
        "neutral-black": "#131921", // Amazon Dark Gray/Black
      },
      boxShadow: {
        xs: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
      },
      maxWidth: {
        "10xl": '1440px'
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        spaceGrotesk: ['Space Grotesk', 'sans-serif'],
      },
      borderRadius: {
        10: "10px"
      },
      textColor: {
        DEFAULT: '#FFFFFF', // Set default text color to white
      }
    },
  },
  plugins: [],
};
