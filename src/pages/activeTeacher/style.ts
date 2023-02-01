import styled from 'styled-components';

export const Container = styled.form`
  margin: 200px auto;
  max-width: 450px;
  color: ${({ theme }) => theme.colors.textColorBlack};
  height: 290px;
  background: ${({ theme }) => theme.colors.yellows.main};
  box-shadow: ${({ theme }) => theme.shadows.boxShadow};
  -moz-box-shadow: ${({ theme }) => theme.shadows.mozBoxShadow};
  -webkit-box-shadow: ${({ theme }) => theme.shadows.webkitBoxShadow};
  border-radius: ${({ theme }) => theme.borderRadius};
  justify-content: center;
  align-items: center;
  text-align: center;

  h2 {
    padding-top: 20px;
  }
`;
