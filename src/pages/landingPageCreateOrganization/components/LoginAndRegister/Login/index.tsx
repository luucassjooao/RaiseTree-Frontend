/* eslint-disable no-unused-vars */
import Button from '../../../../../components/Button';
import FormGroup from '../../../../../components/FormGroup';
import { Input } from '../../../../../components/Input';
import { ISubmit } from '../types';
import { ChoosingContainer } from './styled';

export default function LoginLP({
  handleSubmit,
  backChoosing,
  getErrorMessageByFieldName,
  email,
  handleEmail,
  password,
  handlePassword,
  isSubmitting,
  isFormValid,
}: ISubmit) {
  return (
    <ChoosingContainer onSubmit={handleSubmit} noValidate>
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
        disabled={!isFormValid}
        type="submit"
        yellowBackground={false}
      >
        Fazer Login
      </Button>
    </ChoosingContainer>
  );
}
