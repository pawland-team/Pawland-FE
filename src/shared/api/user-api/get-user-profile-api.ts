import { clientApi } from '../instance';
import { UserProfileResponse } from './dto';

const GET_SHARED_USER_PROFILE_API = '/users';

/**
 * 폴더 주인 유저 정보 가져오기
 */
export const getUserProfileApi = async (userId: number) => {
  const response = await clientApi<UserProfileResponse>(`${GET_SHARED_USER_PROFILE_API}/${userId}`);

  return response.data;
};
