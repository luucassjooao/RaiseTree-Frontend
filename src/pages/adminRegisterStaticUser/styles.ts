import styled from 'styled-components';

export const Container = styled.div`
  margin: 100px auto;
  width: 450px;
  background: ${({ theme }) => theme.colors.yellows.main};
  -webkit-box-shadow: ${({ theme }) => theme.shadows.webkitBoxShadow};
  -moz-box-shadow: ${({ theme }) => theme.shadows.mozBoxShadow};
  box-shadow: ${({ theme }) => theme.shadows.boxShadow};
  border-radius: ${({ theme }) => theme.borderRadius};
  text-align: center;

  h2, .p-primary, span {
    color: ${({ theme }) => theme.colors.purples.details};
  }

  .p-secondary, h3, h4 {
    color: ${({ theme }) => theme.colors.purples.background};
  }

  h4 {
    font-size: 18px;
  }

  select {
    width: 350px;
    margin: 0 auto;
    margin-top: 16px;
  }

  small {
    color: ${({ theme }) => theme.colors.danger.main}
  }

  .div-classrooms {
    display: inline-block;

    button {
      transition: all 0.3s;
      &:hover {
        background: ${({ theme }) => theme.colors.button.primary};
      }
    }
  }

  .button-copy-classroom {
    padding: 8px;
    margin: 4px;
    border-radius: ${({ theme }) => theme.borderRadius};
    border: 1px solid ${({ theme }) => theme.colors.purples.details};
    font-size: 14px;
    font-weight: 400;
    background: ${({ theme }) => theme.colors.purples.details};
    color: ${({ theme }) => theme.colors.textColorWhite};

    transition: all 0.3s;
      &:hover {
        background: ${({ theme }) => theme.colors.button.primary};
      }
  }

  .backOnChoosing {
    background: transparent;
    border: none;
    display: flex;
    align-items: center;

    h3 {
      padding-top: 5px;
      margin-left: 8px;
      font-weight: bold;
    }

    img {
      cursor: pointer;
      transform: rotate(270deg);
    }
  }

  .next-url-spreadsheet {
    align-items: flex-end;
    justify-content: end;
    display: flex;
    margin-top: 8px;

    button {
      transition: all 0.3s;
      &:hover {
        background: ${({ theme }) => theme.colors.button.primary};
      }
    }
  }

  .divMultiSelect {
    display: grid;
    justify-content: space-around;
    align-items: center;

    .rmsc {
      width: 350px;

      .dropdown-heading-value {
        text-align: start;
        span {
          color: #000;
        }
      }
    }
  }

  .divButtonsSubmits {
    margin-top: 12px;

    button:first-child {
      margin-bottom: 8px;
    }
  }
`;

export const ContainerWrapper = styled.form`
  padding: 30px;
  display: grid;
`;

export const DivButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  transition: all 0.3s;

  button {
    border-radius: 0;
    border: 1px solid ${({ theme }) => theme.colors.button.primary};

    &:first-child {
      border-top-left-radius: ${({ theme }) => theme.borderRadius};
      border-bottom-left-radius: ${({ theme }) => theme.borderRadius};
    }
    &:last-child {
      border-top-right-radius: ${({ theme }) => theme.borderRadius};
      border-bottom-right-radius: ${({ theme }) => theme.borderRadius};
    }
    &:hover {
      background: ${({ theme }) => theme.colors.purples.details};
    }
  }
`;

export const CardsPeoples = styled.div`
  margin: 8px 0;
  padding: 8px;
  background: ${({ theme }) => theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius};
`;
