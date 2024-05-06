import { devtools } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

import { GetUserInfoResponse } from '@shared/apis/user-api';

interface UserStoreState {
  setUserInfo: (userInfo: GetUserInfoResponse) => void;
  userInfo?: GetUserInfoResponse;
  clearUserInfo: () => void;
}

/**
 * TODO: nav bar에서 react query 호출 후에 userInfo 채우는 방식으로 변경해야 함
 */
export const useUserStore = createWithEqualityFn<UserStoreState>()(
  devtools(
    (set) => ({
      setUserInfo: (userInfo) => set({ userInfo }),
      clearUserInfo: () => set({ userInfo: undefined }),
    }),
    {
      enabled: process.env.NODE_ENV === 'development',
      anonymousActionType: 'UserStore/fetchUserInfo',
      name: 'UserStore',
    },
  ),
  shallow,
);
