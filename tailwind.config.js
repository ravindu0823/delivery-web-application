/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-image": "url('./assets/img/img.png')",
        /* "predict-image": "url('./assets/images/predict_2.webp')",
        "article-image": "url('./assets/images/articles-bg-image.webp')",
        "klangio-image":
          "url('./assets/images/klangio_background_tinified.webp')",
        "contact-us-image": "url('./assets/images/feedback-page.webp')", */
      },
    },
  },
  plugins: [],
};
