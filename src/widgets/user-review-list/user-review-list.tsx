import * as S from './user-review-list-style';

import { UserReviewItem } from '@entities/user-review-item';

export const UserReviewList = () => {
  return (
    <S.UserReviewList>
      <h3>'닉네임'님의 리뷰</h3>
      <UserReviewItem />
    </S.UserReviewList>
  );
};
