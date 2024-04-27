import { createGlobalStyle, css } from 'styled-components';

import { pretendard } from './font/font';
import resetCss from './reset';

const GlobalStyle = createGlobalStyle`${css`
  ${resetCss}
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;

    font-family: ${pretendard.style.fontFamily}, sans-serif;
    word-break: keep-all;
  }

  html,
  body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;

    font-size: 62.5%; /* 1rem = 10px */
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
  }
`}
`;

export default GlobalStyle;
