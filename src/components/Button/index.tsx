import React from 'react';
import Spinner from '../Spinner';
import { StyledButton } from './styled';

interface TButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  size: number;
  isStudent?: boolean;
  isRegister?: boolean;
  yellowBackground?: boolean;
  purpleBackground?: boolean;
  isPropTrue?: boolean;
  danger?: boolean;
}

export default function Button({
  disabled,
  onClick,
  isLoading,
  children,
  size,
  isRegister = false,
  isStudent = false,
  yellowBackground,
  purpleBackground,
  isPropTrue,
  danger = false,
  ...props
}: TButton) {
  return (
    <StyledButton
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      disabled={disabled || isLoading}
      onClick={onClick}
      size={size}
      isRegister={isRegister}
      isStudent={isStudent}
      yellowBackground={yellowBackground}
      purpleBackground={purpleBackground}
      isPropTrue={isPropTrue}
      danger={danger}
    >
      <>
        {!isLoading && children}
        {isLoading && <Spinner size={18} />}
      </>
    </StyledButton>
  );
}
