import styled from 'styled-components';

export const Form = styled.form`
  h1 {
    display: flex;
    justify-content: center;
  }

  select {
    margin-top: 10px;
  }

  small {
    margin-left: 5px;
  }

  @media only screen and (max-width: 720px) {
    .inputForm {
      width: 90%;
    }

    .countLength {
      transform: translate(-60px, 16px);
      color: ${({ theme }) => theme.colors.danger.main};
    }
  }

  @media only screen and (max-width: 1065px) {
    align-items: center;
    word-break: word-break;
    text-align: center;

    .divMultiClassrooms {
      justify-content: center;
      align-items: center;
      display: flex;
    }

    .countLength {
      position: absolute;
      margin-top: 33px;
    }
  }

  @media only screen and (max-width: 545px) {
    margin: 0px;
    h2 {
      font-size: 100%;
      word-break: word-break;
    }

    .inputForm {
      width: 70%;
    }

    .divMultiClassrooms {
      width: 70%;
      margin: 0px auto;
    }
  }
`;

export const ContainerForm = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const Title = styled.h2`
  margin-top: 10px;
  margin-bottom: -10px;

  @media only screen and (max-width: 1065px) {
    text-align: center;
  }
`;

export const TitleDescription = styled.h2`
  margin-top: 10px;
  margin-bottom: -5px;
`;

export const TitlePoints = styled.h3`
  &:nth-child(2) {
    margin-top: 20px;
    margin-bottom: -5px;
  }
`;

export const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

export const DivCardHome = styled.div`
  display: grid;

  @media only screen and (max-width: 1065px) {
    display: none;
  }
`;
