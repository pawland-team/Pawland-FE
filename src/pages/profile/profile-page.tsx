import { useEffect } from 'react';

import Head from 'next/head';

import { useGetUserInfo } from '@entities/user/hooks';
import { useUserStore } from '@entities/user/model';
import { useActiveButtonStore } from '@shared/store/use-active-button-store';
import { CommunityList } from '@widgets/community-list';
import { ProfilePageMenuBar } from '@widgets/profile-page-menu-bar';
import { RegisteredProductList } from '@widgets/registered-product-list';
import { TransactionHistoryList } from '@widgets/transaction-history-list';
import { UserInfoArea } from '@widgets/user-info-area';
import { UserLoginInfoArea } from '@widgets/user-login-info-area';
// import { WishList } from '@widgets/wish-list';

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
        return <RegisteredProductList />;
      // mainListData가 사라지고 props가 너무 많이 바뀌어서,, 이 부분은 api 불러오실 때 활성화 해야할 것 같습니당 ㅜㅜ
      // case 'wish':
      //   return <WishList itemList={mainListData} />;
      case 'transaction':
        return <TransactionHistoryList />;
      case 'community':
        return <CommunityList />;
      default:
        return <RegisteredProductList />;
    }
  };

  return (
    <>
      <Head>
        <title>Pawland Profile</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <S.ProfilePage>
          <S.UserInfoContainer>
            <UserInfoArea imageSrc={data?.profileImage} nickname={data?.nickname} description={data?.userDesc} />
            <UserLoginInfoArea />
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
