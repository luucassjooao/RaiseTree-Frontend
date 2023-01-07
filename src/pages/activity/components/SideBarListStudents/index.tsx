import { useState } from 'react';
import Button from '../../../../components/Button';
import SideBar from '../../../../components/SideBar';
import InputAnswerTeacher from '../../../../components/Answer/InputTeacherAnswerReplyActiviyOfStudent';
import { Container } from './styles';
import { IAnswerTeacherModal } from '../../../../utils/types/typesAnswerActivity';

export default function SideBarListStudents({
  id,
  Student,
  answer,
  createdAt,
  callback,
  isVisible,
  onCancel,
}: IAnswerTeacherModal) {
  const [noteAnswer, setNoteAnswer] = useState<boolean>(false);

  function handleNoteStudent() {
    setNoteAnswer((prevState) => (prevState !== true));
  }

  return (
    <SideBar
      colorBackground="GrayPurple"
      side="right"
      size={800}
      visible={isVisible}
    >
      <Container>
        <div className="headersDiv">
          <h2>
            NOME:&nbsp;
            {Student?.user?.name}
          </h2>
          <h2>
            Sala:&nbsp;
            {Student?.classroom.split(' | ')[1]}
          </h2>
          <h2>
            Atividade entregue em:&nbsp;
            {new Date(createdAt).toLocaleDateString('pt-br')}
          </h2>
          <h2>
            Pontos deste aluno atualmente:&nbsp;
            {Student?.current_points}
          </h2>
          <div
            className="divAnswer"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: answer,
            }}
          />
          {noteAnswer ? (
            <Button style={{ marginTop: '10px', height: '52px' }} type="button" size={120} isLoading={false} onClick={handleNoteStudent}>
              Cancelar
            </Button>
          ) : (
            <Button style={{ marginTop: '10px', height: '52px' }} type="button" size={200} isLoading={false} onClick={handleNoteStudent}>
              Fazer observação/dar nota a este aluno(a)
            </Button>
          )}
        </div>

        {noteAnswer && (
        <div className="divNote">
          <InputAnswerTeacher
            callback={callback}
            isLoading={false}
            idAnswer={id}
            idStudent={Student?.id}
          />
        </div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Button type="button" size={120} isLoading={false} onClick={onCancel} className="buttonBack">
            Voltar
          </Button>
        </div>
      </Container>
    </SideBar>
  );
}
