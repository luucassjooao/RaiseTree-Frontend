/* eslint-disable no-unused-vars */
import { FormEvent, SetStateAction } from 'react';
import { InputChange, TMessageError } from '../../../../utils/types/globaTypes';

export interface ISubmit {
  handleSubmit(event: FormEvent): Promise<void>;
  backChoosing(): void;
  getErrorMessageByFieldName({ fieldName }: TMessageError): string | undefined;
  email: string;
  handleEmail(event: InputChange): void;
  password: string;
  handlePassword(event: InputChange): void;
  isSubmitting: boolean;
  isFormValid: boolean | string;
}

export type TRegister = (ISubmit & {
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
});
