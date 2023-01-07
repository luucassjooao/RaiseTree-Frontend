import {
  useEffect, useRef, useState,
} from 'react';
import { useQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../../components/Button';
import CardHome from '../../components/cards/CardsHome';
import Loader from '../../components/Loader';
import SideBar from '../../components/SideBar';
import { useAuth } from '../../hooks/useAuth';
import ActivityService from '../../services/ActivityService';
import StudentService from '../../services/StudentService';
import { TActivityAnswer } from '../../utils/types/typesAnswerActivity';
import { TStudents } from '../../utils/types/typesStudent';
import {
  Container, ContainerTable, DivSideBar, DivSideBarActivity, InputButton,
} from './styled';

export default function Students() {
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

  useEffect(() => {
    if (user?.type !== 'teacher') navigate('/home');
  }, []);

  const { data, isLoading } = useQuery<TStudents[]>(['students', classroomSelected], () => StudentService.getStudentsByClassroom(classroomSelected), {
    onError() {
      toast.error('Ouve um erro ao buscar os alunos!');
    },
  });

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

  return (
    <>
      <Loader isLoading={isLoading} />
      <Container>
        <div className="divButtonsClassrooms">
          {user?.type_model_teacher?.classrooms.map((sala) => (
            <InputButton
              type="button"
              value={sala.split(' | ')[1]}
              key={sala}
              isSelected={classroomSelected === sala}
              onClick={() => ChangeClassroomSelected(sala)}
            />
          ))}
        </div>
        <ContainerTable role="grid">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Pontos</th>
              <th>Atividades Entregues</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((infos) => (
              <tr key={infos.id}>
                <td>{infos.user.name}</td>
                <td>{infos.current_points}</td>
                <td
                  className="tdAnswer"
                  role="gridcell"
                  onClick={() => handleModalInfosStudentVisible(infos.id)}
                >
                  Clique para visuzalizar
                </td>
              </tr>
            ))}
          </tbody>
        </ContainerTable>
      </Container>

      <SideBar
        side="right"
        size={550}
        visible={modalInfosStudentVisible}
        colorBackground="GrayPurple"
        isLoading={isLoadingFetchAnswerOfStudent}
      >
        <DivSideBar>
          <Button
            isLoading={false}
            size={65}
            style={{ height: '40px', marginBottom: '8px' }}
            yellowBackground={false}
            type="button"
            onClick={() => handleModalInfosStudentVisible('')}
          >
            Voltar
          </Button>

          <h1 style={{ textAlign: 'center' }}>Atividades Entregues</h1>
          <h3 style={{ textAlign: 'center' }}>(Clique na ativdade para ser redirecionado(a))</h3>
        </DivSideBar>

        <DivSideBarActivity>
          {getActivityOfStudentAnswer.map((infos) => (
            <Link to={`/activity/${infos.Activity.id}?ai=${infos.id}`} key={infos.Activity.id} style={{ textDecoration: 'none' }}>
              <CardHome
                dateExpiration={infos.Activity.dateExpiration as Date}
                description={infos.Activity.description}
                title={infos.Activity.title}
                typeActivity={infos.Activity.type}
                isDraft={false}
                teacher={infos.Activity.Teacher.user.name}
              />
            </Link>
          ))}
        </DivSideBarActivity>
      </SideBar>
    </>
  );
}
