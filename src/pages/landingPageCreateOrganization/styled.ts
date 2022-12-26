import styled from 'styled-components';

export const Container = styled.div`
  width: 90%;
  margin: 0px auto;
  text-align: center;

  img {
    border: 0.1px solid ${({ theme }) => theme.colors.purples.details};
    width: 600px;
    transition: all 0.2s;
    z-index: 1;

    &:hover {
      z-index: 0;
      transform: scale(1.05)
    }
  }

  a {
    margin-left: 8px;
    color: ${({ theme }) => theme.colors.gray[300]};

    &:hover {
      color: ${({ theme }) => theme.colors.gray[100]};
    }
  }

  .arrowImagesAnswer {
    background: transparent;
    border: none;

    img {
      z-index: 2;
      width: 30px;
      margin: 50px 0px;
      border: none;
      transform: scale(1) rotate(-270deg) translate(0px, -50px);
    }

  }

  .divone {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-bottom: 30px;
    margin-top: 30px;
  }

  .divtwo {
    display: grid;
    justify-content: center;
    align-items: center;
  }
`;

export const Header = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: -1px;
  width: 100%;
  height: 50px;
  background: #310663;
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 400;

  justify-content: space-evenly;
  text-align: center;
  align-items: center;
  display: flex;

  .link {
    text-decoration: none;
    color: #fff;
    transition: all 0.2s;
    font-size: 20px;
    font-weight: bold;

    &:hover {
      color: ${({ theme }) => theme.colors.danger.main};
    }
  }

  .OptionButton {
    border: none;
    background: transparent;

    h3 {
      color: white;
      font-size: 20px;
      transition: all 0.2s;

      &:hover {
        color: ${({ theme }) => theme.colors.gray[300]}
      }
    }

  }
`;

export const Footer = styled.div`
  bottom: 0;
  margin-top: 20px;
  width: 100%;
  height: 35px;
  background: #310663;
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
`;
