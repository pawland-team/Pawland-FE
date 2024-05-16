import { getUserCommunityListParams } from './dto';
import { clientWithTokenApi } from '../instance';
import { UserCommunityListEntity } from '../profile-api';

export const getUserCommunityList = async ({ page, userId }: getUserCommunityListParams) => {
  const response = await clientWithTokenApi.get<UserCommunityListEntity>(`/api/post/user/${userId}?page=${page}`);

  return response.data;
};
