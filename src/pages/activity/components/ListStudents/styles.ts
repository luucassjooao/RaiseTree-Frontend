import styled from 'styled-components';

export const H1Headline = styled.h1`
  margin-top: 14px;
  text-align: center;
`;

export const ContainerTable = styled.table`
  margin: 25px auto;
  border-collapse: collapse;
  border: 1px solid ${({ theme }) => theme.colors.gray[50]};
  color: ${({ theme }) => theme.colors.textColorWhite};
  box-shadow: 0px 0px 20px rgba(0,0,0,0.10),
     0px 10px 20px rgba(0,0,0,0.05),
     0px 20px 20px rgba(0,0,0,0.05),
     0px 30px 20px rgba(0,0,0,0.05);
  tr {
    background: ${({ theme }) => theme.colors.textColorWhite};
    &:hover {
      background: ${({ theme }) => theme.colors.yellows.main};

      td {
        color: ${({ theme }) => theme.colors.textColorBlack};
      }
    }
  }

  th, td {
    color: ${({ theme }) => theme.colors.textColorBlack};
    border: 1px solid ${({ theme }) => theme.colors.gray[50]};
    padding: 12px 35px;
    border-collapse: collapse;
  }
  th {
    background: ${({ theme }) => theme.colors.oranges.main};
    color: ${({ theme }) => theme.colors.textColorWhite};
    text-transform: uppercase;
    font-size: 12px;
  }

  .tdAnswer {
    cursor: pointer;
    background: ${({ theme }) => theme.colors.yellows.main};
    border: 1px solid ${({ theme }) => theme.colors.yellows.main};
  }

  button {
    width: 100%;
    height: 100%;
    border: solid ${({ theme }) => theme.colors.yellows.main};
    background: ${({ theme }) => theme.colors.yellows.main};
  }
`;
