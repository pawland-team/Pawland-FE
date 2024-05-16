import { StarInput } from './star-input';
import * as S from './star-rating-style';
import { useRatingStore } from '@shared/store/use-rating-store';

export const StarRating = () => {
  const { selectedRating, setSelectedRating } = useRatingStore();

  const handleClickRating = (selectedUniqueValue: number) => {
    // 선택한 구역이 갖고 있는 값으로 rating을 설정
    setSelectedRating(selectedUniqueValue);
  };

  return (
    <S.StarRating>
      <S.StarArea>
        <S.RatingField>
          <StarInput onClickRating={handleClickRating} selectedRating={selectedRating} uniqueValue={5} isHalf={false} />
          <StarInput onClickRating={handleClickRating} selectedRating={selectedRating} uniqueValue={4.5} isHalf />
          <StarInput onClickRating={handleClickRating} selectedRating={selectedRating} uniqueValue={4} isHalf={false} />
          <StarInput onClickRating={handleClickRating} selectedRating={selectedRating} uniqueValue={3.5} isHalf />
          <StarInput onClickRating={handleClickRating} selectedRating={selectedRating} uniqueValue={3} isHalf={false} />
          <StarInput onClickRating={handleClickRating} selectedRating={selectedRating} uniqueValue={2.5} isHalf />
          <StarInput onClickRating={handleClickRating} selectedRating={selectedRating} uniqueValue={2} isHalf={false} />
          <StarInput onClickRating={handleClickRating} selectedRating={selectedRating} uniqueValue={1.5} isHalf />
          <StarInput onClickRating={handleClickRating} selectedRating={selectedRating} uniqueValue={1} isHalf={false} />
          <StarInput onClickRating={handleClickRating} selectedRating={selectedRating} uniqueValue={0.5} isHalf />
        </S.RatingField>
        <S.RatingValue>{selectedRating}점</S.RatingValue>
      </S.StarArea>

      <S.Text> 별점을 드래그 해보세요!</S.Text>
    </S.StarRating>
  );
};
