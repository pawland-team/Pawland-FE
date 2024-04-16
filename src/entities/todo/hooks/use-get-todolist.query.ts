import { useQuery } from '@tanstack/react-query';

import { todoQuery } from '../apis';

export const useGetTodoList = () => {
  return useQuery({ ...todoQuery.all() });
};
