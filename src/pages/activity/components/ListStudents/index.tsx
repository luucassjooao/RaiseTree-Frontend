/* eslint-disable no-unused-vars */
import { StyledButton } from '../../../../components/Button/styled';
import ContainerReplyTeacher from './components/ContainerReplysTeacher';
import TableStudents from './components/TableStudents';
import { DivButtons } from '../../style';
import { ContainerTable, H1Headline } from './styles';
import { TTActivityScreen } from '../../../../utils/types/typesActivity';
import { IAnswerTeacherTableStudents, TObjectAnswer } from '../../../../utils/types/typesAnswerActivity';

type TListStudents = {
  handleAnswerList(): void;
  answerList: boolean;
  activity: TTActivityScreen | undefined;
  handleAnswerNote(
    note: string,
    point: number,
    idAnswer: string,
    idStudent: string,
  ): void;
  isLoading: boolean;
  handleModalOpen(student: IAnswerTeacherTableStudents): void;
  studentAnswerThisActivity: TObjectAnswer | undefined;
  handleBackAllActivity(): void;
}

export default function ListStudents({
  handleAnswerList,
  answerList,
  activity,
  handleAnswerNote,
  isLoading,
  handleModalOpen,
  studentAnswerThisActivity,
  handleBackAllActivity,
}: TListStudents) {
  const verifyCountAnswerOfStudents = activity?.answered_activities.length === 0;

  return (
    <>
      {studentAnswerThisActivity && (
      <ContainerReplyTeacher
        id={studentAnswerThisActivity.id}
        Student={studentAnswerThisActivity.Student}
        answer={studentAnswerThisActivity.answer}
        createdAt={studentAnswerThisActivity.createdAt}
        callback={handleAnswerNote}
        isLoading={isLoading}
        fullActivity={studentAnswerThisActivity}
        handleBackAllActivity={handleBackAllActivity}
      />
      )}

      {!studentAnswerThisActivity && !verifyCountAnswerOfStudents && (
      <DivButtons>
        <StyledButton
          size={130}
          style={{ height: '48px' }}
          onClick={handleAnswerList}
          purpleBackground
          isPropTrue={answerList}
          danger={false}
        >
          Ver em lista
        </StyledButton>
        <StyledButton
          size={130}
          style={{ height: '48px' }}
          onClick={handleAnswerList}
          purpleBackground
          isPropTrue={answerList}
          danger={false}
        >
          Ver em Tabela
        </StyledButton>
      </DivButtons>

      )}

      {verifyCountAnswerOfStudents && (
        <H1Headline>Nenhum aluno(a) respondeu a está atividade 🙃</H1Headline>
      )}

      {!studentAnswerThisActivity
      && answerList
      && activity?.answered_activities.map((answeredActivities: TObjectAnswer) => (
        <ContainerReplyTeacher
          key={answeredActivities.id}
          id={answeredActivities.id}
          Student={answeredActivities.Student}
          answer={answeredActivities.answer}
          createdAt={answeredActivities.createdAt}
          callback={handleAnswerNote}
          isLoading={isLoading}
          fullActivity={activity}
        />
      ))}
      {!answerList && (
      <ContainerTable role="grid">
        <thead>
          <tr>
            <th>Name</th>
            <th>Sala</th>
            <th>Atividade entregue em</th>
            <th>Resposta</th>
          </tr>
        </thead>
        <tbody>
          {activity?.answered_activities
            .map(
              (answeredActivities: IAnswerTeacherTableStudents) => (
                <TableStudents
                  key={answeredActivities.id}
                  id={answeredActivities.id}
                  Student={answeredActivities.Student}
                  answer={answeredActivities.answer}
                  createdAt={answeredActivities.createdAt}
                  modalOpen={() => handleModalOpen(answeredActivities)}
                />
              ),
            )}
        </tbody>
      </ContainerTable>
      )}
    </>
  );
}
