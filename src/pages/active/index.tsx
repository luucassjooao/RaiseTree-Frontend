import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import AuthService from '../../services/AuthService';

import { Container } from './style';

export default function Active() {
  const [success, setSuccess] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [err1, setError1] = useState<string>('');
  const [err2, setError2] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const coding = searchParams.get('token');

  useEffect(() => {
    async function SendCode() {
      try {
        if (coding) {
          setIsLoading(true);

          await AuthService.ActiveUserWithCode(coding);

          setSuccess(true);

          toast.success('Faça seu login!');

          navigate('/login');
        }
      } catch (error: any) {
        setHasError(true);
        setError1(error.body.message);
        setError2(error.body.message);
        navigate('/register');
      } finally {
        setIsLoading(false);
      }
    }
    SendCode();
  }, [coding]);

  return (
    <Container error={hasError}>
      <Loader isLoading={isLoading} />
      {
        success && (
        <>
          <h1>Sua Conta está ativada!</h1>
          <h2>Você já será redirecionado(a)!</h2>
        </>
        )
      }
      {
        hasError && (
        <>
          <h1>{err1}</h1>
          <h1>{err2}</h1>
          <h2>Você já será redirecionado(a)!</h2>
        </>
        )
      }
    </Container>
  );
}
