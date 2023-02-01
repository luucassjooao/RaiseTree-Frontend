import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../../components/Button';
import FormGroup from '../../components/FormGroup';
import { Input } from '../../components/Input';
import Loader from '../../components/Loader';
import Select from '../../components/Select';
import { useErrors } from '../../hooks/useHooks';
import RegisterService from '../../services/RegisterService';
import SubjectService from '../../services/SubjectService';
import { InputChange } from '../../utils/types/globaTypes';

import { Container } from './style';

export default function ActiveTeacher() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const coding = searchParams.get('token');

  const [password, setPassword] = useState<string>('');

  const [subjectId, setSubjectId] = useState<string>('');
  const [matters, setMatters] = useState([]);
  const [isLoadingMatters, setIsLoadingMatters] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const {
    errors, setError, removeError, getErrorMessageByFieldName,
  } = useErrors();

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

  async function onSubmit(event: FormEvent) {
    event.preventDefault();

    setIsSubmitting(true);
    try {
      await RegisterService.registerTeacher(coding as string, password, subjectId);
      toast.success('Sua conta foi ativada!');
      navigate('/login');
    } catch {
      toast.error('Alguma coisa deu errado! Tente novamente');
    } finally {
      setIsSubmitting(false);
    }
  }

  const disabledButton = password && subjectId !== '' && errors.length === 0;

  return (
    <>
      <Loader isLoading={isSubmitting} theme="blur" />
      <Container onSubmit={onSubmit}>
        <h2>Coloque algumas informaçoes adicionais</h2>
        <FormGroup error={getErrorMessageByFieldName({ fieldName: 'password' })}>
          <Input
            type="password"
            size={370}
            placeholder="Senha"
            value={password}
            onChange={handlePasswordChange}
            error={getErrorMessageByFieldName({ fieldName: 'password' })}
          />
        </FormGroup>
        <FormGroup isLoading={isLoadingMatters}>
          <Select
            is500={false}
            style={{ width: '370px' }}
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

        <Button
          size={185}
          type="submit"
          yellowBackground
          style={{ marginTop: '16px' }}
          disabled={!disabledButton}
        >
          Terminar Registro

        </Button>
      </Container>
    </>
  );
}
