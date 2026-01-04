/**
 * Centralized SVG Color Configuration
 *
 * This file contains all color values used in inline SVG illustrations
 * throughout the application. Update these values to change character
 * appearances globally.
 */

export const svgColors = {
  // Character skin tones
  skin: {
    main: "#8D5524",      // Primary skin color
    shadow: "#6B4423",    // Darker shadow areas
    midTone: "#7A4A22",   // Mid-tone for gradients
    highlight: "#A66B3A", // Lighter highlights
  },

  // Hair colors
  hair: {
    black: "#2D2D2D",
    darkBrown: "#3D2314",
    brown: "#5D3A1A",
  },

  // Clothing and accessories (common colors)
  clothing: {
    white: "#FFFFFF",
    lightGray: "#E6E6E6",
    darkGray: "#4A4A4A",
    blue: "#4285F4",
    navy: "#1A237E",
  },

  // Background elements
  background: {
    lightBlue: "#E3F2FD",
    lightPurple: "#EDE7F6",
    lightGreen: "#E8F5E9",
  },
};

// Helper function to get skin color by type
export const getSkinColor = (type = "main") => {
  return svgColors.skin[type] || svgColors.skin.main;
};

// Helper function to get hair color by type
export const getHairColor = (type = "black") => {
  return svgColors.hair[type] || svgColors.hair.black;
};

export default svgColors;
