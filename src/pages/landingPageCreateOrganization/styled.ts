import styled from 'styled-components';

export const HeaderContainer = styled.header`
  padding: 18px 42px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .divDetails {
    display: flex;

    img {
      height: 50px;
    }
  }

  .infosDetails {
    margin-left: 48px;
    display: flex;
    gap: 28px;
    transition: 0.2s all;

    button {
      transition: 0.3s all;
      background: transparent;
      border: none;

      span {
        font-size: 28px;
      }

      &:hover {
        transform: translateY(-4px);
        span {
          color: ${({ theme }) => theme.colors.textColorWhite};
        }
      }
    }

    .login-span {
      color: ${({ theme }) => theme.colors.yellows.main};
    }
    .register-span {
      color: ${({ theme }) => theme.colors.green.main};
    }

    .about-span {
      text-decoration: none;
      color: ${({ theme }) => theme.colors.oranges.main};
    }
  }

  .divButtonContact {
    a {
      text-decoration: none;
      color: ${({ theme }) => theme.colors.textColorBlack};
    }

    .buttonAbout {
      &:hover {
        background: ${({ theme }) => theme.colors.oranges.main};
        border: 2px solid ${({ theme }) => theme.colors.green.main};
        transform: translateY(4px);
        height: 56px;
      }
    }
  }

  .options-phone {
    display: none;
  }

  @media only screen and (max-width: 768px) {
    padding: 8px 42px;
    .divDetails {
      .div-options-phone {
        align-items: center;
        justify-content: space-around;
        display: flex;
        background: #000;
      }
      max-width: 100%;
      flex: 1;
    }

    .infosDetails, .divButtonContact {
      display: none;
    }

    .options-phone {
      display: inline-block;
      z-index: 999;

      button {
        background: transparent;
        outline: none;
        border: none;
      }
    }
  }

  @media only screen and (max-width: 425px) {
    padding: 4px 42px;
  }

`;

export const Container = styled.div`
  background: rgb(36,0,70);
  background: linear-gradient(90deg, rgba(36,0,70,1) 9%, rgba(49,6,99,1) 30%, rgba(86,11,173,1) 70%, rgba(251,86,7,1) 91%);

  .div-options {
    border-top: 1px solid ${({ theme }) => theme.colors.purples.gray};
    right: 0;
    position: absolute;
    background: rgb(36,0,70);
    align-items: center;
    flex-direction: column;
    display: grid;

    button {
      padding: 8px;
      background: transparent;
      border: 1px solid ${({ theme }) => theme.colors.purples.gray};
      max-width: 100%;

      span {
        font-size: 28px;
      }

      .login-span {
        color: ${({ theme }) => theme.colors.yellows.main};
      }
      .register-span {
        color: ${({ theme }) => theme.colors.green.main};
      }

      .about-span {
        text-decoration: none;
        color: ${({ theme }) => theme.colors.oranges.main};
      }
    }
  }

  @media only screen and (max-width: 425px) {
    width: 430px;
    padding-bottom: 16px;
  }
`;

export const ContainerWrapper = styled.div`
  margin: 0px 32px;
  .header {
    display: flex;
    justify-content: space-around;

    .divImg {
      h2 {
        margin-top: 24px;
      }
      img {
        height: 500px;
        justify-content: center;
        align-items: center;
      }
    }

  }

  .phraseHeadline {
    text-align: center;
    margin: 32px 0px 38px 0px;
    text-transform: uppercase;
  }

  .cards {
    display: flex;
    margin-top: 66px;
  }

  .finalText {
    text-align: center;
    h1 {
      margin: 18px;
    }

    .lastH1 {
      margin: 18px 18px 0px !important;
    }
  }
  @media only screen and (max-width: 1000px) {
    .cards {
      display: inline-block;
      flex-direction: column;
      margin-top: 20px;
    }

    .divImg {
      display: none;
    }

    .header {
      flex: 1;
      max-width: 100%;
      justify-content: center;
    }

    @media only screen and (max-width: 425px) {
      .cards {
        display: none;
      }

      .header {
        text-align: start;
      }

      .finalText {
        text-align: start;
      }
    }
  }

`;

export const ButtonAbout = styled.button`
  width: 132px;
  height: 48px;
  border-radius: 48px;
  background: ${({ theme }) => theme.colors.yellows.main};
  border: none;
  transition: 0.4s ease;

  span {
    font-weight: 700;
    font-size: 16px;
  }

  &:hover {
    span {
      color: ${({ theme }) => theme.colors.textColorWhite};
    }
  }
`;

export const DivContainerHeadline = styled.div`
  margin: 64px 0px 44px 64px;
  font: normal 40px/50px Sora, sans-serif;

  h1 {
    color: ${({ theme }) => theme.colors.yellows.main};
    & + h1 {
      color: ${({ theme }) => theme.colors.green.main};
      margin-bottom: 24px;
      margin-top: 32px;
    }
  }

  b {
    float: left;
    overflow: hidden;
    position: relative;
    height: 50px;
  }

  button {
    margin-top: 30px;

    &:hover {
      background: ${({ theme }) => theme.colors.blue.main};
    }
  }

  div {
    display: inline-block;
    color: ${({ theme }) => theme.colors.oranges.main};
    position: relative;
    white-space: nowrap;
    top: 0;
    left: 0;

    animation: move 10s infinite;
  }

  @keyframes move{
    0%  { top: 0px; }
    20% { top: -50px; }
    40% { top: -100px; }
    60% { top: -150px; }
  }

  @-webkit-keyframes move {
    0%  { top: 0px; }
    20% { top: -50px; }
    40% { top: -100px; }
    60% { top: -150px; }
  }
  @-moz-keyframes move {
     0%  { top: 0px; }
     20% { top: -50px; }
     40% { top: -100px; }
     60% { top: -150px; }
  }
  @-o-keyframes move {
    0%  { top: 0px; }
    20% { top: -50px; }
    40% { top: -100px; }
    60% { top: -150px; }
  }

  @media only screen and (max-width: 1000px) {
    justify-content: center;
    align-items: center;
  }
`;

export const ButtonOptionRegister = styled.button`
  background: ${({ theme }) => theme.colors.gray[200]};
  padding: 8px;
  width: 100%;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  transition: all 0.15s ease-in-out;
  &:first-child {
    margin-bottom: 5px;
  }
  &:hover {
    background: ${({ theme }) => theme.colors.gray[300]};
    border-radius: 0;
  }
`;

export const Footer = styled.div`
  bottom: 0;
  width: 100%;
  height: 35px;
  background: ${({ theme }) => theme.colors.purples.gray};
  align-items: center;
  justify-content: space-evenly;
  display: flex;
  color: ${({ theme }) => theme.colors.gray[200]};

  a {
    color: ${({ theme }) => theme.colors.textColorWhite};
    transition: all 0.2s;

    &:hover {
      color: ${({ theme }) => theme.colors.danger.main};
    }
  }

  @media only screen and (max-width: 425px) {
    display: none;
  }
`;
