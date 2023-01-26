import styled, { css } from 'styled-components';

export const Container = styled.div`

  .divTypeView {
    margin: 16px 0;
  }

  .divButtonsClassrooms, .divTypeView {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .divButtonConfirmFrequency {
    align-items: center;
    justify-content: center;
    display: flex;
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

      /* td {
        color: ${({ theme }) => theme.colors.textColorBlack};
      } */
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

type TTDCountActivities = {
  activities: boolean;
}

export const TDCountActivities = styled.td<TTDCountActivities>`
  cursor: ${({ activities }) => (activities ? 'point' : 'not-allowed')};
  background: ${({ theme, activities }) => (activities ? theme.colors.yellows.main : theme.colors.gray[200])};
  border: 1px solid ${({ theme }) => theme.colors.yellows.main};
  transition: 0.2s all;

  &:hover {
    background: ${({ theme, activities }) => (activities && theme.colors.green.main)};
    color: ${({ theme, activities }) => (!activities ? theme.colors.textColorBlack : theme.colors.textColorWhite)};
  }
`;

type TFrequency = {
  frequency: boolean;
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
  typeView: 'primary' | 'secondary';
}

export const InputButton = styled.input<TInput>`
  ${({ typeView }) => (typeView === 'primary' ? css<TInput>`
  background: ${({ isSelected, theme }) => (isSelected ? theme.colors.purples.details : theme.colors.yellows.main)};
  color: ${({ isSelected, theme }) => (isSelected ? theme.colors.textColorWhite : theme.colors.textColorBlack)};
  &:hover {
    background: ${({ isSelected, theme }) => (isSelected ? theme.colors.button.hover : theme.colors.green.main)};
    color: ${({ isSelected, theme }) => (!isSelected && theme.colors.textColorWhite)};
  }
  ` : css<TInput>`
  background: ${({ isSelected, theme }) => (isSelected ? theme.colors.blue.secondary : theme.colors.oranges.main)};
  color: ${({ theme }) => theme.colors.textColorWhite};
  &:hover {
    background: ${({ isSelected, theme }) => (isSelected ? theme.colors.blue.main : theme.colors.green.main)};
  }
  `)}

  padding: 8px;
  margin: 4px;
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px solid ${({ theme }) => theme.colors.purples.details};
  font-size: 14px;
  font-weight: 400;

  transition: all 0.3s;
`;

export const CardsPeoples = styled.div`
  margin: 8px 0;
  padding: 8px;
  background: ${({ theme }) => theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius};
`;
