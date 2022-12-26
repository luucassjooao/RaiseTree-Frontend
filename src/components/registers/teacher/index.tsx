/* eslint-disable no-underscore-dangle */
import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../../hooks/useAuth';

import { useErrors } from '../../../hooks/useHooks';
import AuthService from '../../../services/AuthService';
import SubjectService from '../../../services/SubjectService';

import isEmailValid from '../../../utils/isEmailValid';

import { InputChange } from '../../../utils/types';

import Button from '../../Button';
import FormGroup from '../../FormGroup';
import { Input } from '../../Input';
import Loader from '../../Loader';
import Select from '../../Select';

import { Container } from './styles';

export function Teacher() {
  const { ChangeHopingActivatingAccount } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [cfPassword, setCFPassword] = useState<string>('');
  const [coding, setCoding] = useState<string>('');

  const [subjectId, setSubjectId] = useState<string>('');
  const [matters, setMatters] = useState([]);
  const [isLoadingMatters, setIsLoadingMatters] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadMatters() {
      try {
        const mattersLists = await SubjectService.findAll();

        setMatters(mattersLists);
      } catch {
        toast.error('Ocorreu algum error ao buscar as máterias. Tente fazer o registro novamente!');
      } finally {
        setIsLoadingMatters(false);
      }
    }
    loadMatters();
  }, []);

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
    setCFPassword(event.target.value);

    if (event.target.value !== password) {
      setError({ field: 'cfpassword', message: 'As duas senhas devem ser iguais!' });
    } else {
      removeError({ fieldName: 'cfpassword' });
    }
  }
  function handleCodingChange(event: InputChange) {
    setCoding(event.target.value);

    if (!event.target.value) {
      setError({ field: 'coding', message: 'Coloque o codigo que leh foi dado!' });
    } else {
      removeError({ fieldName: 'coding' });
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      setIsLoading(true);
      setIsSubmitting(true);

      await AuthService.createMailForActiveAccount({
        type: 'teacher',
        name,
        email,
        password,
        subjectId,
        code: coding,
      });
      setIsSubmitting(false);

      ChangeHopingActivatingAccount();
      navigate('/ve');
    } catch (error: any) {
      toast.error(error.body.message);
    } finally {
      setIsLoading(false);
      setIsSubmitting(false);
    }
  }

  const isFormValid = (
    name && email && password && cfPassword && coding && subjectId && errors.length === 0
  );

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Container>
        <Loader isLoading={isLoading} />
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
        <FormGroup
          error={getErrorMessageByFieldName({ fieldName: 'cfpassword' })}
        >
          <Input
            size={410}
            type="password"
            placeholder="Confirme sua senha **"
            error={getErrorMessageByFieldName({ fieldName: 'cfpassword' })}
            value={cfPassword}
            onChange={handleCFPasswordChange}
          />
        </FormGroup>
        <FormGroup isLoading={isLoadingMatters}>
          <Select
            is500={false}
            value={subjectId}
            onChange={(event) => setSubjectId(event.target.value)}
            disabled={isLoadingMatters}
          >
            <option value="">Selecione sua Máteria</option>

            {matters.map((category: any) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
        </FormGroup>
        <FormGroup>
          <Input
            size={410}
            type="text"
            placeholder="Coloque o codigo que lhe foi dado **"
            error={getErrorMessageByFieldName({ fieldName: 'coding' })}
            value={coding}
            onChange={handleCodingChange}
          />
        </FormGroup>
        <Button
          isLoading={isSubmitting}
          size={410}
          disabled={!isFormValid}
          type="submit"
          yellowBackground
        >
          Confirmar registro
        </Button>
        <h4 style={{ display: 'flex' }}>
          Já tem uma conta?&nbsp;
          <Link to="/login" style={{ color: '#d00000' }}> Clique aqui para fazer o login!</Link>
        </h4>
      </Container>
    </form>
  );
}
