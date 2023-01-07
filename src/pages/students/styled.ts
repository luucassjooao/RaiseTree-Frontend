import styled from 'styled-components';

export const Container = styled.div`

  .divButtonsClassrooms {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const ButtonClassroom = styled.button`
  padding: 8px;
  margin: 4px;
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px solid ${({ theme }) => theme.colors.purples.details};
  font-size: 14px;
  font-weight: 400;
  background: ${({ theme }) => theme.colors.purples.details};
  color: ${({ theme }) => theme.colors.textColorWhite};

  transition: all 0.3s;
  &:hover {
    background: ${({ theme }) => theme.colors.button.primary};
  }
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
    transition: 0.2s all;

    &:hover {
      background: ${({ theme }) => theme.colors.green.main};
      color: ${({ theme }) => theme.colors.textColorWhite};
    }
  }

  button {
    width: 100%;
    height: 100%;
    border: solid ${({ theme }) => theme.colors.yellows.main};
    background: ${({ theme }) => theme.colors.yellows.main};
  }
`;

export const DivSideBar = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 20px;
`;

export const DivSideBarActivity = styled.div`
  display: grid;
  justify-content: center;
  text-align: center;
  margin: 20px auto;
`;

type TInput = {
  isSelected: boolean;
}

export const InputButton = styled.input<TInput>`
  background: ${({ isSelected, theme }) => (isSelected ? theme.colors.yellows.main : theme.colors.purples.details)};
  color: ${({ isSelected, theme }) => (isSelected ? theme.colors.textColorBlack : theme.colors.textColorWhite)};

  padding: 8px;
  margin: 4px;
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px solid ${({ theme }) => theme.colors.purples.details};
  font-size: 14px;
  font-weight: 400;

  transition: all 0.3s;
  &:hover {
    background: ${({ isSelected, theme }) => (isSelected ? theme.colors.green.main : theme.colors.button.hover)};
    color: ${({ isSelected, theme }) => (isSelected && theme.colors.textColorWhite)};
  }
`;
