import { MyCommunityPostEntity } from './dto';
import { clientWithTokenApi } from '../instance';

export const getMyCommunityList = async (page: number) => {
  const response = await clientWithTokenApi.get<MyCommunityPostEntity>(`/api/post/my-post?page=${page}`);

  return response.data;
};
