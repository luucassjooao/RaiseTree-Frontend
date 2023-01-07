import { ChangeEvent } from 'react';

export type TTClassroom = {
  label: string;
  value: string;
}

export type TMessageError = {
  fieldName: string;
}

export type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement >

export type Login = {
  email: string;
  password: string;
}
