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
`;

export const ContainerInputsRegisters = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;

  small {
    color: ${({ theme }) => theme.colors.textColorBlack};
  }
`;
