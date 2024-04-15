import { useMutation, useQueryClient } from '@tanstack/react-query';

import { todoQueryKeys } from '@entities/todo/api/todo-querykeys';
import { addTodoApi } from '@shared/api/todo-api';

export const useAddTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTodoApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoQueryKeys.all() });
    },
  });
};
