import { clientWithTokenApi } from '../instance';
import { GetCurrentUserProfileDataResponse } from './dto';

/**
 * 현재 로그인한 유저 정보 얻기
 */
export const getCurrentUserProfileApi = async () => {
  const response = await clientWithTokenApi<GetCurrentUserProfileDataResponse>('/users');

  return response.data;
};
