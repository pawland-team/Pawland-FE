import { FormProvider, useForm } from 'react-hook-form';

import { useAddTodoMutation } from '../../hooks/use-add-todo.mutation';
import { AddTodoButton } from '../add-todo-button/add-todo-button';
import { AddTodoFormFieldset, AddTodoFormFieldsetData } from '../add-todo-form-fieldset/add-todo-form-fieldset';

export const AddTodoForm = () => {
  const { mutate } = useAddTodoMutation();

  const methods = useForm<AddTodoFormFieldsetData>({
    mode: 'onBlur',
    defaultValues: {
      title: '',
    },
  });

  const { handleSubmit, setError, reset } = methods;

  const addTodo = ({ title }: AddTodoFormFieldsetData) => {
    mutate(title, {
      onSuccess: () => {
        reset();
      },
      onError: () => {
        // https://react-hook-form.com/docs/useform/seterror
        setError(
          'title',
          {
            type: 'manual',
            message: 'Failed to add todo',
          },
          { shouldFocus: true },
        );
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(addTodo)}>
        <AddTodoFormFieldset />
        <AddTodoButton />
      </form>
    </FormProvider>
  );
};
