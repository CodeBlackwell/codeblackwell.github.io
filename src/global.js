import { createGlobalStyle, css } from "styled-components";

const deepSpaceStyles = css`
  /* Cosmic text glow for headers */
  h1,
  h2,
  h3 {
    text-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
  }

  /* Links get subtle glow on hover */
  a {
    transition: text-shadow 0.3s ease, color 0.3s ease;
  }

  a:hover {
    text-shadow: 0 0 10px rgba(139, 92, 246, 0.5);
  }

  /* Cosmic scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(10, 10, 20, 0.8);
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, rgba(139, 92, 246, 0.6), rgba(192, 132, 252, 0.6));
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, rgba(139, 92, 246, 0.8), rgba(192, 132, 252, 0.8));
  }

  /* Cosmic selection */
  ::selection {
    background: rgba(139, 92, 246, 0.4);
    color: #ffffff;
  }
`;

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  body {
    align-items: center;
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    display: flex;
    font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    transition: all 0.5s ease;
    min-height: 100vh;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }

  #root {
    width: 100%;
    position: relative;
    z-index: 1;
  }

  /* Deep Space Dark Mode Enhancements */
  ${({ theme }) => theme.isDeepSpace && deepSpaceStyles}
`;
