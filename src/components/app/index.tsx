import { ThemeProvider } from 'styled-components';

import { BrowserRouter } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from './styles';

import GlobalStyles from '../../assets/styles/global';
import defaultTHemes from '../../assets/styles/themes/default';

import { AuthProvider } from '../../context/auth';
import { Routes } from '../../routes';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTHemes}>
        <GlobalStyles />
        <ToastContainer position="bottom-center" />
        <Container>
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}
