/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: '#00A4D6',
        'secondary-text': '#ADB0B2',
        'dark-background': '#11151A',
        'secondary-bg': '#202831',
        'light-gray': '#ADB0B2',
      }
    },
  },
  plugins: [],
}

