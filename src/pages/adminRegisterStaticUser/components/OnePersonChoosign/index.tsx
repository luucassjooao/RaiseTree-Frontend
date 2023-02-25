/* eslint-disable no-unused-vars */
import { Dispatch, FormEvent, SetStateAction } from 'react';
import { MultiSelect } from 'react-multi-select-component';
import Button from '../../../../components/Button';
import { StyledButton } from '../../../../components/Button/styled';
import FormGroup from '../../../../components/FormGroup';
import { Input } from '../../../../components/Input';
import Select from '../../../../components/Select';
import { SplitNameSchool } from '../../../../utils/funcs/SplitNameSchool';
import { InputChange, TMessageError, TTClassroom } from '../../../../utils/types/globaTypes';
import { User } from '../../../../utils/types/typesUser';
import { DivButtons } from '../../styles';

type TOnePersonChoosing = {
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
  handleOnSubmitOnePerson(event: FormEvent): void;
  isSubmitting: boolean;
  email: string;
  handleEmailChange(event: FormEvent): void;
}

export default function OnePersonChoosing({
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
  handleOnSubmitOnePerson,
  isSubmitting,
  email,
  handleEmailChange,
}: TOnePersonChoosing) {
  return (
    <>
      <DivButtons>
        <StyledButton
          type="button"
          size={90}
          onClick={() => setType('student')}
          isStudent={(type === 'student') === true}
          isRegister
          danger={false}
        >
          Estudante
        </StyledButton>
        <StyledButton
          type="button"
          size={90}
          onClick={() => setType('teacher')}
          isStudent={(type === 'teacher') === false}
          isRegister
          danger={false}
        >
          Professor
        </StyledButton>
      </DivButtons>
      {type === 'student' && (
      <div className="divMultiSelect">
        <FormGroup error={getErrorMessageByFieldName({ fieldName: 'name' })}>
          <Input
            type="text"
            size={350}
            value={name}
            onChange={handleChangeName}
            placeholder="Nome"
          />
        </FormGroup>
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
        <br />
        <Button
          type="button"
          disabled={!isAddMorePeopleStudent}
          onClick={handleOnSubmitOnePerson}
          size={350}
          isLoading={isSubmitting}
          yellowBackground
        >
          Adicionar
          {` ${name.split(' ')[0]}`}
        </Button>
      </div>
      )}
      {type === 'teacher' && (
      <div className="divMultiSelect">
        <FormGroup error={getErrorMessageByFieldName({ fieldName: 'name' })}>
          <Input
            type="text"
            size={350}
            value={name}
            onChange={handleChangeName}
            placeholder="Nome"
          />
        </FormGroup>
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
        <br />
        <Button
          type="button"
          disabled={!isAddMorePeopleTeacher}
          onClick={handleOnSubmitOnePerson}
          size={350}
          isLoading={isSubmitting}
          yellowBackground
        >
          Adicionar
          {` ${name.split(' ')[0]}`}
        </Button>
      </div>
      )}
    </>
  );
}
