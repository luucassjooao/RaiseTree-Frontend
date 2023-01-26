import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useErrors } from '../../hooks/useHooks';
import StaticUserService from '../../services/StaticUserService';
import { InputChange, TTClassroom } from '../../utils/types/globaTypes';
import { TPeoplesNews } from '../../utils/types/typesPeoples';

export default function useAdminRegisterStaticUser() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [spreadsheetChoosing, setSpreadSheetChoosing] = useState<boolean>(false);
  const [spreadSheetUrlChoosing, setSpreadSheetUrlChoosing] = useState<boolean>(false);
  const [spreadSheetUrl, setSpreadSheetUrl] = useState<string>('');

  const [multiPeopleChoosing, setMultiPeopleChoosing] = useState<boolean>(false);
  const [peoplesCreated, setPeoplesCreated] = useState<TPeoplesNews[]>([]);

  const [onePersonChoosing, setOnePersonChoosing] = useState<boolean>(false);

  const [name, setName] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [classroomStudent, setClassroomStudent] = useState<string>('');
  const [classroomTeacher, setClassroomTeacher] = useState<TTClassroom[]>([]);
  const [cpf, setCpf] = useState<string>('');

  const [optionsClassroom, setOptionsClassroom] = useState<TTClassroom[]>([]);

  const [somethingHasChoosed, setSomethingHasChoosed] = useState<boolean>(false);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [isVisibleModalCreatePeoples, setIsVisibleModalCreatePeoples] = useState<boolean>(false);
  const [isVisibleModalInfoSheet, setIsVisibleModalInfoSheet] = useState<boolean>(false);

  const {
    errors, setError, removeError, getErrorMessageByFieldName,
  } = useErrors();

  useEffect(() => {
    const arrayClassrooms = user?.type_model_teacher?.classrooms.map(
      (value) => ({ label: value.split(' | ')[1], value }),
    ) as TTClassroom[];

    setOptionsClassroom(arrayClassrooms);
  }, []);

  function handleSpreadSheetChoosing() {
    setSpreadSheetChoosing(true);
    setSomethingHasChoosed(true);
    setIsVisibleModalInfoSheet(true);
    setType('student');
  }

  function handleMultiPeopleChoosing() {
    setMultiPeopleChoosing(true);
    setSomethingHasChoosed(true);
  }

  function handleOnePersonChoosing() {
    setOnePersonChoosing(true);
    setSomethingHasChoosed(true);
    setName('');
    setCpf('');
    setClassroomStudent('');
    setType('');
    setClassroomTeacher([]);
  }

  function handleBackChoosing() {
    setSomethingHasChoosed(false);
    setSpreadSheetChoosing(false);
    setMultiPeopleChoosing(false);
    setOnePersonChoosing(false);
    setSpreadSheetUrlChoosing(false);
    setName('');
    setCpf('');
    setClassroomStudent('');
    setType('');
    setClassroomTeacher([]);
  }

  function CopyText(text: string) {
    navigator.clipboard.writeText(text);
    toast.success(`${text} copiado com sucesso!`);
  }

  function handleUrlSpreadSheet() {
    setSpreadSheetUrlChoosing(true);
    setSpreadSheetChoosing(false);
  }

  function handleChangeName(event: InputChange) {
    setName(event.target.value);

    if (!event.target.value) {
      setError({ field: 'name', message: 'Você precisa colocar algum Nome!' });
    } else {
      removeError({ fieldName: 'name' });
    }
  }
  function handleChangeCPF(event: InputChange) {
    setCpf(event.target.value);

    if (!event.target.value) {
      setError({ field: 'cpf', message: 'Coloque o CPF do aluno!' });
    } else {
      removeError({ fieldName: 'cpf' });
    }
  }

  function handleAddMorePeoples() {
    const arrayClassroom = classroomTeacher.map((salas) => salas.value);

    setPeoplesCreated((prevState) => [
      ...prevState,
      {
        name,
        classroom: type === 'student' ? [classroomStudent] : arrayClassroom,
        type,
        cpf: type === 'student' ? cpf : '',
      },
    ]);

    toast.success(`${name} foi adicionado(a)!`);

    setName('');
    setCpf('');
    setClassroomStudent('');
    setClassroomTeacher([]);
  }

  function handleCloseCreatePeoplesModal() {
    setIsVisibleModalCreatePeoples(false);
  }

  function handleVisibleCreatePeoplesModal() {
    setIsVisibleModalCreatePeoples(true);
  }

  async function handleOnSubmitMultiPeople() {
    setIsSubmitting(true);

    try {
      await StaticUserService.createManyPeoples(peoplesCreated);
      setPeoplesCreated([]);
      setName('');
      setType('');
      setCpf('');
      setClassroomStudent('');
      setClassroomTeacher([]);

      handleCloseCreatePeoplesModal();

      toast.success('Adicionados!');
    } catch {
      toast.error('Parece que ouve algum error!');
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleOnSubmitOnePerson(event: FormEvent) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      if (type === 'student') {
        await StaticUserService.sendOnePerson(
          name,
          [classroomStudent],
          type,
          cpf,
        );

        toast.success(`${name} foi adicionado com sucesso!`);
      } if (type === 'teacher') {
        const arrayClassroom = classroomTeacher.map((salas) => salas.value);

        await StaticUserService.sendOnePerson(
          name,
          arrayClassroom,
          type,
        );

        toast.success(`${name} foi adicionado com sucesso!`);
      }
    } catch (error: any) {
      toast.error(error.body.message);
    } finally {
      setIsSubmitting(false);
      setName('');
      setType('');
      setCpf('');
      setClassroomStudent('');
      setClassroomTeacher([]);
    }
  }

  async function handleOnSubmitPeoplesOfSheet(event: FormEvent) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await StaticUserService.createPeoplesOfSheet(spreadSheetUrl, type);

      toast.success('Pessoas adicinodas com sucesso!');
      navigate('/home');
    } catch (error: any) {
      toast.error(error.body.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    name,
    type,
    classroomStudent,
    cpf,
    classroomTeacher,
    peoplesCreated,
    errors,
    somethingHasChoosed,
    spreadSheetUrlChoosing,
    spreadsheetChoosing,
    multiPeopleChoosing,
    onePersonChoosing,
    isVisibleModalCreatePeoples,
    isSubmitting,
    handleCloseCreatePeoplesModal,
    handleOnSubmitMultiPeople,
    isVisibleModalInfoSheet,
    setIsVisibleModalInfoSheet,
    CopyText,
    handleSpreadSheetChoosing,
    handleMultiPeopleChoosing,
    handleOnePersonChoosing,
    handleBackChoosing,
    setType,
    user,
    handleUrlSpreadSheet,
    spreadSheetUrl,
    setSpreadSheetUrl,
    getErrorMessageByFieldName,
    handleChangeName,
    setClassroomStudent,
    handleChangeCPF,
    optionsClassroom,
    setClassroomTeacher,
    handleAddMorePeoples,
    handleVisibleCreatePeoplesModal,
    handleOnSubmitPeoplesOfSheet,
    handleOnSubmitOnePerson,
  };
}
