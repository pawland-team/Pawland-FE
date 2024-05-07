import * as S from './user-review-list-style';
import { ProductListSwiper } from '@widgets/product-list-swiper';
import { mainListData } from '@shared/apis/main-list-api/main-list-mock';
import { ReviewItem } from '@entities/review-item';
import { UserReviewItem } from '@entities/user-review-item';

export const UserReviewList = () => {
  return (
    <S.UserReviewList>
      <h3>'닉네임'님의 리뷰</h3>
      <UserReviewItem />
    </S.UserReviewList>
  );
};
