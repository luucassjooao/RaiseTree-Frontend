import styled from 'styled-components';

export const ContainerCards = styled.div`
  background: ${({ theme }) => theme.colors.cardsBackground};
  color: ${({ theme }) => theme.colors.textColorBlack};
  width: 300px;
  padding: 8px 8px 12px 8px;
  border: gray 1px solid;
  border-radius: ${({ theme }) => theme.borderRadius};
  -webkit-box-shadow: ${({ theme }) => theme.shadows.webkitBoxShadow};
  box-shadow: ${({ theme }) => theme.shadows.boxShadow};
  transition: all 0.2s ease-in;
  text-align: center;
  word-break: break-word;

  img {
    width: 300px;
    height: 250px;
  }

  h4 {
    padding: 4px 0px;
  }

  small {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.button.disabled};
  }

  &:hover {
    transform: scale(1.03);
  }
`;

export const Details = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.purples.details};
`;
