import { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/useAuth';
import ActivityService from '../../services/ActivityService';
import StudentService from '../../services/StudentService';
import { TActivityAnswer } from '../../utils/types/typesAnswerActivity';
import { TStudents } from '../../utils/types/typesStudent';
import { TFrequencyStudents, TReturnFindStudent } from './types';

export default function useStudent() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isFirstRender = useRef(true);

  const [modalInfosStudentVisible, setModalInfosStudentVisible] = useState<boolean>(false);
  const [
    isLoadingFetchAnswerOfStudent,
    setIsLoadingFetchAnswerOfStudent,
  ] = useState<boolean>(false);

  const [classroomSelected, setClassroomSelected] = useState<string>(
    user?.type_model_teacher?.classrooms[0] as string,
  );
  const [getAnswerActivityStudentId, setGetAnswerActivityStudentId] = useState<string>('');
  const [
    getActivityOfStudentAnswer,
    setGetActivityOfStudentAnswer,
  ] = useState<TActivityAnswer[]>([]);

  const [typeView, setTypeView] = useState<'viewStudents' | 'addFrequency'>('viewStudents');

  const [frequencyStudents, setFrequencyStudents] = useState<TFrequencyStudents[]>([]);
  const [
    isLoadingSubmitFrequencyStudents,
    setIsLoadingSubmitFrequencyStudents,
  ] = useState<boolean>(false);
  const [isModalConfirmFrequency, setIsModalConfirmFrequency] = useState<boolean>(false);
  const [isCalendarVisible, setIsCalendarVisible] = useState<boolean>(false);
  const [studentInfosFrequencyCalendar, setStudentInfosFrequencyCalendar] = useState<string[]>([]);

  const { data, isLoading } = useQuery<TStudents[]>(['students', classroomSelected], () => StudentService.getStudentsByClassroom(classroomSelected), {
    onError() {
      toast.error('Ouve um erro ao buscar os alunos!');
    },
  });

  useEffect(() => {
    if (user?.type !== 'teacher') navigate('/home');
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    (async () => {
      setIsLoadingFetchAnswerOfStudent(true);
      try {
        if (getAnswerActivityStudentId !== '') {
          const getAnswerActivity = await ActivityService
            .getAllAnswerActivityOfStudent(getAnswerActivityStudentId);
          setGetActivityOfStudentAnswer(getAnswerActivity);
        }
      } catch {
        toast.error('Ouve um erro ao buscar as atividades desse aluno!');
      } finally {
        setIsLoadingFetchAnswerOfStudent(false);
      }
    })();
  }, [getAnswerActivityStudentId]);

  function handleModalInfosStudentVisible(studentId: string) {
    setModalInfosStudentVisible((prevState) => (prevState !== true));

    if (studentId !== '') {
      setGetAnswerActivityStudentId(studentId);
    }
  }

  function ChangeClassroomSelected(classroom: string) {
    setClassroomSelected(classroom);
  }

  function handleChangeFrequency(student: TStudents) {
    setFrequencyStudents((prevState) => {
      const indexStudent = prevState
        .findIndex((infoStudent) => infoStudent.student.id === student.id);

      if (indexStudent === -1) {
        return prevState.concat({
          student,
          frequency: true,
          subjectName: user?.type_model_teacher?.subject.name as string,
        });
      }

      return prevState.filter((infoStudent) => infoStudent.student.id !== student.id);
    });
  }

  function handleChangeVisibleModalConfirmFrequency() {
    setIsModalConfirmFrequency((prevState) => prevState !== true);
  }

  async function handleSubmitFrequency() {
    try {
      setIsLoadingSubmitFrequencyStudents(true);
      StudentService.addFrequencyStudents(frequencyStudents);
      toast.success('Estamos anotando as frequencias!');
      setFrequencyStudents([]);
    } catch {
      toast.error('Houve um error ao registrar a frequencia dos alunos!');
    } finally {
      setIsLoadingSubmitFrequencyStudents(false);
      setIsModalConfirmFrequency(false);
    }
  }

  function handleVisibleCalendar(student: TStudents) {
    setIsCalendarVisible(true);
    const findFrequency = student.frequency
      .find((frequency) => frequency.subjectName === user?.type_model_teacher?.subject.name);
    setStudentInfosFrequencyCalendar(findFrequency?.dates as string[]);
  }
  function handleCloseCalendar() {
    setIsCalendarVisible(false);
    setStudentInfosFrequencyCalendar([]);
  }

  function findPresenceToday(infosStudent: TStudents): boolean {
    const findSubjectTeacher = infosStudent.frequency
      .find(({ subjectName }) => subjectName === user?.type_model_teacher?.subject.name);
    const findToday = findSubjectTeacher?.dates
      .find((today) => today === String(new Date().toLocaleDateString('pt-br')));
    if (findToday) return true;
    return false;
  }

  function FindStudentOnFrequency(infosStudent: TStudents): TReturnFindStudent {
    const { id } = infosStudent;
    if (findPresenceToday(infosStudent) === true) {
      return {
        label: 'Este aluno já recebeu presença hoje!',
        isPresence: true,
      };
    }
    const findStudent = frequencyStudents
      .findIndex((student) => student.student.id === id);

    if (findStudent === -1) {
      return {
        label: 'FALTA',
        isPresence: false,
      };
    }

    return {
      label: 'PRESENTE',
      isPresence: true,
    };
  }

  return {
    isLoading,
    typeView,
    setTypeView,
    user,
    classroomSelected,
    ChangeClassroomSelected,
    data,
    handleVisibleCalendar,
    handleChangeFrequency,
    FindStudentOnFrequency,
    findPresenceToday,
    handleChangeVisibleModalConfirmFrequency,
    frequencyStudents,
    isModalConfirmFrequency,
    isLoadingSubmitFrequencyStudents,
    handleSubmitFrequency,
    modalInfosStudentVisible,
    isLoadingFetchAnswerOfStudent,
    handleModalInfosStudentVisible,
    getActivityOfStudentAnswer,
    isCalendarVisible,
    studentInfosFrequencyCalendar,
    handleCloseCalendar,
  };
}
