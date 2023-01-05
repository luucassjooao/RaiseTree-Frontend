import {
  useEffect, useRef, useState,
} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../../components/Button';
import CardHome from '../../components/cards/CardsHome';
import SideBar from '../../components/SideBar';
import { useAuth } from '../../hooks/useAuth';
import ActivityService from '../../services/ActivityService';
import StudentsCacheRedisService from '../../services/Cache/StudentsCacheRedisService';
import StudentService from '../../services/StudentService';
import {
  Container, ContainerTable, DivSideBar, DivSideBarActivity, InputButton,
} from './styled';

type TStudents = {
  id: string;
  current_points: string;
  user: {
    name: string;
  }
}

type TActivityAnswer = {
  id: string;
  Activity: {
    title: string;
    description: string;
    dateExpiration: Date;
    id: string;
    type: string;
    Teacher: {
      user: {
        name: string;
      }
    }
  }
}

export default function Students() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isFirstRender = useRef(true);

  const [modalInfosStudentVisible, setModalInfosStudentVisible] = useState<boolean>(false);

  const [classroomSelected, setClassroomSelected] = useState<string>('');
  const [students, setStudents] = useState<TStudents[]>([]);
  const [getAnswerActivityStudentId, setGetAnswerActivityStudentId] = useState<string>('');
  const [
    getActivityOfStudentAnswer,
    setGetActivityOfStudentAnswer,
  ] = useState<TActivityAnswer[]>([]);

  const selectedsClassroomsRef = useRef<string[]>([]);

  useEffect(() => {
    if (user?.type !== 'teacher') navigate('/home');
    setClassroomSelected(user?.type_model_teacher?.classrooms[0] as string);

    return () => {
      (async () => {
        await StudentsCacheRedisService
          .cleanUpStudentsByClassroom(selectedsClassroomsRef.current.join());
      })();
    };
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    (async () => {
      try {
        const getStudentsByClassroom: TStudents[] = await StudentService
          .getStudentsByClassroom(classroomSelected);
        setStudents(getStudentsByClassroom);

        const searchClassroomSelected = selectedsClassroomsRef.current
          .findIndex((classroom) => classroom === classroomSelected);

        if (searchClassroomSelected === -1) {
          selectedsClassroomsRef.current.push(classroomSelected);
        }
      } catch {
        toast.error('Ouve algum erro ao buscar os alunos!');
      }
    })();
  }, [classroomSelected]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    (async () => {
      try {
        if (getAnswerActivityStudentId !== '') {
          const getAnswerActivity = await ActivityService
            .getAllAnswerActivityOfStudent(getAnswerActivityStudentId);
          setGetActivityOfStudentAnswer(getAnswerActivity);
        }
      } catch {
        toast.error('Ouve um erro ao buscar as atividades desse aluno!');
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
            {students.map((infos) => (
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
                dateExpiration={infos.Activity.dateExpiration}
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
