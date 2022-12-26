import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/useAuth';
import { useErrors } from '../../hooks/useHooks';

import { Container, DivInputs } from './styles';

import Button from '../../components/Button';
import { Input } from '../../components/Input';

import { InputChange } from '../../utils/types';
import isEmailValid from '../../utils/isEmailValid';

import FormGroup from '../../components/FormGroup';
import Loader from '../../components/Loader';

export default function Login() {
  const { signIn } = useAuth();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [isLoading, setIsLoadig] = useState<boolean>(false);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const {
    errors, setError, removeError, getErrorMessageByFieldName,
  } = useErrors();

  function handleEmailChange(event: InputChange) {
    setEmail(event.target.value);

    if (!event.target.value && !isEmailValid(email)) {
      setError({ field: 'email', message: 'Coloque seu email!' });
    } else {
      removeError({ fieldName: 'email' });
    }
  }
  function handlePasswordChange(event: InputChange) {
    setPassword(event.target.value);

    if (!event.target.value) {
      setError({ field: 'password', message: 'Coloque sua senha!' });
    } else {
      removeError({ fieldName: 'password' });
    }
  }

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    try {
      setIsLoadig(true);
      setIsSubmitting(true);

      await signIn(email, password);

      setIsSubmitting(false);
    } catch (error: any) {
      toast.error(error.body.message);
    } finally {
      setIsLoadig(false);
      setIsSubmitting(false);
    }
  }

  const isFormValid = (email && password && errors.length === 0);

  return (
    <Container errors={errors} onSubmit={handleLogin} noValidate>
      <Loader isLoading={isLoading} />
      <h1>Acesse sua conta!</h1>
      <h4 style={{ display: 'flex' }}>
        Quer se juntar a uma organização?&nbsp;
        <Link to="/register" style={{ color: '#d00000' }}>Clique aqui</Link>
      </h4>
      <h4 style={{ display: 'flex' }}>
        Quer criar uma organização?&nbsp;
        <Link to="/corganization" style={{ color: '#d00000' }}>Clique aqui</Link>
      </h4>
      <DivInputs>
        <FormGroup error={getErrorMessageByFieldName({ fieldName: 'email' })}>
          <Input
            size={350}
            type="email"
            placeholder="Email"
            error={getErrorMessageByFieldName({ fieldName: 'email' })}
            value={email}
            onChange={handleEmailChange}
          />
        </FormGroup>
        <FormGroup error={getErrorMessageByFieldName({ fieldName: 'password' })}>
          <Input
            size={350}
            type="password"
            placeholder="Senha"
            error={getErrorMessageByFieldName({ fieldName: 'password' })}
            value={password}
            onChange={handlePasswordChange}
          />
        </FormGroup>
        <Button
          type="submit"
          size={350}
          disabled={!isFormValid}
          isLoading={isSubmitting}
          yellowBackground
          style={{ marginTop: '16px' }}
        >
          Acessar minha conta
        </Button>
      </DivInputs>

    </Container>
  );
}
