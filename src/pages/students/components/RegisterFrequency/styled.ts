import styled, { css } from 'styled-components';

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
    }
  }

  th, td {
    text-align: center;
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

  .watch-frequency {
    cursor: pointer;
    background: ${({ theme }) => theme.colors.blue.main};
    color: ${({ theme }) => theme.colors.textColorWhite};
    transition: 0.2s all;

    &:hover {
      background: ${({ theme }) => theme.colors.blue.secondary};
    }
  }

  button {
    width: 100%;
    height: 100%;
    border: solid ${({ theme }) => theme.colors.yellows.main};
    background: ${({ theme }) => theme.colors.yellows.main};
  }
`;

type TFrequency = {
  frequency: boolean;
  isPresenceToday: boolean | null;
}

export const TDInfoStudentFrequency = styled.td<TFrequency>`
  background: ${({ theme, frequency }) => (frequency ? theme.colors.green.main : theme.colors.danger.main)};
  color: ${({ theme }) => theme.colors.textColorWhite} !important;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.colors.yellows.main};
  transition: 0.2s all;

  &:hover {
    background: ${({ theme, frequency }) => (frequency ? theme.colors.green.secondary : theme.colors.oranges.main)};
  }

  ${({ isPresenceToday }) => isPresenceToday && css`
    background: ${({ theme }) => theme.colors.gray[200]};
    color: ${({ theme }) => theme.colors.textColorBlack};

    &:hover {
      background: ${({ theme }) => theme.colors.gray[200]};
      color: ${({ theme }) => theme.colors.textColorBlack};
    }
  `}
`;
