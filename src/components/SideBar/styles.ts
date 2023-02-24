import styled, { css, keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

type PropsSideBar = {
  side: 'left' | 'right';
  size: number;
  colorBackground: string;
  isLeaving: boolean;
}

export const Overlay = styled.div<Pick<PropsSideBar, 'isLeaving'>>`
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(1px);
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.3s;

  ${({ isLeaving }) => isLeaving && css`animation: ${fadeOut} 0.2s forwards;`}

  .div-spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 50% auto;
  }
`;

export const Container = styled.div<PropsSideBar>`
  z-index: 999;
  position: fixed;
  ${({ side }) => (side === 'left' ? css`
    left: 0;
  ` : css`
    right: 0;
  `)}
  background: ${({ colorBackground }) => `${colorBackground}`};
  width: ${({ size }) => `${size}px`};
  height: 100vh;
  color: ${({ theme }) => theme.colors.textColorWhite};
  top: 0;
  overflow: auto;
`;
