import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../../hooks/useAuth';
import { useErrors } from '../../../hooks/useHooks';

import AuthService from '../../../services/AuthService';

import isEmailValid from '../../../utils/isEmailValid';

import { InputChange } from '../../../utils/types';

import Button from '../../Button';
import FormGroup from '../../FormGroup';
import { Input } from '../../Input';
import Loader from '../../Loader';

import { Container, NameClassroom } from './styles';

export function Student() {
  const { ChangeHopingActivatingAccount } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState<string>('');
  const [cpf, setCPF] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [cfPassword, setCfPassword] = useState<string>('');

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const {
    errors, setError, removeError, getErrorMessageByFieldName,
  } = useErrors();

  function handleNameChange(event: InputChange) {
    setName(event.target.value);

    if (!event.target.value) {
      setError({ field: 'name', message: 'Nome é obrigatorio!' });
    } else {
      removeError({ fieldName: 'name' });
    }
  }
  function handleCPFChange(event: InputChange) {
    setCPF(event.target.value);

    if (!event.target.value) {
      setError({ field: 'cpf', message: 'Coloque seu CPF!' });
    } else {
      removeError({ fieldName: 'cpf' });
    }
  }
  function handleEmailChange(event: InputChange) {
    setEmail(event.target.value);

    if (!event.target.value) {
      setError({ field: 'email', message: 'Coloque seu email!' });
    } else if (!isEmailValid(event.target.value)) {
      setError({ field: 'email', message: 'O formato do email não está certo!' });
    } else {
      removeError({ fieldName: 'email' });
    }
  }
  function handlePasswordChange(event: InputChange) {
    setPassword(event.target.value);

    if (!event.target.value) {
      setError({ field: 'password', message: 'Coloque alguma senha!' });
    } else if (event.target.value.length < 6) {
      setError({ field: 'password', message: 'A senha deve ter mais que 6 caracteres!' });
    } else {
      removeError({ fieldName: 'password' });
    }
  }
  function handleCFPasswordChange(event: InputChange) {
    setCfPassword(event.target.value);

    if (event.target.value !== password) {
      setError({ field: 'cfpassword', message: 'As duas senhas devem ser iguais!' });
    } else {
      removeError({ fieldName: 'cfpassword' });
    }
  }
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      setIsLoading(true);
      setIsSubmitting(true);

      await AuthService.createMailForActiveAccount({
        type: 'student',
        name,
        email,
        password,
        code: cpf,
      });

      ChangeHopingActivatingAccount();
      navigate('/ve');
    } catch (error: any) {
      toast.error(error.body.message);
    } finally {
      setIsLoading(false);
      setIsSubmitting(false);
    }
  }

  const isFormValid = (name && cpf && email && password && cfPassword && errors.length === 0);

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Container>
        <Loader isLoading={isLoading} />
        <NameClassroom>
          <FormGroup>
            <Input
              size={410}
              type="text"
              placeholder="Qual seu nome? **"
              style={{ marginRight: '10px' }}
              error={getErrorMessageByFieldName({ fieldName: 'name' })}
              value={name}
              onChange={handleNameChange}
            />
          </FormGroup>
        </NameClassroom>
        <FormGroup>
          <Input
            size={410}
            type="text"
            placeholder="Coloque seu CPF **"
            error={getErrorMessageByFieldName({ fieldName: 'cpf' })}
            value={cpf}
            onChange={handleCPFChange}
          />
        </FormGroup>
        <FormGroup>
          <Input
            size={410}
            type="email"
            placeholder="Qual seu Email? **"
            error={getErrorMessageByFieldName({ fieldName: 'email' })}
            value={email}
            onChange={handleEmailChange}
          />
        </FormGroup>
        <FormGroup>
          <Input
            size={410}
            type="password"
            placeholder="Coloque alguma senha **"
            error={getErrorMessageByFieldName({ fieldName: 'password' })}
            value={password}
            onChange={handlePasswordChange}
          />
        </FormGroup>
        <FormGroup error={getErrorMessageByFieldName({ fieldName: 'cfpassword' })}>
          <Input
            size={410}
            type="password"
            placeholder="Confirme sua senha **"
            error={getErrorMessageByFieldName({ fieldName: 'cfpassword' })}
            value={cfPassword}
            onChange={handleCFPasswordChange}
          />
        </FormGroup>
        <Button isLoading={isSubmitting} size={410} disabled={!isFormValid} type="submit" yellowBackground>Confirmar registro</Button>
        <h4 style={{ display: 'flex' }}>
          Já tem uma conta?&nbsp;
          <Link to="/login" style={{ color: '#d00000' }}> Clique aqui para fazer o login!</Link>
        </h4>
      </Container>
    </form>
  );
}
