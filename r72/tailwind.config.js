/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "scandi-bg": "#f8f9fa", // Very light grey background
        "scandi-light-grey": "#e9ecef", // Lighter grey for borders/subtle elements
        "scandi-grey": "#adb5bd", // Medium grey for text/icons
        "scandi-dark-grey": "#343a40", // Darker grey for primary text/headings
        "scandi-accent": "#a7c957", // Muted green accent color (example - Scandi feel)
      },
      fontFamily: {
        sans: ['"Helvetica Neue"', "Helvetica", "Arial", "sans-serif"], // Clean sans-serif font
      },
    },
  },
  plugins: [],
};
