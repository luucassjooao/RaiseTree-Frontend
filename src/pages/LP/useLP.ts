import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/useAuth';
import { useErrors } from '../../hooks/useHooks';
import AuthService from '../../services/AuthService';
import SubjectService from '../../services/SubjectService';
import { GetRandomIndex } from '../../utils/funcs/GetRandomIndex';
import { InputChange } from '../../utils/types/globaTypes';
import { Memes, TMemes } from './memes';

type StateSelectOption = {
  visible: boolean;
  option: 'login' | 'register' | '';
}

export default function useLandingPageCreateOrganization() {
  const { signIn } = useAuth();

  const {
    errors,
    getErrorMessageByFieldName,
    removeError,
    setError,
  } = useErrors();

  const [selectOption, setSelectOption] = useState<StateSelectOption>({ visible: false, option: '' });

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [name, setName] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [subjectId, setSubjectId] = useState<string>('');
  const [subjects, setSubjects] = useState([]);
  const [isLoadingSubject, setIsLoadingSubjects] = useState(true);

  const [typeUserRegister, setTypeUserRegister] = useState<string>('student');

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [modalRegister, setModalRegister] = useState<boolean>(false);
  const navigate = useNavigate();

  const [dropDownOptions, setDropDownOptions] = useState<boolean>(false);

  const [urlImage, setUrlImage] = useState<string>('');

  useEffect(() => {
    setUrlImage(GetRandomIndex<TMemes>(Memes).url);
  }, []);

  useEffect(() => {
    async function loadMatters() {
      try {
        const subjectsLists = await SubjectService.findAll();

        setSubjects(subjectsLists);
      } catch {
        toast.error('Ocorreu algum error ao buscar as m??terias. Tente fazer o registro novamente!');
      } finally {
        setIsLoadingSubjects(false);
      }
    }
    loadMatters();

    return () => {
      setSubjects([]);
    };
  }, [selectOption.option === 'register']);

  function handleEmail(event: InputChange) {
    setEmail(event.target.value);

    if (!event.target.value) {
      setError({ field: 'email', message: 'Coloque o seu email, por favor!' });
    } else {
      removeError({ fieldName: 'email' });
    }
  }
  function handlePassword(event: InputChange) {
    setPassword(event.target.value);

    if (!event.target.value) {
      setError({ field: 'password', message: 'Coloque a sua senha, por favor!' });
    } else if (event.target.value.length < 6) {
      setError({ field: 'password', message: 'Coloque no m??nimo 6 caracteres, por favor!' });
    } else {
      removeError({ fieldName: 'password' });
    }
  }
  function handleName(event: InputChange) {
    setName(event.target.value);

    if (!event.target.value) {
      setError({ field: 'name', message: 'Coloque o seu Nome, por favor!' });
    } else {
      removeError({ fieldName: 'name' });
    }
  }
  function handleCodingCpf(event: InputChange) {
    setCode(event.target.value);

    if (!event.target.value) {
      setError({ field: 'code', message: `Coloque o seu ${typeUserRegister === 'student' ? 'CPF' : 'codigo'}, por favor!` });
    } else {
      removeError({ fieldName: 'code' });
    }
  }
  function handleConfirmPassword(event: InputChange) {
    setConfirmPassword(event.target.value);

    if (event.target.value !== password) {
      setError({ field: 'confirmPassword', message: 'As duas senhas devem ser iguais!' });
    } else {
      removeError({ fieldName: 'confirmPassword' });
    }
  }

  function backChoosing() {
    if (selectOption.option === 'login') {
      setSelectOption({ visible: false, option: 'login' });
      setEmail('');
      setPassword('');
    }
    if (selectOption.option === 'register') {
      setTypeUserRegister('student');
      setName('');
      setEmail('');
      setPassword('');
      setSubjectId('');
      setCode('');
      setSelectOption({ visible: false, option: 'register' });
    }
  }

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    try {
      setIsSubmitting(true);

      await signIn(email, password);

      setIsSubmitting(false);
    } catch (error: any) {
      toast.error(error.body.message);
    } finally {
      setIsSubmitting(false);
    }
  }
  async function handleRegister(event: FormEvent) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await AuthService.createMailForActiveAccount({
        type: typeUserRegister,
        name,
        email,
        password,
        subjectId,
        code,
      });
      setIsSubmitting(false);

      toast.success('Enviamos a confirma????o no seu email!');
    } catch (error: any) {
      toast.error(error.body.message);
    } finally {
      setIsSubmitting(false);
      setTypeUserRegister('student');
      setName('');
      setEmail('');
      setPassword('');
      setSubjectId('');
      setCode('');
      setSelectOption({ visible: false, option: 'register' });
    }
  }

  function handleSelectRegister() {
    setSelectOption({ visible: true, option: 'register' });
    setModalRegister(false);
  }

  function handleDropDownOpions() {
    setDropDownOptions((prevState) => prevState !== true);
  }

  return {
    email,
    password,
    errors,
    name,
    code,
    confirmPassword,
    typeUserRegister,
    subjectId,
    selectOption,
    setSelectOption,
    handleLogin,
    backChoosing,
    getErrorMessageByFieldName,
    isSubmitting,
    handleEmail,
    handlePassword,
    handleName,
    handleCodingCpf,
    handleConfirmPassword,
    handleRegister,
    setTypeUserRegister,
    isLoadingSubject,
    setSubjectId,
    subjects,
    modalRegister,
    setModalRegister,
    navigate,
    handleSelectRegister,
    dropDownOptions,
    handleDropDownOpions,
    urlImage,
  };
}
