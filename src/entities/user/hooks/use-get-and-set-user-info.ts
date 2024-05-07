import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { useGetUserInfo } from './use-get-user-info.query';
import { useUserStore } from '../model';

interface UseGetAndSetUserInfoParam {
  willRedirect?: boolean | { redirectPath: string };
}

export type UseGetAndSetUserInfo = typeof useGetAndSetUserInfo;

/**
 * @description
 * 페이지 전체가 아니라 일부분만을 프로텍트하고 싶을 때 사용한다.
 */
export const useGetAndSetUserInfo = ({ willRedirect }: UseGetAndSetUserInfoParam) => {
  const router = useRouter();
  // stale time과 gcTime을 1시간으로 설정하였다.
  // 서버측 accessToken의 시간과 맞추는 것이 좋아보인다.
  const { data, status, ...rest } = useGetUserInfo();

  // 어차피 매번 useGetUserInfo로 검증해야 하는데 useUserStore가 굳이 필요한가?
  // 일단 사용하는 곳이 있으니 지우지 않는다.
  const { clearUserInfo, setUserInfo } = useUserStore((state) => ({
    clearUserInfo: state.clearUserInfo,
    setUserInfo: state.setUserInfo,
    userInfo: state.userInfo,
  }));

  useEffect(() => {
    if (status === 'error') {
      clearUserInfo();

      if (willRedirect) {
        if (typeof willRedirect === 'boolean') {
          router.replace('/login');

          return;
        }

        if (typeof willRedirect === 'object') {
          router.replace(willRedirect.redirectPath);

          return;
        }
      }
    }

    if (status === 'success' && data) {
      setUserInfo(data);
    }
  }, [router, data, status, clearUserInfo, setUserInfo, willRedirect]);

  return { data, status, ...rest };
};
