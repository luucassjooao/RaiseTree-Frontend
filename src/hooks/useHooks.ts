import { useState } from 'react';

type TSetErrors = {
  field: string;
  message: string;
}

type TFieldName = {
  fieldName: string;
}

export function useErrors() {
  const [errors, setErrors] = useState<TSetErrors[]>([]);

  function setError({ field, message }: TSetErrors) {
    const errorAlreadyExists = errors.find((error) => error.field === field);

    if (errorAlreadyExists) {
      return;
    }

    setErrors((prevState) => [
      ...prevState,
      { field, message },
    ]);
  }

  function removeError({ fieldName }: TFieldName) {
    setErrors((prevState) => prevState.filter(
      (error) => error.field !== fieldName,
    ));
  }

  // eslint-disable-next-line max-len
  const getErrorMessageByFieldName = ({ fieldName }: TFieldName) => errors.find((error) => error.field === fieldName)?.message;

  return {
    errors, setError, removeError, getErrorMessageByFieldName,
  };
}
