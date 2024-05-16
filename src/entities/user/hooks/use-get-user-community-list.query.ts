import { useQuery } from '@tanstack/react-query';

import { userCommunityQuery } from '../apis';
import { getUserCommunityListParams } from '@shared/apis/user-api/dto';

export const useGetUserCommunityList = ({ page, userId }: getUserCommunityListParams) => {
  return useQuery({ ...userCommunityQuery.userCommunityList({ page, userId }) });
};
