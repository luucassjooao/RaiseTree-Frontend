import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Container } from './styled';

export default function VerifyEmail() {
  const { hopingActivatingAccount } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!hopingActivatingAccount) navigate('/');
  }, [hopingActivatingAccount]);

  return (
    <Container>
      <h1>Mandamos um  email para você!</h1>
      <h2>Verifique seu email, e ative sua conta!</h2>
    </Container>
  );
}
