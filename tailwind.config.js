/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,ts}", // Include all Angular components and templates
    "./node_modules/flowbite/**/*.js" // Interactive Tailwind CSS classes from Flowbite
  ],
  theme: {
    extend: {
      colors: {
        secondary: "#0358F1",
        accent: "#4ECDFF",
        danger: "#DC2626",
        success: "#16A34A",
        neutral: "#64748B",
        secondaryOverlay: "#dce6f2",
        darkColor: "#1e1e1e"
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
};

