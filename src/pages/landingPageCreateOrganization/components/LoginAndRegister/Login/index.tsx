/* eslint-disable no-unused-vars */
import { FormEvent } from 'react';
import Button from '../../../../../components/Button';
import FormGroup from '../../../../../components/FormGroup';
import { Input } from '../../../../../components/Input';
import { InputChange } from '../../../../../utils/types';
import { ChoosingContainer } from '../styles';

type TMessageError = {
  fieldName: string;
}

type TLogin = {
  handleLogin(event: FormEvent): Promise<void>;
  backChoosing(): void;
  getErrorMessageByFieldName({ fieldName }: TMessageError): string | undefined;
  email: string;
  handleEmail(event: InputChange): void;
  password: string;
  handlePassword(event: InputChange): void;
  isSubmitting: boolean;
  isFormValidLogin: boolean | string;
}

export default function LoginLP({
  handleLogin,
  backChoosing,
  getErrorMessageByFieldName,
  email,
  handleEmail,
  password,
  handlePassword,
  isSubmitting,
  isFormValidLogin,
}: TLogin) {
  return (
    <ChoosingContainer onSubmit={handleLogin} noValidate>
      <Button
        isLoading={false}
        size={65}
        style={{ height: '40px', marginBottom: '8px' }}
        type="button"
        yellowBackground={false}
        onClick={backChoosing}
      >
        <span>Voltar</span>
      </Button>
      <h1>LOGIN</h1>
      <FormGroup error={getErrorMessageByFieldName({ fieldName: 'email' })}>
        <Input
          size={350}
          type="text"
          placeholder="Email"
          error={getErrorMessageByFieldName({ fieldName: 'email' })}
          value={email}
          onChange={handleEmail}
        />
      </FormGroup>
      <FormGroup error={getErrorMessageByFieldName({ fieldName: 'password' })}>
        <Input
          size={350}
          type="password"
          placeholder="Senha"
          error={getErrorMessageByFieldName({ fieldName: 'password' })}
          value={password}
          onChange={handlePassword}
        />
      </FormGroup>
      <br />
      <Button
        isLoading={isSubmitting}
        size={350}
        disabled={!isFormValidLogin}
        type="submit"
        yellowBackground={false}
      >
        Fazer Login
      </Button>
    </ChoosingContainer>
  );
}
