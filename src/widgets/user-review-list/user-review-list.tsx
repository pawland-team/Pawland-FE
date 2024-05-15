import { UserReviewItem } from '@entities/user/ui/user-review-item';

import * as S from './user-review-list-style';
import { useGetUserReviewList } from '@entities/user/hooks/use-get-user-review-list.query';
import { NoProductBox } from '@shared/ui/error';

interface UserReviewListProps {
  userId: number;
}

export const UserReviewList = ({ userId }: UserReviewListProps) => {
  const initialParams = {
    page: 1,
    size: 4,
    userId: userId,
  };

  const { data, status } = useGetUserReviewList(initialParams);
  console.log(data);

  if (status === 'success') {
    return (
      <S.UserReviewList>
        <h3>'닉네임'님의 리뷰</h3>
        {data?.length === 0 && <NoProductBox />}
        {data.map((item) => (
          <UserReviewItem key={item.reviewId} item={item} />
        ))}
      </S.UserReviewList>
    );
  }
};
