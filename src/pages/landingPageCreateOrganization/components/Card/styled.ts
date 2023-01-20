import styled from 'styled-components';

export const StyledCard = styled.div`
  padding: 24px 88px 24px 24px;
  flex: 1;
  border: 2px solid #fff;

  img {
    display: none;
  }

  &:hover {
    padding: 0;

    img {
      display: flex;
      width: 100%;
      height: 100%;
    }

    h1 {
      display: none;
    }
  }
`;
