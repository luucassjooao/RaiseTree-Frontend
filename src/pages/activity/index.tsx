import InputAnswerStudent from '../../components/Answer/InputStudentAnswerActivity';
import {
  Container, ContainerAnswer, ContainerHeaderActivity,
} from './style';
import useActivity from './useActivity';
import SideBarListStudents from './components/SideBarListStudents';
import ListStudents from './components/ListStudents';
import Loader from '../../components/Loader';

export default function Activity() {
  const {
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
    handleBackAllActivity,
  } = useActivity();

  const activity = data;
  const isLoadingActivity = isLoading;

  return (
    <>
      <Loader isLoading={isLoadingActivity} />

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
            isLoading={isLoadingPostPut}
            handleModalOpen={handleModalOpen}
            studentAnswerThisActivity={studentAnswerThisActivity}
            handleBackAllActivity={handleBackAllActivity}
          />
        )}
        {user?.type === 'student' && (
          <div style={{ width: '90%', margin: '24px auto 0px auto' }}>
            {studentAnswerThisActivity
              ? (
                <>
                  <h1>Voce já respondeu está atividade 🤓</h1>
                  <br />
                  <h2>Sua resposta!</h2>
                  <ContainerAnswer
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{
                      __html: studentAnswerThisActivity.answer,
                    }}
                  />

                  {studentAnswerThisActivity.note_of_teacher !== '' && (
                    <>
                      <h2>Nota do seu Professor(a)</h2>
                      <ContainerAnswer
                        // eslint-disable-next-line react/no-danger
                        dangerouslySetInnerHTML={{
                          __html: studentAnswerThisActivity.note_of_teacher as string,
                        }}
                      />
                    </>
                  )}
                </>
              )
              : (
                <>
                  <h2>Responda a está atividade! 😄</h2>
                  <InputAnswerStudent callback={handleAnswer} isLoading={isLoadingPostPut} />
                </>
              )}
          </div>
        )}
        {user?.type === 'admin' && (
          <h1 style={{ textAlign: 'center' }}>Você não tem acesso as respostas dos alunos!</h1>
        )}
      </Container>
    </>
  );
}
