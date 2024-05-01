import { GetUserInfoResponse } from './dto';
import { clientWithTokenApi } from '../instance';

/**
 * 내 정보 조회
 */
export const getUserInfo = async () => {
  const response = await clientWithTokenApi.get<GetUserInfoResponse>('/api/user/my-info');

  return response.data;
};
