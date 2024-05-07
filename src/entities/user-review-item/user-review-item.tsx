import Link from 'next/link';
import * as S from './user-review-item-style';
import Image from 'next/image';
import { StarRatingResult } from '@entities/star-rating-result/number-to-star';
import { formatDateShorter } from '@shared/utils/time';

export const UserReviewItem = () => {
  return (
    <Link href='/'>
      <S.ReviewItem>
        <Image
          className='user-profile'
          src='/images/mock/profileImage.png'
          alt='프로필 이미지'
          width={95}
          height={95}
        />

        <S.TextContainer>
          <S.Nickname>닉네임</S.Nickname>
          <StarRatingResult number={3.5} />
          <div className='content'> 잘 쓰겠습니다. 좋은 물건 나눔 감사드려요!</div>
        </S.TextContainer>
        <S.Date>{formatDateShorter('2024-03-12T09:52:06.381Z')}</S.Date>
      </S.ReviewItem>
    </Link>
  );
};
