import { useFormContext } from 'react-hook-form';

import { styled } from 'styled-components';

import { InputWithLabel } from '@shared/ui/inputs/input-with-label';

export interface AddTodoFormFieldsetData {
  title: string;
}

export const AddTodoFormFieldset = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<AddTodoFormFieldsetData>();

  return (
    <fieldset>
      <legend>Plan your todos</legend>
      <InputWithLabel
        id='todo'
        label='todo'
        placeholder='Enter your todo here'
        {...register('title', {
          required: 'Title is required',
        })}
        isError={!!errors.title}
      >
        {errors.title && <S.ErrorMessage>{errors.title.message}</S.ErrorMessage>}
      </InputWithLabel>
    </fieldset>
  );
};

const S = {
  ErrorMessage: styled.span`
    color: red;
  `,
};
