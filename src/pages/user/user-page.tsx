import { UserCommunityList } from '@widgets/user-community-list';
import { UserInfoArea } from '@widgets/user-info-area';
import { UserRegisteredProductList } from '@widgets/user-registered-product-list';
import { UserReviewList } from '@widgets/user-review-list';

import * as S from './user-page-style';
import { useRouter } from 'next/router';
import { useGetOtherUserInfo } from '@entities/user/hooks';

export const UserPage = () => {
  const router = useRouter();
  const USER_ID = Number(router.query.id);

  const { data } = useGetOtherUserInfo(USER_ID);
  console.log(data);

  return (
    <S.UserPage>
      <UserInfoArea userData={data} />
      <UserRegisteredProductList />
      <UserReviewList />
      <UserCommunityList />
    </S.UserPage>
  );
};
