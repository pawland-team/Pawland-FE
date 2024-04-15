import { clientWithTokenApi } from '../instance';
import { Todo } from './dto';

export const getTodoApi = async () => {
  const response = await clientWithTokenApi.get<Todo[]>('/todos');

  return response.data;
};
