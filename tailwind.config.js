/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        movil: { min: "220px", max: "440px" },
        // => @media (min-width: 640px and max-width: 767px) { ... }
  
        tablet: { min: "441px", max: "750px" },
        // => @media (min-width: 768px and max-width: 1023px) { ... }
  
        laptop: { min: "751px", max: "1280px" },
        // => @media (min-width: 1024px and max-width: 1279px) { ... }
  
        xl: { min: "1280px", max: "1535px" },
        // => @media (min-width: 1280px and max-width: 1535px) { ... }
  
        "2xl": { min: "1536px" },
        // => @media (min-width: 1536px) { ... }
      },
      
    },
  },
  plugins: [],
}