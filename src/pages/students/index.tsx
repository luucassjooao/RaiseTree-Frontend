/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  useEffect, useRef, useState,
} from 'react';
import { useQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../../components/Button';
import Calendar from '../../components/Calendar';
import CardHome from '../../components/cards/CardsHome';
import Loader from '../../components/Loader';
import Modal from '../../components/Modal';
import SideBar from '../../components/SideBar';
import { useAuth } from '../../hooks/useAuth';
import ActivityService from '../../services/ActivityService';
import StudentService from '../../services/StudentService';
import { SplitNameSchool } from '../../utils/funcs/SplitNameSchool';
import { TActivityAnswer } from '../../utils/types/typesAnswerActivity';
import { TStudents } from '../../utils/types/typesStudent';
import {
  CardsPeoples,
  Container,
  ContainerTable,
  DivSideBar,
  DivSideBarActivity,
  InputButton,
  TDCountActivities,
  TDInfoStudentFrequency,
} from './styled';

interface TFrequencyStudents {
  subjectName: string;
  frequency: boolean;
  student: TStudents;
}

interface TReturnFindStudent {
  label: string;
  isPresence: boolean;
}

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

  const [typeView, setTypeView] = useState<'viewStudents' | 'addFrequency'>('viewStudents');

  const [frequencyStudents, setFrequencyStudents] = useState<TFrequencyStudents[]>([]);
  const [
    isLoadingSubmitFrequencyStudents,
    setIsLoadingSubmitFrequencyStudents,
  ] = useState<boolean>(false);
  const [isModalConfirmFrequency, setIsModalConfirmFrequency] = useState<boolean>(false);
  const [isCalendarVisible, setIsCalendarVisible] = useState<boolean>(false);
  const [studentInfosFrequencyCalendar, setStudentInfosFrequencyCalendar] = useState<string[]>([]);

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

  function FindStudentOnFrequency(studentId: string): TReturnFindStudent {
    const findStudent = frequencyStudents.findIndex((student) => student.student.id === studentId);

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

  return (
    <>
      <Loader isLoading={isLoading} theme="blur" />
      <Container>
        <div className="divTypeView">
          <InputButton
            isSelected={typeView === 'viewStudents'}
            typeView="secondary"
            type="button"
            value="Vizualizar Alunos"
            onClick={() => setTypeView('viewStudents')}
          />
          <InputButton
            isSelected={typeView === 'addFrequency'}
            typeView="secondary"
            type="button"
            value="Anotar Frequencia"
            onClick={() => setTypeView('addFrequency')}
          />
        </div>
        <div className="divButtonsClassrooms">
          {user?.type_model_teacher?.classrooms.map((sala) => (
            <InputButton
              typeView="primary"
              type="button"
              value={sala.split(' | ')[1]}
              key={sala}
              isSelected={classroomSelected === sala}
              onClick={() => ChangeClassroomSelected(sala)}
            />
          ))}
        </div>
        {data?.length === 0 && (<h1 style={{ textAlign: 'center' }}>Ainda não tem alunos nesta sala!</h1>)}
        {typeView === 'viewStudents'
          ? (
            <ContainerTable role="grid" key="view">
              {data?.length as number > 0 && (
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Pontos</th>
                    <th>Frequencia</th>
                    <th>Atividades Entregues</th>
                  </tr>
                </thead>
              )}
              <tbody>
                {data?.map((infos) => (
                  <tr key={infos.id}>
                    <td>{infos.user.name}</td>
                    <td>{infos.current_points}</td>
                    <td
                      role="gridcell"
                      className="watch-frequency"
                      onClick={() => handleVisibleCalendar(infos)}
                    >
                      Ver Frequencia
                    </td>
                    <TDCountActivities
                      role="gridcell"
                      onClick={() => infos._count?.reply_activities as number > 0
                        && handleModalInfosStudentVisible(infos.id)}
                      activities={infos._count?.reply_activities !== 0}
                    >
                      Clique para visuzalizar
                    </TDCountActivities>
                  </tr>
                ))}
              </tbody>
            </ContainerTable>
          )
          : (
            <>
              <ContainerTable role="grid" key="view">
                {data?.length as number > 0 && (
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Frequencia</th>
                  </tr>
                </thead>
                )}
                <tbody>
                  {data?.map((infos) => (
                    <tr key={infos.id}>
                      <td>{infos.user.name}</td>
                      <TDInfoStudentFrequency
                        role="gridcell"
                        onClick={() => handleChangeFrequency(infos)}
                        frequency={FindStudentOnFrequency(infos.id).isPresence}
                      >
                        {FindStudentOnFrequency(infos.id).label}
                      </TDInfoStudentFrequency>
                    </tr>
                  ))}
                </tbody>
              </ContainerTable>
              {data?.length as number > 0 && (
              <div className="divButtonConfirmFrequency">
                <Button
                  type="button"
                  size={190}
                  onClick={handleChangeVisibleModalConfirmFrequency}
                  disabled={frequencyStudents.length <= 0}
                >
                  Confirmar Frequencia
                </Button>
              </div>
              )}
            </>
          )}
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

      <Modal
        danger
        visible={isModalConfirmFrequency}
        isLoading={isLoadingSubmitFrequencyStudents}
        title="Você quer adicionar frequencia para esses alunos?"
        confirmLabel="Confirmar"
        cancelLabel="Cancelar"
        onCancel={handleChangeVisibleModalConfirmFrequency}
        onConfirm={handleSubmitFrequency}
      >
        {frequencyStudents.map((infos) => (
          <CardsPeoples key={infos.student.id}>
            <h3>
              Nome:
              {[' ', infos.student.user.name]}
            </h3>
            <h3>
              Sala:
              {[' ', SplitNameSchool(infos.student.classroom)]}
            </h3>
          </CardsPeoples>
        ))}
      </Modal>

      <Calendar
        visible={isCalendarVisible}
        arrayDates={studentInfosFrequencyCalendar}
        onClose={handleCloseCalendar}
      />
    </>
  );
}
