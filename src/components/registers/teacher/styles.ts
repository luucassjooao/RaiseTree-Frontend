import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  h4 {
    color: ${({ theme }) => theme.colors.textColorBlack};
  }

  button, span {
    margin-top: 10px;
  }
`;

export const NameClassroom = styled.div`
  display: flex;
`;
