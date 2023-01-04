import styled from 'styled-components';

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

export const ButtonBackAllActivity = styled.button`
  width: 220px;
  padding: 12px;
  font-size: 14px;
  background: ${({ theme }) => theme.colors.danger.main};
  transition: 0.2s all;
  border-radius: ${({ theme }) => theme.borderRadius};
  border: none;
  color: ${({ theme }) => theme.colors.textColorWhite};
  margin-bottom: 10px;

  &:hover {
    background: ${({ theme }) => theme.colors.oranges.main};
  }
`;
