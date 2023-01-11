import styled, { css } from 'styled-components';

type TInput = {
  size?: number;
  error?: string;
}

export const Input = styled.input<TInput>`
  margin-top: 15px;
  width: ${({ size }) => `${size}px`};
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

  &:focus {
    border-color: ${({ theme }) => theme.colors.purples.background};
  }

  ${({ theme, error }) => error && css`
    color: ${theme.colors.danger.main};
    border: 2px solid ${theme.colors.danger.main} !important;
  `}
`;
