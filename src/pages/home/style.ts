import styled from 'styled-components';

export const Container = styled.div``;

export const TitleMatter = styled.h1`
  margin-left: 15px;
`;

export const CardsActivities = styled.div`
  display: inline-flex;
  margin-left: 15px;
  margin-top: 15px;
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
