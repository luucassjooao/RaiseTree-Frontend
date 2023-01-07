import styled from 'styled-components';

export const Container = styled.div`
  margin: 100px auto;
  width: 400px;
  background: ${({ theme }) => theme.colors.yellows.main};
  -webkit-box-shadow: ${({ theme }) => theme.shadows.webkitBoxShadow};
  -moz-box-shadow: ${({ theme }) => theme.shadows.mozBoxShadow};
  box-shadow: ${({ theme }) => theme.shadows.boxShadow};
  border-radius: ${({ theme }) => theme.borderRadius};
  text-align: center;

  h2, small {
    color: ${({ theme }) => theme.colors.purples.details}
  }

  select {
    width: 350px;
  }
`;

export const ContainerWrapper = styled.form`
  padding: 30px;
  display: grid;

  .link {
    font-size: 16px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.danger.main}
  }
`;
