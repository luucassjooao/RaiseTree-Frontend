import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../../components/Button';
import FormGroup from '../../components/FormGroup';
import { Input } from '../../components/Input';
import Loader from '../../components/Loader';
import Select from '../../components/Select';
import { useErrors } from '../../hooks/useHooks';
import SubjectService from '../../services/SubjectService';
import RegisterService from '../../services/RegisterService';
import isEmailValid from '../../utils/isEmailValid';
import { Container, ContainerWrapper } from './styles';
import { useAuth } from '../../hooks/useAuth';
import { InputChange } from '../../utils/types/globaTypes';

export default function FormCreateOrganization() {
  const { ChangeHopingActivatingAccount } = useAuth();
  const navigate = useNavigate();

  const [organizatioName, setOrganizationName] = useState<string>('');
  const [organizationClassrooms, setOrganizationClassrooms] = useState<string[]>([]);
  const [personName, setPersonName] = useState<string>('');
  const [personEmail, setPersonEmail] = useState<string>('');
  const [personPassword, setPersonPassword] = useState<string>('');
  const [personConfirmPassword, setPersonConfirmPassword] = useState<string>('');

  const [subjects, setSubjects] = useState<string[]>([]);
  const [isLoadingSubjects, setIsLoadingSubjects] = useState<boolean>(true);
  const [subjectId, setSubjectId] = useState<string>('');

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const {
    errors, setError, removeError, getErrorMessageByFieldName,
  } = useErrors();

  useEffect(() => {
    async function loadMatters() {
      try {
        const mattersLists = await SubjectService.findAll();

        setSubjects(mattersLists);
      } catch {
        toast.error('Ocorreu algum error ao buscar as máterias. Tente fazer o registro novamente!');
      } finally {
        setIsLoadingSubjects(false);
      }
    }
    loadMatters();
  }, []);

  function handleOrganizationName(event: InputChange) {
    setOrganizationName(event.target.value.replace(/|/g, ''));

    if (!event.target.value) {
      setError({ field: 'organizationName', message: 'Coloque seu o nome da sua organização!' });
    } else {
      removeError({ fieldName: 'organizationName' });
    }
  }
  function handleOrganizationClassrooms(event: InputChange) {
    const listClassroom = event.target.value.split(',');
    const resultClassroom = listClassroom.map((el) => el.trim());
    setOrganizationClassrooms(resultClassroom);

    if (!event.target.value) {
      setError({ field: 'organizationClassrooms', message: 'Coloque as salas que existem na sua organização!' });
    } else {
      removeError({ fieldName: 'organizationClassrooms' });
    }
  }

  function handlePersonName(event: InputChange) {
    setPersonName(event.target.value);

    if (!event.target.value) {
      setError({ field: 'personName', message: 'Coloque o seu nome, por favor!' });
    } else {
      removeError({ fieldName: 'personName' });
    }
  }
  function handlePersonEmail(event: InputChange) {
    setPersonEmail(event.target.value);

    if (!event.target.value) {
      setError({ field: 'personEmail', message: 'Coloque o seu email, por favor!' });
    } else if (!isEmailValid(event.target.value)) {
      setError({ field: 'personEmail', message: 'O email não é valido!' });
    } else {
      removeError({ fieldName: 'personEmail' });
    }
  }
  function handlePersonPassword(event: InputChange) {
    setPersonPassword(event.target.value);

    if (!event.target.value) {
      setError({ field: 'personPassword', message: 'Coloque alguma senha, por favor!' });
    } else if (event.target.value.length < 6) {
      setError({ field: 'personPassword', message: 'A senha deve conter no minimo 6 caracteres!' });
    } else {
      removeError({ fieldName: 'personPassword' });
    }
  }
  function handlePersonConfirmPassword(event: InputChange) {
    setPersonConfirmPassword(event.target.value);

    if (event.target.value !== personPassword) {
      setError({ field: 'personConfirmPassword', message: 'As duas senhas devem ser iguais!' });
    } else {
      removeError({ fieldName: 'personConfirmPassword' });
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    try {
      setIsSubmitting(true);

      await RegisterService.sendEmailForRegisterOrganization(
        organizatioName,
        organizationClassrooms,
        personName,
        personEmail,
        personPassword,
        subjectId,
      );

      ChangeHopingActivatingAccount();
      navigate('/ve');
    } catch (error: any) {
      toast.error(error.body.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  const isFormValid = (
    organizatioName
    && organizationClassrooms
    && personName
    && personEmail
    && personPassword
    && subjectId
    && errors.length === 0
  );

  return (
    <Container>
      <Loader isLoading={isSubmitting} />
      <ContainerWrapper onSubmit={handleSubmit} noValidate>
        <h2>Registre-se</h2>

        <FormGroup error={getErrorMessageByFieldName({ fieldName: 'organizationName' })}>
          <Input
            size={350}
            type="text"
            placeholder="Nome da Organização **"
            error={getErrorMessageByFieldName({ fieldName: 'organizationName' })}
            value={organizatioName}
            onChange={handleOrganizationName}
          />
        </FormGroup>
        <FormGroup error={getErrorMessageByFieldName({ fieldName: 'organizationClassrooms' })}>
          <Input
            size={350}
            type="text"
            placeholder="Salas da Organização **"
            error={getErrorMessageByFieldName({ fieldName: 'organizationClassrooms' })}
            value={organizationClassrooms}
            onChange={handleOrganizationClassrooms}
          />
        </FormGroup>

        <FormGroup error={getErrorMessageByFieldName({ fieldName: 'personName' })}>
          <Input
            size={350}
            type="text"
            placeholder="Nome **"
            error={getErrorMessageByFieldName({ fieldName: 'personName' })}
            value={personName}
            onChange={handlePersonName}
          />
        </FormGroup>
        <FormGroup error={getErrorMessageByFieldName({ fieldName: 'personEmail' })}>
          <Input
            size={350}
            type="text"
            placeholder="Email **"
            error={getErrorMessageByFieldName({ fieldName: 'personEmail' })}
            value={personEmail}
            onChange={handlePersonEmail}
          />
        </FormGroup>
        <FormGroup error={getErrorMessageByFieldName({ fieldName: 'personPassword' })}>
          <Input
            size={350}
            type="password"
            placeholder="Senha **"
            error={getErrorMessageByFieldName({ fieldName: 'personPassword' })}
            value={personPassword}
            onChange={handlePersonPassword}
          />
        </FormGroup>
        <FormGroup error={getErrorMessageByFieldName({ fieldName: 'personConfirmPassword' })}>
          <Input
            size={350}
            type="password"
            placeholder="Confirme sua senha **"
            error={getErrorMessageByFieldName({ fieldName: 'personConfirmPassword' })}
            value={personConfirmPassword}
            onChange={handlePersonConfirmPassword}
          />
        </FormGroup>
        <FormGroup isLoading={isLoadingSubjects}>
          <Select
            is500={false}
            value={subjectId}
            onChange={(event) => setSubjectId(event.target.value)}
            disabled={isLoadingSubjects}
          >
            <option value="">Selecione alguma Máteria</option>

            {subjects.map((category: any) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
        </FormGroup>
        <br />
        <Button
          isLoading={isSubmitting}
          size={350}
          disabled={!isFormValid}
          type="submit"
          yellowBackground
        >
          Confirmar registro
        </Button>
        <Link to="/" className="link">Voltar a página inicial</Link>
      </ContainerWrapper>
    </Container>
  );
}
