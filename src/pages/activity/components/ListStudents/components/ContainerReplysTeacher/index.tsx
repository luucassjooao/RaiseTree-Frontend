/* eslint-disable react/no-danger */

import { useEffect, useState } from 'react';
import Button from '../../../../../../components/Button';
import { ContainerAnswer, ContainerFooterActivity } from './styles';
import InputAnswerTeacher from '../../../../../../components/Answer/InputTeacherAnswerReplyActiviyOfStudent';
import { IAnswerTeacherContainerReply, IObjectAnswer } from '../../../../../../utils/types';

export default function ContainerReplyTeacher({
  id, Student, answer, createdAt, callback, isLoading, fullActivity,
}: IAnswerTeacherContainerReply) {
  const [noteAnswer, setNoteAnswer] = useState<boolean>(false);
  const [replyThisAnswerOfStudent, setReplyThisAnswerOfStudent] = useState<IObjectAnswer>();

  function handleNoteStudent() {
    setNoteAnswer((prevState) => (prevState !== true));
  }

  useEffect(() => {
    const findReplyOnThisStudent: IObjectAnswer = fullActivity.answered_activities
      .find((idUser: IObjectAnswer) => idUser.Student.user.id === Student.user.id);

    if (findReplyOnThisStudent.note_of_teacher !== '') {
      setReplyThisAnswerOfStudent(findReplyOnThisStudent);
    }
  }, []);

  return (
    <ContainerFooterActivity>
      <span>
        Aluno:&nbsp;
        {Student.user.name}
        &nbsp;&nbsp;
        -&nbsp;&nbsp;
        Sala:&nbsp;
        {Student.classroom.split(' | ')[1]}
        &nbsp;&nbsp;
        -&nbsp;&nbsp;
        Atividade Entregue em:&nbsp;
        {new Date(createdAt).toLocaleDateString('pt-br')}
        &nbsp;&nbsp;
        -&nbsp;&nbsp;
        Pontos do aluno deste aluno atualmente:&nbsp;
        {Student.current_points}
      </span>
      <ContainerAnswer
        dangerouslySetInnerHTML={{
          __html: answer,
        }}
      />
      <div style={{ display: 'flex' }}>
        {replyThisAnswerOfStudent && (
          <div style={{ display: 'grid' }}>
            <h2>Voce já respondeu este aluno(a)! Sua resposta ⬇️</h2>
            <ContainerAnswer
              dangerouslySetInnerHTML={{
                __html: replyThisAnswerOfStudent.note_of_teacher as string,
              }}
            />
          </div>
        )}

        {!replyThisAnswerOfStudent && (
        <>
          {noteAnswer ? (
            <Button style={{ marginTop: '10px', height: '52px' }} type="button" size={120} isLoading={false} onClick={handleNoteStudent}>
              Cancelar
            </Button>
          ) : (
            <Button style={{ marginTop: '10px', height: '52px' }} type="button" size={200} isLoading={false} onClick={handleNoteStudent}>
              Fazer uma observação/dar nota a este aluno(a)
            </Button>
          )}

          {noteAnswer && (
          <div style={{ width: '80%', marginLeft: '20px' }}>
            <InputAnswerTeacher
              callback={callback}
              isLoading={isLoading}
              idAnswer={id}
              idStudent={Student.id}
            />
          </div>
          )}

        </>
        )}
      </div>

    </ContainerFooterActivity>
  );
}
