import { useState } from 'react';

import { StarRating } from '@features/star-rating';
import { CommonButton } from '@shared/ui/buttons';

import * as S from './review-writing-area-style';
import { useRatingStore } from '@shared/store/use-rating-store';

interface ReviewWritingAreaProps {
  orderId: number;
}

export const ReviewWritingArea = ({ orderId }: ReviewWritingAreaProps) => {
  const [review, setReview] = useState('');
  const { selectedRating } = useRatingStore();
  console.log(selectedRating);

  const handleReviewSubmit = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/review/${orderId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: review,
          star: selectedRating,
        }),
        credentials: 'include',
      });

      if (response.ok) {
        console.log('리뷰가 성공적으로 제출되었습니다.');
      } else {
        console.error('리뷰 제출 실패:', response.statusText);
      }
    } catch (error) {
      console.error('리뷰 제출 실패:', error);
    }
  };

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
          handleClick={handleReviewSubmit}
        >
          리뷰 등록하기
        </CommonButton>
      </S.ButtonArea>
    </>
  );
};
