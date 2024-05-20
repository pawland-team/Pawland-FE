import { useQuery } from '@tanstack/react-query';

import { getMyCommunityListParams } from '@shared/apis/profile-api';

import { myCommunityQuery } from '../apis';

export const useGetmyCommunityList = ({ page }: getMyCommunityListParams) => {
  return useQuery({ ...myCommunityQuery.myCommunityList({ page }) });
};
