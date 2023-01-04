import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Sora', sans-serif;
  }

  body {
    background: ${({ theme }) => theme.colors.purples.background};
    font-size: 16px;
    color: ${({ theme }) => theme.colors.textColorWhite};
  }

  button {
    cursor: pointer;
  }
`;
