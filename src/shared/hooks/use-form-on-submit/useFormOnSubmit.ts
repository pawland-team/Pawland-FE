'use client';

import { FieldValues, useForm, UseFormProps } from 'react-hook-form';

interface UseFormOnSubmitProps<T extends FieldValues> extends UseFormProps<T> {
  onSubmit: (inputs: T) => void;
}

/**
 * handleSubmit만 써도 sumbit이벤트가 발생하도록 해주는 훅
 * useFormOnSubmit에는 onSubmit이라는 커스텀 프로퍼티가 추가로 들어가야한다.
 */
export const useFormOnSubmit = <T extends FieldValues>(useFormProps?: UseFormOnSubmitProps<T>) => {
  const onSubmitHandler = async (inputs: T) => {
    if (typeof useFormProps?.onSubmit === 'function') {
      useFormProps.onSubmit(inputs);
    }
  };

  const { handleSubmit, ...rest } = useForm<T>(useFormProps);

  return {
    ...rest,
    handleSubmit: handleSubmit(onSubmitHandler),
  };
};
