const withMT = require('@material-tailwind/react/utils/withMT')
module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors:{
      "azul":"#1A3C4E",
      "piel1":"#DAC0A3",
      "piel2":"#EADBC8",
      "piel3":"#F8F0E5",
      "celeste":"#C2DEDC",
      "crema":"#ECE5C7",
      "marron":"#CDC2AE",
      "azul_logo":"#10638c",
      "naranja":"#EC7263",
      "blanco":"#FFFFFF"
    },
    extend: { 
      fontFamily : {
        londrina : ['Londrina Solid']
      }

    },
  },
  plugins: [],
});
