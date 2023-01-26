import styled, { css, keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const scaleIn = keyframes`
  from { transform: scale(0); }
  to { transform: scale(1); }
`;

const scaleOut = keyframes`
  from { transform: scale(1); }
  to { transform: scale(0); }
`;

export const Overlay = styled.div<{ isLeaving: boolean }>`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;

  .divColorBackground {
    padding: 16px 32px;
    background: ${({ theme }) => theme.colors.textColorWhite};

    button {
      margin-top: 8px;
    }
  }

  animation: ${fadeIn} 0.3s;

  ${({ isLeaving }) => isLeaving && css`animation: ${fadeOut} 0.2s forwards;`}
`;

export const Container = styled.div<{ isLeaving: boolean }>`
  width: 900px;
  display: flex;
  flex-direction: column;
  animation: ${scaleIn} 0.3s;

  ${({ isLeaving }) => isLeaving && css`animation: ${scaleOut} 0.2s forwards;`}
`;

export const CalendarHeader = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  text-align: center;

  color: ${({ theme }) => theme.colors.purples.details};

  h1 {
    margin-right: 8px;
  }
`;

export const CalendarBody = styled.div`
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  border: 2px solid ${({ theme }) => theme.colors.purples.background};
  padding: 8px;
`;

export const TableHeader = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;

  .weekday {
    width: 100px;
    text-align: center;
    color: ${({ theme }) => theme.colors.purples.gray};
  }
`;
