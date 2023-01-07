/* eslint-disable no-nested-ternary */
import styled from 'styled-components';
import { TMessageError } from '../../utils/types/globaTypes';

type TError = {
  errors: TMessageError[];
}

export const Container = styled.form<TError>`
  margin: 200px auto;
  width: 410px;
  height: ${({ errors }) => (errors.length === 1 ? '335px' : (
    errors.length === 2
      ? '355px'
      : '320px'
  ))};

  background: ${({ theme }) => theme.colors.yellows.main};

  -webkit-box-shadow: ${({ theme }) => theme.shadows.webkitBoxShadow};
  -moz-box-shadow: ${({ theme }) => theme.shadows.mozBoxShadow};
  box-shadow: ${({ theme }) => theme.shadows.boxShadow};
  border-radius: ${({ theme }) => theme.borderRadius};

  h1, h4 {
    justify-content: center;
    align-items: center;
    display: grid;
    color: ${({ theme }) => theme.colors.textColorBlack};
  }
  h1 {
    padding-top: 20px;
  }
  small {
    color: ${({ theme }) => theme.colors.textColorBlack};
  }
`;

export const DivInputs = styled.div`
  margin-top: 10px;
  display: grid;
  justify-content: center;
  align-items: center;
`;
