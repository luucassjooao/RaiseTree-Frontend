import styled, { css } from 'styled-components';

type SizeButton = {
  size: number;
  isStudent?: boolean;
  isRegister?: boolean;
  yellowBackground?: boolean;
  purpleBackground?: boolean;
  isPropTrue?: boolean;
  danger: boolean;
}

export const StyledButton = styled.button<SizeButton>`
  background: ${({ theme }) => theme.colors.yellows.main};
  color: ${({ theme }) => theme.colors.textColorBlack};
  width: ${({ size }) => `${size}px`};
  height: 42px;
  border-radius: ${({ theme }) => theme.borderRadius};
  border: none;

  &:hover{
    transition: 0.2s ease-in-out;
    color: ${({ theme }) => theme.colors.textColorWhite};
    background: ${({ theme }) => theme.colors.button.hover};
  }

  &[disabled] {
    background: ${({ theme }) => theme.colors.button.disabled};
    color: ${({ theme }) => theme.colors.textColorWhite};
    cursor: not-allowed;

    &:hover {
      background: ${({ theme }) => theme.colors.button.disabled};
    }
  }

  ${({ yellowBackground }) => yellowBackground === true && css`
    background: ${({ theme }) => theme.colors.button.primary};
    color: ${({ theme }) => theme.colors.textColorWhite};

    &:hover{
      transition: 0.2s ease-in-out;
      background: ${({ theme }) => theme.colors.button.hover};
    }
  `}

  ${({ danger, theme }) => danger && css`
    background: ${theme.colors.danger.main};
  `}


  ${({ isRegister, isStudent }) => (isRegister === true
    ? css`
      color: ${({ theme }) => theme.colors.textColorWhite};
      ${isStudent === true
      ? css`
      &:first-child {
      background: ${({ theme }) => theme.colors.button.primary};
    }
    &:last-child {
      background: ${({ theme }) => theme.colors.button.hover};
    }
  `
      : css`
      &:first-child {
      background: ${({ theme }) => theme.colors.button.hover};
    }
    &:last-child {
      background: ${({ theme }) => theme.colors.button.primary};
    }
    `}
    `
    : null)}

${({ purpleBackground, isPropTrue }) => (purpleBackground === true
    ? css`
      ${isPropTrue === true
      ? css`
      &:first-child {
        color: ${({ theme }) => theme.colors.textColorBlack};
      background: ${({ theme }) => theme.colors.yellows.main};
      }
      &:last-child {
        color: ${({ theme }) => theme.colors.textColorWhite};
        background: #fb5607;
      }
  `
      : css`
      &:first-child {
        color: ${({ theme }) => theme.colors.textColorWhite};
        background: #fb5607;
    }
    &:last-child {
      color: ${({ theme }) => theme.colors.textColorBlack};
      background: ${({ theme }) => theme.colors.yellows.main};
    }
    `}
    `
    : null
  )}
`;
