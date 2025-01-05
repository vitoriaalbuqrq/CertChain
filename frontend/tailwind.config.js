/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "#00A4D6",
        "primary-hover": "#46CDF6",
        "secondary-text": "#ADB0B2",
        "dark-background": "#11151A",
        "secondary-bg": "#202831",
        "secondary-gray": "#26303B",
        "light-gray": "#ADB0B2",
        "medium-gray": "#424950",
      },
    },
  },
  plugins: [],
};
