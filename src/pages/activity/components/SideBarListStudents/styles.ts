import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    margin-top: 30px;

    .headersDiv {
      display: grid;
      justify-content: center;
      align-content: center;
    }

    .divNote {
      margin: 0px auto;
      width: 90%;
      display: flex;
    }

    h2, span {
      margin: 4px;
      align-items: center;
      justify-content: center;
      text-align: center;
      margin-left: 15px;
      margin-right: 15px;
    }

    h2 {
      color: ${({ theme }) => theme.colors.gray[100]}
    }

  button {
    margin: 0px auto;
  }

  .divAnswer {
    font-size: 18px;
    font-weight: 500;
    margin: 20px;
  }

  .buttonBack {
    margin-top: 12px;
    background: ${({ theme }) => theme.colors.oranges.main};
    color: ${({ theme }) => theme.colors.textColorWhite};

    &:hover {
      background: ${({ theme }) => theme.colors.danger.main};
    }
  }
`;
