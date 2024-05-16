import { useEffect } from 'react';

import Head from 'next/head';

import { useGetUserInfo } from '@entities/user/hooks';
import { useUserStore } from '@entities/user/model';
import { useActiveButtonStore } from '@shared/store/use-active-button-store';
import { MyCommunityList } from '@widgets/my-community-list/my-community-list';
import { MyInfoArea } from '@widgets/my-info-area';
import { MyLoginInfoArea } from '@widgets/my-login-info-area';
import { MyRegisteredProductList } from '@widgets/my-registered-product-list/my-registered-product-list';
import { TransactionHistoryList } from '@widgets/my-transaction-history-list';
import { WishList } from '@widgets/my-wish-list';
import { ProfilePageMenuBar } from '@widgets/profile-page-menu-bar';

import * as S from './profile-page-style';

interface ActiveButtonState {
  activeButton: string;
}

export const ProfilePage = () => {
  const { data, status } = useGetUserInfo();
  const { setUserInfo } = useUserStore((state) => ({ setUserInfo: state.setUserInfo }));
  const activeButton = useActiveButtonStore((state: ActiveButtonState) => state.activeButton);

  useEffect(() => {
    if (status === 'success' && data) {
      setUserInfo(data);
    }
  }, [data, status]);

  const renderComponent = () => {
    switch (activeButton) {
      case 'register':
        return <MyRegisteredProductList />;
      case 'wish':
        return <WishList />;
      case 'transaction':
        return <TransactionHistoryList />;
      case 'community':
        return <MyCommunityList />;
      default:
        return <MyRegisteredProductList />;
    }
  };

  return (
    <>
      <Head>
        <title>Pawland :: 프로필</title>
      </Head>
      <main>
        <S.ProfilePage>
          <S.UserInfoContainer>
            <MyInfoArea imageSrc={data?.profileImage} nickname={data?.nickname} description={data?.userDesc} />
            <MyLoginInfoArea loginType={data?.loginType} email={data?.email} />
          </S.UserInfoContainer>
          <S.ListContainer>
            <ProfilePageMenuBar />
            {renderComponent()}
          </S.ListContainer>
        </S.ProfilePage>
      </main>
    </>
  );
};
