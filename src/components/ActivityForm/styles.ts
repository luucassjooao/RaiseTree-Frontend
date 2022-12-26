import styled from 'styled-components';

export const Form = styled.form`
  h1 {
    display: flex;
    justify-content: center;
  }

  select {
    margin-top: 10px;
  }

  small {
    margin-left: 5px;
  }
`;

export const ContainerForm = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const Title = styled.h2`
  margin-top: 10px;
  margin-bottom: -10px;
`;

export const TitleDescription = styled.h2`
  margin-top: 10px;
  margin-bottom: -5px;
`;

export const TitlePoints = styled.h3`
  &:nth-child(2) {
    margin-top: 20px;
    margin-bottom: -5px;
  }
`;

export const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

export const DivCardHome = styled.div`
  display: grid;
`;
