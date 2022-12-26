/* eslint-disable no-unused-vars */
import { FormEvent, SetStateAction } from 'react';
import Button from '../../../../../components/Button';
import { StyledButton } from '../../../../../components/Button/styled';
import FormGroup from '../../../../../components/FormGroup';
import { Input } from '../../../../../components/Input';
import Select from '../../../../../components/Select';
import { InputChange } from '../../../../../utils/types';
import { ChoosingContainer } from '../styles';
import { ContainerInputsRegisters, DivButtons } from './styles';

type TMessageError = {
  fieldName: string;
}

type TRegister = {
  handleRegister(event: FormEvent): Promise<void>;
  backChoosing(): void;
  getErrorMessageByFieldName({ fieldName }: TMessageError): string | undefined;
  email: string;
  handleEmail(event: InputChange): void;
  password: string;
  handlePassword(event: InputChange): void;
  isSubmitting: boolean;
  isFormValidRegister: boolean | string;
  typeUserRegister: string;
  setTypeUserRegister(value: SetStateAction<string>): void;
  name: string;
  handleName(event: InputChange): void;
  code: string;
  handleCodingCpf(event: InputChange): void;
  confirmPassword: string;
  handleConfirmPassword(event: InputChange): void;
  isLoadingSubject: boolean;
  subjectId: string;
  setSubjectId(value: SetStateAction<string>): void;
  subjects: string[];
}

export default function RegisterLP({
  handleRegister,
  backChoosing,
  getErrorMessageByFieldName,
  email,
  handleEmail,
  password,
  handlePassword,
  isSubmitting,
  isFormValidRegister,
  typeUserRegister,
  setTypeUserRegister,
  name,
  handleName,
  code,
  handleCodingCpf,
  confirmPassword,
  handleConfirmPassword,
  isLoadingSubject,
  subjectId,
  setSubjectId,
  subjects,
}: TRegister) {
  return (
    <ChoosingContainer noValidate onSubmit={handleRegister}>
      <Button
        isLoading={false}
        size={65}
        style={{ height: '40px', marginBottom: '8px' }}
        type="button"
        yellowBackground
        onClick={backChoosing}
      >
        <span>Voltar</span>
      </Button>
      <h3>Coloque seus dados para se juntar a uma organização!</h3>

      <DivButtons>
        <StyledButton
          type="button"
          size={90}
          onClick={() => setTypeUserRegister('student')}
          isStudent={(typeUserRegister === 'student') === true}
          isRegister
          danger={false}
        >
          Estudante
        </StyledButton>
        <StyledButton
          type="button"
          size={90}
          onClick={() => setTypeUserRegister('teacher')}
          isStudent={(typeUserRegister === 'teacher') === false}
          isRegister
          danger={false}
        >
          Professor
        </StyledButton>
      </DivButtons>

      <ContainerInputsRegisters>
        {typeUserRegister === 'student' && (
        <>
          <FormGroup error={getErrorMessageByFieldName({ fieldName: 'name' })}>
            <Input
              size={350}
              type="text"
              placeholder="Qual seu nome? **"
              error={getErrorMessageByFieldName({ fieldName: 'name' })}
              value={name}
              onChange={handleName}
            />
          </FormGroup>
          <FormGroup error={getErrorMessageByFieldName({ fieldName: 'code' })}>
            <Input
              size={350}
              type="text"
              placeholder="Coloque seu CPF **"
              error={getErrorMessageByFieldName({ fieldName: 'code' })}
              value={code}
              onChange={handleCodingCpf}
            />
          </FormGroup>
          <FormGroup error={getErrorMessageByFieldName({ fieldName: 'email' })}>
            <Input
              size={350}
              type="text"
              placeholder="Qual seu Email? **"
              error={getErrorMessageByFieldName({ fieldName: 'email' })}
              value={email}
              onChange={handleEmail}
            />
          </FormGroup>
          <FormGroup error={getErrorMessageByFieldName({ fieldName: 'password' })}>
            <Input
              size={350}
              type="password"
              placeholder="Coloque alguma senha **"
              error={getErrorMessageByFieldName({ fieldName: 'password' })}
              value={password}
              onChange={handlePassword}
            />
          </FormGroup>
          <FormGroup error={getErrorMessageByFieldName({ fieldName: 'confirmPassword' })}>
            <Input
              size={350}
              type="password"
              placeholder="Confirme sua senha **"
              error={getErrorMessageByFieldName({ fieldName: 'confirmPassword' })}
              value={confirmPassword}
              onChange={handleConfirmPassword}
            />
          </FormGroup>
        </>
        )}
        {typeUserRegister === 'teacher' && (
        <>
          <FormGroup error={getErrorMessageByFieldName({ fieldName: 'name' })}>
            <Input
              size={350}
              type="text"
              placeholder="Qual seu nome? **"
              error={getErrorMessageByFieldName({ fieldName: 'name' })}
              value={name}
              onChange={handleName}
            />
          </FormGroup>
          <FormGroup error={getErrorMessageByFieldName({ fieldName: 'email' })}>
            <Input
              size={350}
              type="text"
              placeholder="Qual seu Email? **"
              error={getErrorMessageByFieldName({ fieldName: 'email' })}
              value={email}
              onChange={handleEmail}
            />
          </FormGroup>
          <FormGroup isLoading={isLoadingSubject}>
            <Select
              is500={false}
              style={{ width: '350px' }}
              value={subjectId}
              onChange={(event) => setSubjectId(event.target.value)}
              disabled={isLoadingSubject}
            >
              <option value="">Selecione sua Máteria</option>

              {subjects.map((category: any) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
          </FormGroup>
          <FormGroup error={getErrorMessageByFieldName({ fieldName: 'code' })}>
            <Input
              size={350}
              type="text"
              placeholder="Coloque o Código que lhe foi dado **"
              error={getErrorMessageByFieldName({ fieldName: 'code' })}
              value={code}
              onChange={handleCodingCpf}
            />
          </FormGroup>
          <FormGroup error={getErrorMessageByFieldName({ fieldName: 'password' })}>
            <Input
              size={350}
              type="password"
              placeholder="Coloque alguma senha **"
              error={getErrorMessageByFieldName({ fieldName: 'password' })}
              value={password}
              onChange={handlePassword}
            />
          </FormGroup>
          <FormGroup error={getErrorMessageByFieldName({ fieldName: 'confirmPassword' })}>
            <Input
              size={350}
              type="password"
              placeholder="Confirme sua senha **"
              error={getErrorMessageByFieldName({ fieldName: 'confirmPassword' })}
              value={confirmPassword}
              onChange={handleConfirmPassword}
            />
          </FormGroup>
        </>
        )}
        <br />
        <Button
          isLoading={isSubmitting}
          size={350}
          disabled={!isFormValidRegister}
          type="submit"
          yellowBackground
        >
          Confirmar registro
        </Button>
      </ContainerInputsRegisters>
    </ChoosingContainer>
  );
}
