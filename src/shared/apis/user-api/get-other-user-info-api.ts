import { GetUserInfoResponse } from './dto';
import { clientWithTokenApi } from '../instance';

/**
 * 다른 유저 정보 조회
 */
export const getOtherUserInfo = async (id: number) => {
  const response = await clientWithTokenApi.get<GetUserInfoResponse>(`/api/user/${id}`);

  return response.data;
};
