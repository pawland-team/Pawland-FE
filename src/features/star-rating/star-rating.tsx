import { useState } from 'react';
import { StarInput } from './star-input';
import * as S from './star-rating-style';

export const StarRating = () => {
  // const [rating, setRating] = useState(0);

  // const handleClickRating = (value) => {
  //   setRating(value);
  // };
  const [selectedRating, setSelectedRating] = useState(0);

  const handleClickRating = (selectedUniqueValue: number) => {
    // 선택한 구역이 갖고 있는 값으로 rating을 설정
    setSelectedRating(selectedUniqueValue);
  };

  return (
    <S.StarRating>
      <S.StarArea>
        <S.RatingField>
          {/* <StarInput onClickRating={handleClickRating} rating={selectedRating} value={5} isHalf={false} />
          <StarInput onClickRating={handleClickRating} rating={selectedRating} value={4.5} isHalf={true} />
          <StarInput onClickRating={handleClickRating} rating={selectedRating} value={4} isHalf={false} />
          <StarInput onClickRating={handleClickRating} rating={selectedRating} value={3.5} isHalf={true} />
          <StarInput onClickRating={handleClickRating} rating={selectedRating} value={3} isHalf={false} />
          <StarInput onClickRating={handleClickRating} rating={selectedRating} value={2.5} isHalf={true} />
          <StarInput onClickRating={handleClickRating} rating={selectedRating} value={2} isHalf={false} />
          <StarInput onClickRating={handleClickRating} rating={selectedRating} value={1.5} isHalf={true} />
          <StarInput onClickRating={handleClickRating} rating={selectedRating} value={1} isHalf={false} />
          <StarInput onClickRating={handleClickRating} rating={selectedRating} value={0.5} isHalf={true} /> */}
          <StarInput onClickRating={handleClickRating} selectedRating={selectedRating} uniqueValue={5} isHalf={false} />
          <StarInput
            onClickRating={handleClickRating}
            selectedRating={selectedRating}
            uniqueValue={4.5}
            isHalf={true}
          />
          <StarInput onClickRating={handleClickRating} selectedRating={selectedRating} uniqueValue={4} isHalf={false} />
          <StarInput
            onClickRating={handleClickRating}
            selectedRating={selectedRating}
            uniqueValue={3.5}
            isHalf={true}
          />
          <StarInput onClickRating={handleClickRating} selectedRating={selectedRating} uniqueValue={3} isHalf={false} />
          <StarInput
            onClickRating={handleClickRating}
            selectedRating={selectedRating}
            uniqueValue={2.5}
            isHalf={true}
          />
          <StarInput onClickRating={handleClickRating} selectedRating={selectedRating} uniqueValue={2} isHalf={false} />
          <StarInput
            onClickRating={handleClickRating}
            selectedRating={selectedRating}
            uniqueValue={1.5}
            isHalf={true}
          />
          <StarInput onClickRating={handleClickRating} selectedRating={selectedRating} uniqueValue={1} isHalf={false} />
          <StarInput
            onClickRating={handleClickRating}
            selectedRating={selectedRating}
            uniqueValue={0.5}
            isHalf={true}
          />
        </S.RatingField>
        <S.RatingValue>{selectedRating}점</S.RatingValue>
      </S.StarArea>

      <S.Text> 별점을 드래그 해보세요!</S.Text>
    </S.StarRating>
  );
};
