import * as S from './review-writing-area-style';
import { StarRating } from '../../features/star-rating/star-rating';
import { useState } from 'react';
import { CommonButton } from '../../shared/ui/buttons/index';

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
