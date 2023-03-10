/* eslint-disable no-unused-vars */
import { SetStateAction } from 'react';
import { StyledButton } from '../../../../components/Button/styled';
import { User } from '../../../../utils/types/typesUser';
import { DivButtons } from '../../styles';

type TSpreadSheetChoosing = {
  setType(value: SetStateAction<string>): void;
  type: string;
  user: User | null;
  SplitNameSchool(sala: string): string;
  CopyText(text: string): void;
  handleUrlSpreadSheet(): void;
}

export default function SpreadSheetChoosing({
  setType,
  type,
  user,
  SplitNameSchool,
  CopyText,
  handleUrlSpreadSheet,
}: TSpreadSheetChoosing) {
  return (
    <>
      <DivButtons>
        <StyledButton
          type="button"
          size={110}
          onClick={() => setType('student')}
          isStudent={(type === 'student') === true}
          isRegister
          danger={false}
        >
          Estudantes
        </StyledButton>
        <StyledButton
          type="button"
          size={110}
          onClick={() => setType('teacher')}
          isStudent={(type === 'teacher') === false}
          isRegister
          danger={false}
        >
          Professores
        </StyledButton>
      </DivButtons>
      {type === 'student' && (
      <div>
        <h3>&quot;Estudante&quot; selecionado</h3>
        <p className="p-primary">Precisamos de algumas informações para continuar!</p>
        <p className="p-primary">Verifique se na planilha existe essas informações</p>
        <br />
        <p className="p-primary">(Clique em qualquer uma das propriedades para copiá-las)</p>
        <button type="button" onClick={() => CopyText('Nome')} className="button-copy-classroom">Nome</button>
        <button type="button" onClick={() => CopyText('Sala')} className="button-copy-classroom">Sala</button>
        <button type="button" onClick={() => CopyText('CPF')} className="button-copy-classroom">CPF</button>
        <br />
        <br />
        <p className="p-primary">Nas células de &quot;Sala&quot;, lembre-se de colocar algumas das salas abaixo!</p>
        <span>Clique em qualquer opção abaixo para copia-lá</span>
        <br />
        {user?.type_model_teacher?.classrooms.map((salas) => (
          <div className="div-classrooms" key={Math.random()}>
            <button
              type="button"
              onClick={() => CopyText(SplitNameSchool(salas))}
              className="button-copy-classroom"
            >
              {SplitNameSchool(salas)}
            </button>
            <br />
          </div>
        ))}
      </div>
      )}
      {type === 'teacher' && (
      <div>
        <h3>&quot;Professor&quot; selecionado</h3>
        <br />
        <p className="p-primary">Precisamos de algumas informações para continuar!</p>
        <p className="p-primary">Verifique se na planilha existe essas informações</p>
        <br />
        <p className="p-primary">(Clique em qualquer uma das propriedades para copiá-las)</p>
        <button type="button" onClick={() => CopyText('Nome')} className="button-copy-classroom">Nome</button>
        <button type="button" onClick={() => CopyText('Email')} className="button-copy-classroom">Email</button>
        <button type="button" onClick={() => CopyText('Sala')} className="button-copy-classroom">Sala</button>
        <br />
        <span>
          (Para registrar um professor(a) com todas as suas turmas, coloque uma VIRGULA
          separando cada sala de aula! Não pode haver espaços antes e nem depois da VIRGULA!)
        </span>
        <br />
        <br />
        <p className="p-primary">Nas células de &quot;Sala&quot;, lembre-se de colocar algumas das salas abaixo!</p>
        <span>Clique em qualquer opção abaixo para copia-lá</span>
        <br />
        {user?.type_model_teacher?.classrooms.map((salas) => (
          <div className="div-classrooms" key={Math.random()}>
            <button
              type="button"
              onClick={() => CopyText(SplitNameSchool(salas))}
              className="button-copy-classroom"
            >
              {SplitNameSchool(salas)}
            </button>
            <br />
          </div>
        ))}
      </div>
      )}
      <div className="next-url-spreadsheet">
        <button type="button" className="button-copy-classroom" onClick={handleUrlSpreadSheet}>
          Colocar a url da planilha
        </button>
      </div>
    </>
  );
}
