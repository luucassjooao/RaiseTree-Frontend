import styled from 'styled-components';

export const Overlay = styled.div<{ themeBackground: 'blur' | 'light' }>`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: ${({ theme, themeBackground }) => (themeBackground === 'blur' ? 'rgba(0,0,0,0.6)' : theme.colors.textColorWhite)};
  backdrop-filter: ${({ themeBackground }) => themeBackground === 'blur' && 'blur(5px)'};

  display: flex;
  align-items: center;
  justify-content: center;
`;
