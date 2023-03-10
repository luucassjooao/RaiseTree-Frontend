/* eslint-disable no-unused-vars */
import { Dispatch, SetStateAction } from 'react';
import { MultiSelect } from 'react-multi-select-component';
import Button from '../../../../components/Button';
import FormGroup from '../../../../components/FormGroup';
import { Input } from '../../../../components/Input';
import Select from '../../../../components/Select';
import { SplitNameSchool } from '../../../../utils/funcs/SplitNameSchool';
import { InputChange, TMessageError, TTClassroom } from '../../../../utils/types/globaTypes';
import { User } from '../../../../utils/types/typesUser';

type TSpreadSheetChoosing = {
  setType(value: SetStateAction<string>): void;
  type: string;
  user: User | null;
  getErrorMessageByFieldName({ fieldName }: TMessageError): string | undefined;
  handleChangeName(event: InputChange): void;
  name: string;
  classroomStudent: string;
  setClassroomStudent(value: SetStateAction<string>): void;
  cpf: string;
  handleChangeCPF(event: InputChange): void;
  optionsClassroom: TTClassroom[];
  classroomTeacher: TTClassroom[];
  setClassroomTeacher: Dispatch<SetStateAction<TTClassroom[]>>;
  isAddMorePeopleStudent: boolean | string;
  isAddMorePeopleTeacher: boolean | string;
  handleAddMorePeoples(): void;
  isMoreOnePerson: boolean | string;
  handleVisibleCreatePeoplesModal(): void;
  email: string;
  handleEmailChange(event: InputChange): void;
}

export default function MultiPeopleChoosing({
  setType,
  type,
  user,
  getErrorMessageByFieldName,
  handleChangeName,
  name,
  classroomStudent,
  setClassroomStudent,
  cpf,
  handleChangeCPF,
  optionsClassroom,
  classroomTeacher,
  setClassroomTeacher,
  isAddMorePeopleStudent,
  isAddMorePeopleTeacher,
  handleAddMorePeoples,
  isMoreOnePerson,
  handleVisibleCreatePeoplesModal,
  email,
  handleEmailChange,
}: TSpreadSheetChoosing) {
  return (
    <>
      <Select
        is500={false}
        value={type}
        onChange={(event) => setType(event.target.value)}
        placeholder="Escolha as classificação dessa pessoa"
      >
        <option value="">Escolha a classficiação dessa pessoa</option>
        <option value="student">Estudante</option>
        <option value="teacher">Professor</option>
      </Select>
      {type !== '' && (
      <FormGroup error={getErrorMessageByFieldName({ fieldName: 'name' })}>
        <Input
          type="text"
          size={350}
          value={name}
          onChange={handleChangeName}
          placeholder="Nome"
        />
      </FormGroup>
      )}
      {type === 'student' && (
      <>
        <Select
          is500={false}
          value={classroomStudent}
          onChange={(event) => setClassroomStudent(event.target.value)}
        >
          <option value="">Selecione alguma sala</option>
          {user?.type_model_teacher?.classrooms.map((sala) => (
            <option value={sala} key={Math.random()}>
              {SplitNameSchool(sala)}
            </option>
          ))}
        </Select>
        <FormGroup error={getErrorMessageByFieldName({ fieldName: 'cpf' })}>
          <Input
            type="text"
            size={350}
            value={cpf}
            onChange={handleChangeCPF}
            placeholder="CPF"
          />
        </FormGroup>
      </>
      )}
      {type === 'teacher' && (
      <div className="divMultiSelect">
        <FormGroup error={getErrorMessageByFieldName({ fieldName: 'email' })}>
          <Input
            type="email"
            size={350}
            value={email}
            onChange={handleEmailChange}
            placeholder="Endereço de email"
          />
        </FormGroup>
        <MultiSelect
          options={optionsClassroom}
          value={classroomTeacher}
          onChange={setClassroomTeacher}
          labelledBy="tetetet"
        />
      </div>
      )}

      <div className="divButtonsSubmits">
        <Button
          type="button"
          disabled={type === 'student' ? !isAddMorePeopleStudent : !isAddMorePeopleTeacher}
          onClick={handleAddMorePeoples}
          size={350}
          isLoading={false}
          yellowBackground
        >
          Adicionar
          {` ${name.split(' ')[0]}`}
        </Button>
        <Button
          type="button"
          disabled={!isMoreOnePerson}
          onClick={handleVisibleCreatePeoplesModal}
          size={350}
          isLoading={false}
          yellowBackground
        >
          Finalizar
        </Button>
      </div>
    </>
  );
}
