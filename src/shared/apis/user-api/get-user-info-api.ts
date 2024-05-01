// /api/user/my-info

import { clientWithTokenApi } from '../instance';
import { GetUserInfoResponse } from './dto';

/**
 * 내 정보 조회
 */
export const getUserInfo = async () => {
  const response = await clientWithTokenApi.get<GetUserInfoResponse>('/api/user/my-info');

  return response.data;
};
