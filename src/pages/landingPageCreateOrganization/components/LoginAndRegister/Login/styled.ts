import styled from 'styled-components';

export const ChoosingContainer = styled.form`
  margin: 120px auto;
  display: grid;
  justify-content: center;
  align-items: center;

  h3 {
    color: ${({ theme }) => theme.colors.textColorBlack};
  }

  @media only screen and (max-width: 525px) {
    align-items: flex-start;
    justify-content: flex-start;
    margin: 120px 40px;
  }
`;
