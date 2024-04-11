import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { CurrentUserProfileData } from '@shared/api/user-api';

import { userQuery } from '../api/user.queries';

interface UseGetCurrentUserProfileParam<QueryData> {
  select?: UseQueryOptions<CurrentUserProfileData[], Error, QueryData>['select'];
}

const useGetCurrentUserProfile = <QueryData>({ select }: UseGetCurrentUserProfileParam<QueryData>) => {
  return useQuery({ ...userQuery.currentUserProfile(), select });
};

export { useGetCurrentUserProfile };
