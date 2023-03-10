import { TPeoples } from '../../../utils/types/typesPeoples';
import { ContainerCards, Details } from './styles';

export default function CardPeople({
  name, code, classroom, type,
}: TPeoples) {
  return (
    <ContainerCards>
      <h4>
        Nome:
        {` ${name}`}
      </h4>
      {type === 'student' && (
        <h4>
          CPF:
          {code}
        </h4>
      )}
      <h4>{type === 'student' ? 'Sala: ' : 'Salas: '}</h4>
      {classroom.map((sala) => (
        <Details key={Math.random()}>{sala.split(' | ')[1]}</Details>
      ))}
      <p>{type === 'student' ? 'Estudante' : 'Professor' }</p>
      {type === 'teacher' && (
        <p>
          Código:
          {` ${code}`}
        </p>
      )}
    </ContainerCards>
  );
}
