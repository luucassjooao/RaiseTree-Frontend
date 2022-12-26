import styled from 'styled-components';

export const Container = styled.div`
  margin-bottom: 10%;
`;

export const ContainerHeaderActivity = styled.div`
  width: 90%;
  margin: 30px auto 0 auto;
  word-break: break-word;

  h1, h3 {
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  h3 {
    margin: 18px 0;
  }

  hr {
    width: 100vh !important;
  }
`;

export const ContainerFooterActivity = styled.div`
  margin-left: 52px;
  margin-top: 25px;
`;

export const ContainerAnswer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.textColorWhite};
  width: 90%;
  padding: 10px;
  margin-left: 30px;
  margin-top: 8px;
  margin-bottom: 15px;
`;

export const DivButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

  button {
    border-radius: 0;
    border: 1px solid ${({ theme }) => theme.colors.oranges.main};

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
