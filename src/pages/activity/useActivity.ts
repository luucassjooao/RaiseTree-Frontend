import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/useAuth';
import ActivityService from '../../services/ActivityService';
import { IAnswerTeacherTableStudents, TTActivityScreen } from '../../utils/types';

export default function useActivity() {
  const { user } = useAuth();

  const { id } = useParams();

  const [activity, setActivity] = useState<TTActivityScreen>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [answerList, setAnswerList] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [studentInfos, setStudentInfos] = useState<IAnswerTeacherTableStudents | null>(null);

  const navigate = useNavigate();

  const loadActivity = useCallback(async () => {
    try {
      const getActivity: TTActivityScreen = await ActivityService
        .getUniqueActivityById(id as string);

      setActivity(getActivity);

      if (user?.type === 'student') {
        const findClassroomStudentInActivity = getActivity.classrooms
          .findIndex((sala) => sala === user.type_model_student?.classroom);

        if (findClassroomStudentInActivity === -1) {
          navigate('/home');
        }
      }
    } catch (error: any) {
      toast.error(error.body.message);
    }
  }, [id as string]);

  useEffect(() => {
    loadActivity();

    return () => {
      setActivity(undefined);
    };
  }, [loadActivity]);

  function handleAnswerList() {
    setAnswerList((prevState) => (prevState !== true));
  }
  function handleModalOpen(student: IAnswerTeacherTableStudents) {
    setModalOpen(true);
    setStudentInfos(student);
  }
  function handleModalCancel() {
    setModalOpen(false);
    setStudentInfos(null);
  }
  async function handleAnswer(answer: string) {
    setIsLoading(true);
    try {
      const answered = {
        answer,
      };

      await ActivityService.answerActivity(answered.answer, id as string);

      toast.success('Resposta Enviada!');

      navigate('/home');
    } catch (error: any) {
      toast.error(error.body.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAnswerNote(
    note: string,
    point: number,
    idAnswer: string,
    idStudent: string,
  ) {
    setIsLoading(true);
    try {
      const answered = {
        note,
        point,
      };

      await ActivityService
        .answerReplyActivityOfStudent(
          answered.note,
          answered.point,
          id as string,
          idAnswer,
          idStudent,
        );

      toast.success('Nota registrada!');
    } catch (error: any) {
      toast.error(!error.body.message ? 'Ocorreu um error ao registrar uma nota para este estudante! Tente mais tarde!' : error.body.message);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    user,
    activity,
    isLoading,
    answerList,
    modalOpen,
    studentInfos,
    handleAnswerList,
    handleAnswerNote,
    handleModalOpen,
    handleModalCancel,
    handleAnswer,
  };
}
