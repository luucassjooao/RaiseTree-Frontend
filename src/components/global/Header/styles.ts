import styled from 'styled-components';

export const ContainerHeader = styled.div`
position: fixed;
top: 0;
right: 0;
width: 100%;
height: 60px;
padding-left: 24px;
justify-content: space-around;
align-items: center;
display: flex;
z-index: 9;

background: ${({ theme }) => theme.colors.yellows.main};
opacity: 1;

button {
  background: transparent;
  border: none;
  align-items: center;
  justify-content: center;
}

h2, button {
  color: ${({ theme }) => theme.colors.textColorBlack};
}

img {
  height: 64px;
}

.options-phone {
  display: none;
}

@media only screen and (max-width: 768px) {
  .options-phone {
    display: inline-block;
  }
  .button-fixed-option {
    display: none;
  }
}
`;

export const DivHeaderRight = styled.div`
float: right;
padding-right: 24px;

@media only screen and (max-width: 768px) {
  display: none;
}
`;

export const Button = styled.button`
background: ${({ theme }) => theme.colors.gray[200]};
padding: 8px;
width: 100%;
border: none;
border-radius: ${({ theme }) => theme.borderRadius};
transition: all 0.15s ease-in-out;
&:first-child {
  margin-bottom: 5px;
}
&:hover {
  background: ${({ theme }) => theme.colors.gray[300]};
  border-radius: 0;
}
`;

export const DivOptionsDropDown = styled.div`
border-top: 1px solid ${({ theme }) => theme.colors.purples.gray};
right: 0;
position: fixed;
background: rgb(36,0,70);
align-items: center;
flex-direction: column;
display: grid;
z-index: 99;

button {
  padding: 8px;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.purples.gray};
  max-width: 100%;

  span {
    font-size: 28px;
  }

  .login-span {
    color: ${({ theme }) => theme.colors.yellows.main};
  }
  .register-span {
    color: ${({ theme }) => theme.colors.green.main};
  }

  .about-span {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.oranges.main};
  }
}
`;

export const SpanLinks = styled.span`
font-size: 26px;
font-weight: 700;
transition: all 0.3s;

&:hover {
  background: ${({ theme }) => theme.colors.button.hover};
  color: ${({ theme }) => theme.colors.textColorWhite};
  padding: 8px;
  border-radius: 45px;
}
`;
