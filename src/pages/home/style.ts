import styled from 'styled-components';

export const Container = styled.div`
  @media only screen and (max-width: 629px) {
    justify-content: center;
    align-items: center;
    display: grid;
    flex-direction: column;
  }
`;

type TVisibleActivityArrow = {
  visible?: boolean;
}

export const TitleMatter = styled.h1<TVisibleActivityArrow>`
  margin-left: 15px;

  button {
    display: none;
  }

  @media only screen and (max-width: 768px) {
    text-align: center;

    button {
      display: inline-block;
      margin-left: 8px;
      background: transparent;
      border: none;

      img {
        transform: ${({ visible }) => (!visible ? 'rotate(0deg)' : 'rotate(180deg)')};
        transition: transform 0.2s ease-in;
      }
    }
  }
`;

export const CardsActivities = styled.div`
  display: inline-flex;
  margin-left: 15px;
  margin-top: 15px;

  @media only screen and (max-width: 768px) {
    justify-content: center;
  }
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
