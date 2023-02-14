/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import Calendar from '../../components/Calendar';
import CardHome from '../../components/cards/CardsHome';
import Loader from '../../components/Loader';
import Modal from '../../components/Modal';
import SideBar from '../../components/SideBar';
import { SplitNameSchool } from '../../utils/funcs/SplitNameSchool';
import RegisterFrequency from './components/RegisterFrequency';
import ViewInfosStudents from './components/ViewInfosStudents';
import {
  CardsPeoples,
  Container,
  DivSideBar,
  DivSideBarActivity,
  InputButton,
} from './styled';
import useStudent from './useStudents';

export default function Students() {
  const {
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
  } = useStudent();

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
            value="Anotar frequência"
            onClick={() => setTypeView('addFrequency')}
          />
        </div>
        <div className="divButtonsClassrooms">
          {user?.type_model_teacher?.classrooms.map((sala) => (
            <InputButton
              typeView="primary"
              type="button"
              value={SplitNameSchool(sala)}
              key={sala}
              isSelected={classroomSelected === sala}
              onClick={() => ChangeClassroomSelected(sala)}
            />
          ))}
        </div>
        {data?.length === 0 && (<h1 style={{ textAlign: 'center' }}>Ainda não tem alunos nesta sala!</h1>)}
        {typeView === 'viewStudents'
          ? (
            <ViewInfosStudents
              data={data}
              handleModalInfosStudentVisible={handleModalInfosStudentVisible}
              handleVisibleCalendar={handleVisibleCalendar}
              key="view"
            />
          )
          : (
            <RegisterFrequency
              data={data}
              FindStudentOnFrequency={FindStudentOnFrequency}
              findPresenceToday={findPresenceToday}
              frequencyStudents={frequencyStudents}
              handleChangeFrequency={handleChangeFrequency}
              handleChangeVisibleModalConfirmFrequency={handleChangeVisibleModalConfirmFrequency}
              key="view"
            />
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
            style={{ height: '40px', marginBottom: '8px', marginTop: '60px' }}
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
            <Link to={`/activity/${infos.Activity.id}?ai=${infos.id}`} key={infos.Activity.id} style={{ textDecoration: 'none', marginBottom: '8px' }}>
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
        title="Você quer adicionar frequência para esses alunos?"
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
