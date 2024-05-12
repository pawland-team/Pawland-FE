import { UserCommunityList } from '@widgets/user-community-list';
import { UserInfoArea } from '@widgets/user-info-area';
import { UserRegisteredProductList } from '@widgets/user-registered-product-list';
import { UserReviewList } from '@widgets/user-review-list';

import * as S from './user-page-style';

export const UserPage = () => {
  return (
    <S.UserPage>
      <UserInfoArea
        imageSrc={'images/mock/profileImage.png'}
        nickname='닉네임'
        description='안녕하세요오ㅑ모ㅑ로ㅑ모ㅑ로몲  먀ㅗ랴ㅗ먀ㅗ랴ㅗ먀ㅗㄷ략모매ㅓ애머ㅔㅏㅔ마ㅔㅏㅔ아ㅔ마ㅔㅏㅔㄴㅑ가무;ㅣ넝;ㅓ먜도ㅑ로먀ㅗㅑㅁ'
      />
      <UserRegisteredProductList />
      <UserReviewList />
      <UserCommunityList />
    </S.UserPage>
  );
};
