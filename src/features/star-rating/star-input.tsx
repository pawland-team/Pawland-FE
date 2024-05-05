import { FaStar, FaStarHalf } from 'react-icons/fa';

import * as S from './star-input-style';

// interface StarInputProps {
//   onClickRating: (value: number) => void;
//   value: number;
//   isHalf: boolean;
// }
interface StarInputProps {
  onClickRating: (value: number) => void;
  /**
   * 마우스가 가리키는 별점의 고유값
   */
  uniqueValue: number;
  /**
   * 마지막에 마우스로 클릭해서(onClick) 최종 선택된 별점
   * - 최종 선택된 별점보다 자신에게 할당되어 있는 uniqueValue가 작은 별점은 색이 칠해진 상태가 유지되어야 한다.
   */
  selectedRating: number;
  /**
   * 마우스가 호버(onMouseOver)되어서 현재 가리키고 있는 별점
   * - 현재 호버되어서 가리키고 있는 별점보다 자신에게 할당되어 있는 uniqueValue가 작은 별점은 색이 칠해진 상태가 유지되어야 한다.
   */
  // hoverRating: number;
  /**
   * 단순히 스타일을 위한 용도로 사용되는 불리언 값
   */
  isHalf: boolean;
}

export const StarInput = ({ onClickRating, selectedRating, uniqueValue, isHalf }: StarInputProps) => {
  const handleClickRatingInput = (e: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
    onClickRating(uniqueValue);
    e.preventDefault();
  };

  return (
    <>
      {/* <S.Input type='radio' name='rating' id={`star${value}`} value={value} />
      <S.Label onClick={handleClickRatingInput} $isHalf={isHalf} htmlFor={`star${value}`}>
        {isHalf ? <FaStarHalf /> : <FaStar />}
      </S.Label> */}
      <S.BackgroundStar value={uniqueValue} />
      <S.ForeGroundStar
        $uniqueValue={uniqueValue}
        $selectedRating={selectedRating}
        onClick={handleClickRatingInput}
        $isHalf={isHalf}
      >
        {isHalf ? <FaStarHalf /> : <FaStar />}
      </S.ForeGroundStar>
    </>
  );
};
