import styled from 'styled-components';

type width500 = {
  is500: boolean;
}

export default styled.select<width500>`
  width: ${({ is500 }) => (is500 ? '500px' : '410px')};
  background: ${({ theme }) => theme.colors.textColorWhite};
  box-shadow: ${({ theme }) => theme.shadowsInput.boxShadow};
  height: 52px;
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px solid ${({ theme }) => theme.colors.textColorWhite};
  outline: none;
  padding: 0 16px;
  font-size: 16px;
  transition: border-color 0.2s ease-in;
  appearance: none;
  margin-top: 15px;

  &:focus {
    border-color: ${({ theme }) => theme.colors.purples.background}
  }

  &[disabled] {
    background-color: ${({ theme }) => theme.colors.gray[100]};
    border-color: ${({ theme }) => theme.colors.gray[200]};
    opacity: 1;
  }
`;
