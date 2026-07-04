import { createGlobalStyle } from "styled-components";
import background from "../assets/background.png";

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    margin: 0;
    font-family: ${({ theme }) => theme.font.body};
    color: ${({ theme }) => theme.colors.dark1};
    background:
      linear-gradient(0deg, rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)),
      url(${background}) center / cover fixed no-repeat;
  }

  a {
    color: inherit;
  }

  button {
    font-family: inherit;
  }
`;
