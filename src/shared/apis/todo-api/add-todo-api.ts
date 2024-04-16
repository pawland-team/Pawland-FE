import { AxiosResponse } from 'axios';

import { clientWithTokenApi } from '../instance';
import { AddTodoRequestBody, Todo } from './dto';

export const addTodoApi = async (title: string) => {
  const response = await clientWithTokenApi.post<Todo[], AxiosResponse<Todo[]>, AddTodoRequestBody>('/todos', {
    title,
  });

  return response.data;
};
