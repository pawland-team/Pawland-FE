import Image from 'next/image';
import Link from 'next/link';

import { Buyer, OderReviewResponse } from '@shared/apis/profile-api';
import { StarRatingResult } from '@shared/ui/star-rating-result/number-to-star';

import * as S from './review-item-style';
import { Buyer, OderReviewResponse } from '@shared/apis/profile-api';

interface ReviewItemProps {
  reviewData: OderReviewResponse;
  buyer: Buyer;
}

export const ReviewItem = ({ reviewData, buyer }: ReviewItemProps) => {
  return (
    <S.ReviewItem>
      <Link href={`/user/${buyer.id}`}>
        <S.UserInfoArea>
          <Image className='user-profile' src={buyer.profileImage} alt='프로필 이미지' width={24} height={24} />
          <S.Nickname>{buyer.nickname}</S.Nickname>
          <Image className='check-icon' src='/images/icon/check-icon.svg' alt='프로필 이미지' width={14} height={11} />
        </S.UserInfoArea>
      </Link>
      <S.ContentArea>
        <StarRatingResult number={reviewData.star} />
        <div className='content'> {reviewData.content}</div>
      </S.ContentArea>
    </S.ReviewItem>
  );
};
