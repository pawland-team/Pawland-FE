import { useState } from 'react';

import { StarRating } from '@features/star-rating';
import { CommonButton } from '@shared/ui/buttons';

import * as S from './review-writing-area-style';

export const ReviewWritingArea = () => {
  const [review, setReview] = useState('');

  return (
    <>
      <StarRating />
      <S.ReviewInput placeholder='리뷰를 남겨주세요!!!' value={review} onChange={(e) => setReview(e.target.value)} />
      <S.ButtonArea>
        <CommonButton
          borderRadius={'4px'}
          backgroundColor={'#43ADFF'}
          maxWidth={'89px'}
          fontSize={'1.2rem'}
          padding={'6px 10px'}
        >
          리뷰 등록하기
        </CommonButton>
      </S.ButtonArea>
    </>
  );
};
