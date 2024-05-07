import Image from 'next/image';
import Link from 'next/link';

import { StarRatingResult } from '@shared/ui/star-rating-result/number-to-star';

import * as S from './review-item-style';

import * as S from './review-item-style';

export const ReviewItem = () => {
  return (
    <Link href='/'>
      <S.ReviewItem>
        <S.UserInfoArea>
          <Image
            className='user-profile'
            src='/images/mock/profileImage.png'
            alt='프로필 이미지'
            width={24}
            height={24}
          />
          <S.Nickname>닉네임</S.Nickname>
          <Image className='check-icon' src='/images/icon/check-icon.svg' alt='프로필 이미지' width={14} height={11} />
        </S.UserInfoArea>
        <S.ContentArea>
          <StarRatingResult number={3.5} />
          <div className='content'> 잘 쓰겠습니다. 좋은 물건 나눔 감사드려요!</div>
        </S.ContentArea>
      </S.ReviewItem>
    </Link>
  );
};
