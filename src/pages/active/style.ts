import styled from 'styled-components';

type TypeContainer = {
  error: boolean;
}

export const Container = styled.div<TypeContainer>`
  margin: 200px auto;
  width: 450px;
  color: ${({ theme }) => theme.colors.textColorBlack};
  height: ${({ error }) => (error ? '190px' : '170px')};
  background: ${({ theme }) => theme.colors.yellows.main};
  box-shadow: ${({ theme }) => theme.shadows.boxShadow};
  -moz-box-shadow: ${({ theme }) => theme.shadows.mozBoxShadow};
  -webkit-box-shadow: ${({ theme }) => theme.shadows.webkitBoxShadow};
  border-radius: ${({ theme }) => theme.borderRadius};
  justify-content: center;
  align-items: center;

  h1:first-child {
    padding-top: 30px;
  }

  h1 {
    font-size: 30px;
    display: flex;
    align-self: center;
    justify-content: center;
    word-break: break-word;
  }

  h2 {
    margin-top: 10px;
    word-break: break-word;
    display: flex;
    align-self: center;
    justify-content: center;
  }
`;
