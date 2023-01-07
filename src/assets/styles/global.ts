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

  /* React Multi Select */
  .rmsc {
    margin-top: 15px;
    width: 500px;
  }
  .rmsc select {
    height: 52px;
  }
  .dropdown-container {
    color: #000;
    height: 52px;
    justify-content: center;
    align-items: center;
    display: flex;
  }
`;
