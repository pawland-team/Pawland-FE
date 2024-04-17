import { clientApi } from '../instance';
import { User } from './dto';

export const getUserInfoApi = async () => {
  const response = await clientApi.get<User>('/user');

  return response.data;
};
