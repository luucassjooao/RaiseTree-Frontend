/* eslint-disable no-unused-vars */
import { StyledButton } from '../../../../components/Button/styled';
import ContainerReplyTeacher from '../../../../components/ContainerReplysTeacher';
import TableStudents from '../../../../components/TableStudents';
import {
  IAnswerTeacherTableStudents,
  TAnswerTeacher,
  TTActivityScreen,
} from '../../../../utils/types';
import { DivButtons } from '../../style';
import { ContainerTable } from './styles';

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
}

export default function ListStudents({
  handleAnswerList,
  answerList,
  activity,
  handleAnswerNote,
  isLoading,
  handleModalOpen,
}: TListStudents) {
  return (
    <>
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

      {answerList && activity?.answered_activities.map((answeredActivities: TAnswerTeacher) => (
        <ContainerReplyTeacher
          key={answeredActivities.id}
          id={answeredActivities.id}
          Student={answeredActivities.Student}
          answer={answeredActivities.answer}
          createdAt={answeredActivities.createdAt}
          callback={handleAnswerNote}
          isLoading={isLoading}
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
