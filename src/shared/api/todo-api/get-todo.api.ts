import { clientWithTokenApi } from '../instance';
import { Todo } from './dto';

export const getTodo = async () => {
  const response = await clientWithTokenApi.get<Todo[]>('/todos');

  return response.data;
};
