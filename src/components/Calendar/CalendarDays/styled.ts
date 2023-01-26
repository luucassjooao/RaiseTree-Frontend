import styled from 'styled-components';

export const TableContent = styled.div`
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  box-sizing: border-box;

  .calendar-day {
    width: 125px;
    height: 75px;
    position: relative;
    border: 1px solid ${({ theme }) => theme.colors.gray[900]};

    p {
      position: absolute;
      right: 10px;
      color: ${({ theme }) => theme.colors.danger.main};
    }

  }
  .current {
    p {
      color: ${({ theme }) => theme.colors.purples.details};
    }
  }

  .not-current {
    background: ${({ theme }) => theme.colors.oranges.main};
    p {
      color: ${({ theme }) => theme.colors.textColorWhite};
    }
  }

  .picking-dates {
    background: ${({ theme }) => theme.colors.yellows.main};
  }
`;
