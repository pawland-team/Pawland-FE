import { useQuery } from '@tanstack/react-query';

import { todoQuery } from '../api/todo-querykeys';

export const useGetTodoList = () => {
  return useQuery({ ...todoQuery.all() });
};
