import { createGlobalStyle, css } from 'styled-components';

import { pretendard } from './font/font';
import resetCss from './reset';
import './font/font-face/imcre-font-face.css';

const GlobalStyle = createGlobalStyle`${css`
  ${resetCss}

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;

    font-family: ${pretendard.style.fontFamily}, sans-serif;
    letter-spacing: -0.019em;
    word-break: keep-all;
  }

  /* stylelint-disable-next-line selector-id-pattern */
  #__next {
    position: relative;
    z-index: ${({ theme }) => theme.zIndex.root};
  }

  #modal {
    position: fixed;
    z-index: ${({ theme }) => theme.zIndex.modal};
  }

  html,
  body {
    overflow-x: auto;
    height: fit-content;
    min-height: 100vh;
    font-size: 62.5%; /* 1rem = 10px */
  }

  input,
  textarea,
  select,
  button {
    background: transparent;
    border: 0;
  }

  button {
    cursor: pointer;
    padding: 0;
    border: none;
  }

  a {
    cursor: pointer;
    color: unset;
    text-decoration: none;

    &[role='button']:focus-visible {
      border: 1px solid #007bff;
    }
  }

  input,
  textarea {
    resize: none;
    outline: none;
  }

  ul {
    list-style-type: none;
  }
`}
`;

export default GlobalStyle;
