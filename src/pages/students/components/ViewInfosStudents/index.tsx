/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import { TStudents } from '../../../../utils/types/typesStudent';
import { ContainerTable, TDCountActivities } from './styled';

type TViewStudents = {
  data: TStudents[] | undefined;
  handleVisibleCalendar(student: TStudents): void;
  handleModalInfosStudentVisible(studentId: string): void;
}

export default function ViewInfosStudents({
  data,
  handleVisibleCalendar,
  handleModalInfosStudentVisible,
}: TViewStudents): JSX.Element {
  return (
    <ContainerTable role="grid" key="view">
      {data?.length as number > 0 && (
      <thead>
        <tr>
          <th>Nome</th>
          <th>Pontos</th>
          <th>Frequencia</th>
          <th>Atividades Entregues</th>
        </tr>
      </thead>
  )}
      <tbody>
        {data?.map((infos) => (
          <tr key={infos.id}>
            <td>{infos.user.name}</td>
            <td>{infos.current_points}</td>
            <td
              role="gridcell"
              className="watch-frequency"
              onClick={() => handleVisibleCalendar(infos)}
            >
              Ver Frequencia
            </td>
            <TDCountActivities
              role="gridcell"
              onClick={() => infos._count?.reply_activities as number > 0
            && handleModalInfosStudentVisible(infos.id)}
              activities={infos._count?.reply_activities !== 0}
            >
              Clique para visuzalizar
            </TDCountActivities>
          </tr>
        ))}
      </tbody>
    </ContainerTable>
  );
}
