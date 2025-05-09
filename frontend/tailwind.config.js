/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./App.tsx", "./src/**/*.{js,ts,jsx,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        error: "#EC6344",
        normal: "#7FD19B",
      },
    },
  },
  plugins: [],
};
