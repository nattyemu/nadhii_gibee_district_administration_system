/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "ofc-green": "#228B22",
        "ofc-blue": "#0000CD",
      },
    },
  },
  plugins: [],
};
