import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      purples: {
        background: string;
        gray: string;
        details: string;
      };
      button: {
        primary: string;
        hover: string;
        disabled: string;
      };
      danger: {
        main: string;
      };
      textColorWhite: string;
      textColorBlack: string;
      yellows: {
        main: string;
      };
      cardsBackground: string;
      gray: {
        900: string;
        300: string;
        200: string;
        100: string;
        50: string;
      };
      oranges: {
        main: string;
      };
      green: {
        main: string;
        secondary: string;
      };
      blue: {
        main: string;
        secondary: string;
      };
    };
    borderRadius: string;
    shadows: {
      webkitBoxShadow: string;
      mozBoxShadow: string;
      boxShadow: string;
    };
    shadowsInput: {
      boxShadow: string;
    };
  }
}
