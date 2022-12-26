/* eslint-disable react/no-danger */

import { useState } from 'react';
import Button from '../Button';
import { ContainerAnswer, ContainerFooterActivity } from './styles';
import InputAnswerTeacher from '../Answer/InputTeacherAnswerReplyActiviyOfStudent';
import { IAnswerTeacherContainerReply } from '../../utils/types';

export default function ContainerReplyTeacher({
  id, Student, answer, createdAt, callback, isLoading,
}: IAnswerTeacherContainerReply) {
  const [noteAnswer, setNoteAnswer] = useState<boolean>(false);

  function handleNoteStudent() {
    setNoteAnswer((prevState) => (prevState !== true));
  }

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
      <ContainerAnswer>
        <div
          dangerouslySetInnerHTML={{
            __html: answer,
          }}
        />
      </ContainerAnswer>
      <div style={{ display: 'flex' }}>
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
      </div>

    </ContainerFooterActivity>
  );
}
