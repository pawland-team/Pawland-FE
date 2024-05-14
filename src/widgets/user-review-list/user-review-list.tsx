import { UserReviewItem } from '@entities/user/ui/user-review-item';

import * as S from './user-review-list-style';

export const UserReviewList = () => {
  return (
    <S.UserReviewList>
      <h3>'닉네임'님의 리뷰</h3>
      <UserReviewItem />
    </S.UserReviewList>
  );
};
