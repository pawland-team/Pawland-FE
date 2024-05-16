import { useQuery } from '@tanstack/react-query';

import { getUserCommunityListParams } from '@shared/apis/user-api/dto';

import { userCommunityQuery } from '../apis';

export const useGetUserCommunityList = ({ page, userId }: getUserCommunityListParams) => {
  return useQuery({ ...userCommunityQuery.userCommunityList({ page, userId }) });
};
