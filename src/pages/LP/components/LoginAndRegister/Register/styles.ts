import styled from 'styled-components';

export const DivButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;

  button {
    border-radius: 0;
    border: 1px solid ${({ theme }) => theme.colors.button.primary};

    &:first-child {
      border-top-left-radius: ${({ theme }) => theme.borderRadius};
      border-bottom-left-radius: ${({ theme }) => theme.borderRadius};
    }
    &:last-child {
      border-top-right-radius: ${({ theme }) => theme.borderRadius};
      border-bottom-right-radius: ${({ theme }) => theme.borderRadius};
    }
  }

  @media only screen and (max-width: 525px) {
    justify-content: flex-start;
    margin: 0px 10px;
  }
`;

export const ContainerInputsRegisters = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;

  small {
    color: ${({ theme }) => theme.colors.textColorBlack};
  }

  @media only screen and (max-width: 525px) {
    justify-content: flex-start;
    margin: 0px 30px;
  }
`;

export const ChoosingContainer = styled.form`
  margin: 120px auto;
  display: grid;
  justify-content: center;
  align-items: center;

  h3 {
    color: ${({ theme }) => theme.colors.textColorBlack};
  }

  @media only screen and (max-width: 525px) {
    align-items: flex-start;
    justify-content: flex-start;
    margin: 80px 10px;

    h3 {
      word-break: break-word;
      padding: 0px 30px;
    }
  }

  @media only screen and (max-width: 425px) {
    h3 {
    }
  }
`;
