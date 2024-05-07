import * as S from './user-written-review-list-style';

import { UserReviewItem } from '@entities/user-review-item';

export const UserWrittenReviewList = () => {
  return (
    <S.UserWrittenReviewList>
      <h3>'닉네임'님이 작성한 리뷰</h3>
      <UserReviewItem />
    </S.UserWrittenReviewList>
  );
};
