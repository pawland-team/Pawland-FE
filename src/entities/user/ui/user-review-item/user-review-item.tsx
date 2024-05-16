import Image from 'next/image';
import Link from 'next/link';

import { UserReviewEntity } from '@shared/apis/user-api/dto';
import { StarRatingResult } from '@shared/ui/star-rating-result/number-to-star';
import { formatDateShorter } from '@shared/utils/time';

import * as S from './user-review-item-style';

interface UserReviewItemProps {
  item: UserReviewEntity;
}

export const UserReviewItem = ({ item }: UserReviewItemProps) => {
  return (
    <Link href={`/user/${item.reviewerId}`}>
      <S.ReviewItem>
        <Image className='user-profile' src={item.reviewerProfileImage} alt='프로필 이미지' width={95} height={95} />

        <S.TextContainer>
          <S.Nickname>{item.reviewerNickName}</S.Nickname>
          <StarRatingResult number={item.star} />
          <div className='content'> {item.content}</div>
        </S.TextContainer>
        <S.Date>{formatDateShorter(item.createAt)}</S.Date>
      </S.ReviewItem>
    </Link>
  );
};
