import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import { useAuth } from '../../hooks/useAuth';
import AuthService from '../../services/AuthService';

import { Container } from './style';

export default function Active() {
  const { ChangeHopingActivatingAccount, hopingActivatingAccount } = useAuth();

  const [success, setSuccess] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [err, setError] = useState<string>('');
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

          if (hopingActivatingAccount) ChangeHopingActivatingAccount();

          toast.success('Conta ativada!');

          navigate('/login');
        }
      } catch (error: any) {
        setHasError(true);
        setError(error.body.message);
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
          <h1>{err}</h1>
          <h2>Você já será redirecionado(a)!</h2>
        </>
        )
      }
    </Container>
  );
}
