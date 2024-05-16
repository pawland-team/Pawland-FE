import { getMyCommunityListParams, MyCommunityListEntity } from './dto';
import { clientWithTokenApi } from '../instance';

export const getMyCommunityList = async ({ page }: getMyCommunityListParams) => {
  const response = await clientWithTokenApi.get<MyCommunityListEntity>(`/api/post/my-post?page=${page}&size=4`);

  return response.data;
};
