import { queryOptions } from '@tanstack/react-query';

import { getTodoApi } from '@shared/api/todo-api';
import { getUrgentTodoApi } from '@shared/api/todo-api/get-urgent-todo-api';

export const todoQueryKeys = {
  all: () => ['todo'],
  urgent: () => [...todoQueryKeys.all(), 'urgent'],
};

export const todoQuery = {
  all: () =>
    queryOptions({
      queryKey: todoQueryKeys.all(),
      queryFn: getTodoApi,
    }),

  urgent: () =>
    queryOptions({
      queryKey: todoQueryKeys.urgent(),
      queryFn: getUrgentTodoApi,
    }),
};
