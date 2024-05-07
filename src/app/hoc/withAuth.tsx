import { FunctionComponent, PropsWithChildren, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { useGetUserInfo } from '@entities/user/hooks';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UseGetAndSetUserInfo } from '@entities/user/hooks/use-get-and-set-user-info';
import { useUserStore } from '@entities/user/model';

/**
 * ### Authentication HOC
 *
 * 페이지 전체를 감싸는 HOC 훅
 *
 * @description
 * `const pathName = usePathname();` 사용하여 최상위 Layout을 감싸지 않는 이유
 * If the hook is accessed from pages/, the pathname may be null when the router is not ready.
 * GSSP, GSP 등을 사용하는 페이지가 있다고 가정하자.
 * pathName 넣고 전체 Layout 컴포넌트에서 사용할 경우에는 ssr때 프리렌더링이 되더라도 pathName은 useEffect 내부에서만 사용하므로 빈 화면이 보임
 *
 * 일부 컴포넌트만을 보호하려면 {@link UseGetAndSetUserInfo} 훅을 사용해야 한다.
 */
export const withAuth = (Component: FunctionComponent<PropsWithChildren>) => {
  const ProtectedComponent = (props: PropsWithChildren) => {
    const router = useRouter();
    const { data, status } = useGetUserInfo();

    // 어차피 매번 useGetUserInfo로 검증해야 하는데 useUserStore가 굳이 필요한가?
    // 일단 사용하는 곳이 있으니 지우지 않는다.
    const { clearUserInfo, setUserInfo } = useUserStore((state) => ({
      clearUserInfo: state.clearUserInfo,
      setUserInfo: state.setUserInfo,
    }));

    useEffect(() => {
      if (status === 'error') {
        clearUserInfo();

        router.replace('/login');
      }

      if (status === 'success' && data) {
        setUserInfo(data);
      }
    }, [router, data, status, clearUserInfo, setUserInfo]);

    if (status === 'pending') {
      return <div>Loading...</div>;
    }

    if (status === 'error') {
      return null;
    }

    return <Component {...props} />;
  };

  return ProtectedComponent;
};
