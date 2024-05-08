import { useMutation, useQueryClient } from '@tanstack/react-query';

import { todoQueryKeys } from '@entities/todo/apis';
import { addTodoApi } from '@shared/apis/todo-api';

export const useAddTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTodoApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoQueryKeys.all() });
    },
  });
};
