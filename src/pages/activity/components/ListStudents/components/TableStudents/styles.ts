import styled from 'styled-components';

export const Container = styled.table`
  margin: 25px auto;
  border-collapse: collapse;
  border: 1px solid ${({ theme }) => theme.colors.gray[50]};
  border-bottom: 2px solid ${({ theme }) => theme.colors.oranges.main};
  color: ${({ theme }) => theme.colors.textColorWhite};
  box-shadow: 0px 0px 20px rgba(0,0,0,0.10),
     0px 10px 20px rgba(0,0,0,0.05),
     0px 20px 20px rgba(0,0,0,0.05),
     0px 30px 20px rgba(0,0,0,0.05);
  tr {
    background: ${({ theme }) => theme.colors.textColorWhite};
    &:hover {
      td {
        color: ${({ theme }) => theme.colors.textColorWhite};
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

`;
