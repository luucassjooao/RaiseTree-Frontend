import { ContainerCards, Details } from './styles';

type TPeoples = {
  name: string;
  code: string;
  classroom: string[];
  type: string;
}

export default function CardPeople({
  name, code, classroom, type,
}: TPeoples) {
  return (
    <ContainerCards>
      <h4>
        Nome:
        {` ${name}`}
      </h4>
      <h4>{type === 'student' ? `CPF: ${code}` : `Codigo: ${code}`}</h4>
      <h4>{type === 'student' ? 'Sala: ' : 'Salas: '}</h4>
      {classroom.map((sala) => (
        <Details key={Math.random()}>{sala.split(' | ')[1]}</Details>
      ))}
      <p>{type === 'student' ? 'Estudante' : 'Professor' }</p>
    </ContainerCards>
  );
}
