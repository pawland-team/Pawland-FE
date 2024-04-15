import { clientWithTokenApi } from '../instance';
import { Todo } from './dto';

export const getUrgentTodoApi = async () => {
  const response = await clientWithTokenApi.get<Todo[]>('/todos/urgent');

  return response.data;
};
