import { ChangeEvent, useState } from 'react';

type FormState<T> = {
  [K in keyof T]: string;
}

type UseForm<T> = {
  [K in keyof FormState<T>]: string;
} & {
  formState: FormState<T>;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onResetForm: () => void;
}

export const useForm = <T extends object>( initialForm: T = {} as T ): UseForm<T> => {
  const [ formState, setFormState ] = useState<FormState<T>>( initialForm as FormState<T> );

  const onInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [ name ]: value,
    });
  }

  const onResetForm = () => {
    setFormState(initialForm as FormState<T>);
  }

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
  }
}
