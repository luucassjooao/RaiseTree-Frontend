import styled from 'styled-components';

export const Container = styled.div`
  margin: 200px auto;
  padding: 30px;
  width: 450px;
  background: ${({ theme }) => theme.colors.button.primary};
  text-align: center;
  border-radius: ${({ theme }) => theme.borderRadius};

  h2 {
    margin-top: 4px;
  }
`;
