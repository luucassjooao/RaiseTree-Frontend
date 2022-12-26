import InputAnswerStudent from '../../components/Answer/InputStudentAnswerActivity';
import {
  Container, ContainerHeaderActivity,
} from './style';
import useActivity from './useActivity';
import SideBarListStudents from './components/SideBarListStudents';
import ListStudents from './components/ListStudents';

export default function Activity() {
  const {
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
  } = useActivity();

  return (
    <>
      <SideBarListStudents
        id={studentInfos?.id!}
        answer={studentInfos?.answer!}
        createdAt={studentInfos?.createdAt!}
        isVisible={modalOpen}
        Student={studentInfos?.Student!}
        callback={handleAnswerNote}
        onCancel={handleModalCancel}
      />

      <Container>
        <ContainerHeaderActivity style={{ margin: '0 auto' }}>
          <h1>{activity?.title}</h1>
          <h3>
            Por:&nbsp;
            {activity?.Teacher.user.name}
          </h3>
          <span>{activity?.activity}</span>
          <br />
          <br />

        </ContainerHeaderActivity>
        <hr />
        {user?.type === 'teacher' && (
          <ListStudents
            handleAnswerList={handleAnswerList}
            answerList={answerList}
            activity={activity}
            handleAnswerNote={handleAnswerNote}
            isLoading={isLoading}
            handleModalOpen={handleModalOpen}
          />
        )}
        {user?.type === 'student' && (
        <div style={{ width: '90%', margin: '24px auto 0px auto' }}>
          <h2>Responda a está atividade! 😄</h2>
          <InputAnswerStudent callback={handleAnswer} isLoading={isLoading} />
        </div>
        )}
      </Container>
    </>
  );
}
