/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brightColor: "#F4511F",
        backgroundColor: "#b7bca9",
        viteGreen: '#681800',
        lightText: "#959595",
        footercolor: "#023020"
      },
    },
  },
  plugins: [],
};
