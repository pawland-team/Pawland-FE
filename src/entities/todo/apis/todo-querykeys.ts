import { queryOptions } from '@tanstack/react-query';

import { getTodoApi, getUrgentTodoApi } from '@shared/apis/todo-api';

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
