import {
  useEffect,
  useState,
} from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/useAuth';
import ActivityService from '../../services/ActivityService';
import { TTActivityScreen } from '../../utils/types/typesActivity';
import { IAnswerTeacherTableStudents, TFindAnswerStudent, TObjectAnswer } from '../../utils/types/typesAnswerActivity';

export default function useActivity() {
  const { user } = useAuth();

  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const idAnswerStudent = searchParams.get('ai');

  const [isLoadingPostPut, setIsLoading] = useState<boolean>(false);
  const [answerList, setAnswerList] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [studentInfos, setStudentInfos] = useState<IAnswerTeacherTableStudents | null>(null);

  const [studentAnswerThisActivity, setStudentAnswerThisActivity] = useState<TObjectAnswer>();

  const navigate = useNavigate();

  const { data, isLoading } = useQuery<TTActivityScreen>(['activity', id], async () => ActivityService.getUniqueActivityById(id as string), {
    staleTime: 3600000,
    onError(error: any) {
      toast.error(error.body.message);
    },
  });

  useEffect(() => {
    if (user?.type === 'student') {
      const findClassroomStudentInActivity = data?.classrooms
        .findIndex((sala: string) => sala === user.type_model_student?.classroom);

      if (findClassroomStudentInActivity === -1) {
        navigate('/home');
      }

      const findAnswerActivityOfStudent = data?.answered_activities
        .findIndex((idUser: TFindAnswerStudent) => idUser.Student.user.id === user?.id);

      if (findAnswerActivityOfStudent !== -1) {
        setStudentAnswerThisActivity(
          data?.answered_activities[findAnswerActivityOfStudent],
        );
      }
    }
  }, [data]);

  function handleBackAllActivity() {
    setStudentAnswerThisActivity(undefined);
  }

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

      await ActivityService.answerActivity(
        answered.answer,
        id as string,
        data?.Teacher.subject.name as string,
      );

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
    data,
    isLoading,
    isLoadingPostPut,
    answerList,
    modalOpen,
    studentInfos,
    handleAnswerList,
    handleAnswerNote,
    handleModalOpen,
    handleModalCancel,
    handleAnswer,
    studentAnswerThisActivity,
    idAnswerStudent,
    handleBackAllActivity,
  };
}
