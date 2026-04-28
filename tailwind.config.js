/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Adding custom shades for our greenish motif
        'chatbot-light': '#dcfce7', // green-100
        'chatbot-DEFAULT': '#16a34a', // green-600
        'chatbot-dark': '#166534', // green-800
        'panel-bg': '#f0fdf4', // light greenish background for sidebar
      }
    },
  },
  plugins: [],
}
