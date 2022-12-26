import styled from 'styled-components';

type IsStudent = {
  isStudent: boolean;
}

export const Container = styled.div<IsStudent>`
  margin: 100px auto 0 auto;
  height: ${({ isStudent }) => (isStudent === true ? '515px' : '580px')};
  width: 500px;
  background: ${({ theme }) => theme.colors.yellows.main};
  border-radius: ${({ theme }) => theme.borderRadius};
  -webkit-box-shadow: ${({ theme }) => theme.shadows.webkitBoxShadow};
  -moz-box-shadow: ${({ theme }) => theme.shadows.mozBoxShadow};
  box-shadow: ${({ theme }) => theme.shadows.boxShadow};

  small {
    color: #000;
  }
`;

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
