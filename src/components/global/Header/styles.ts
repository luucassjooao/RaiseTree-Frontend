import styled from 'styled-components';

export const ContainerHeader = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 60px;
  padding-left: 24px;
  justify-content: space-around;
  align-items: center;
  display: flex;

  background: ${({ theme }) => theme.colors.yellows.main};
  opacity: 1;

  button {
    background: transparent;
    border: none;
    font-size: 26px;
  }

   h2, button {
    color: ${({ theme }) => theme.colors.textColorBlack};
   }
`;

export const DivHeaderRight = styled.div`
  float: right;
  padding-right: 24px;
`;

export const Button = styled.button`
  background: ${({ theme }) => theme.colors.gray[200]};
  padding: 8px;
  width: 100%;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  transition: all 0.15s ease-in-out;
  &:first-child {
    margin-bottom: 5px;
  }
  &:hover {
    background: ${({ theme }) => theme.colors.gray[300]};
    border-radius: 0;
  }
`;