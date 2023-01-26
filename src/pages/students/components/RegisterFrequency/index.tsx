/* eslint-disable no-unused-vars */
import Button from '../../../../components/Button';
import { TStudents } from '../../../../utils/types/typesStudent';
import { TFrequencyStudents, TReturnFindStudent } from '../../types';
import { ContainerTable, TDInfoStudentFrequency } from './styled';

type TRegisterFrequency = {
  data: TStudents[] | undefined;
  handleChangeFrequency(infos: TStudents): void;
  FindStudentOnFrequency(infos: TStudents): TReturnFindStudent;
  findPresenceToday(infos: TStudents): boolean;
  handleChangeVisibleModalConfirmFrequency(): void;
  frequencyStudents: TFrequencyStudents[];
}

export default function RegisterFrequency({
  data,
  handleChangeFrequency,
  FindStudentOnFrequency,
  findPresenceToday,
  handleChangeVisibleModalConfirmFrequency,
  frequencyStudents,
}: TRegisterFrequency) {
  return (
    <>
      <ContainerTable role="grid" key="view">
        {data?.length as number > 0 && (
        <thead>
          <tr>
            <th>Nome</th>
            <th>Frequencia</th>
          </tr>
        </thead>
    )}
        <tbody>
          {data?.map((infos) => (
            <tr key={infos.id}>
              <td>{infos.user.name}</td>
              <TDInfoStudentFrequency
                role="gridcell"
                onClick={() => handleChangeFrequency(infos)}
                frequency={FindStudentOnFrequency(infos).isPresence}
                isPresenceToday={findPresenceToday(infos)}
              >
                {FindStudentOnFrequency(infos).label}
              </TDInfoStudentFrequency>
            </tr>
          ))}
        </tbody>
      </ContainerTable>
      {data?.length as number > 0 && (
      <div className="divButtonConfirmFrequency">
        <Button
          type="button"
          size={190}
          onClick={handleChangeVisibleModalConfirmFrequency}
          disabled={frequencyStudents.length <= 0}
        >
          Confirmar Frequencia
        </Button>
      </div>
  )}
    </>
  );
}
