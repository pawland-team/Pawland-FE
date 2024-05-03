import { FaStar, FaStarHalf } from 'react-icons/fa';
import * as S from './star-style';

interface StarInputProps {
  uniqueValue: number;
  rating: number;
  isHalf: boolean;
}

export const Star = ({ rating, uniqueValue, isHalf }: StarInputProps) => {
  return (
    <>
      <S.BackgroundStar value={uniqueValue} />
      <S.ForeGroundStar $uniqueValue={uniqueValue} $rating={rating} $isHalf={isHalf}>
        {isHalf ? <FaStarHalf /> : <FaStar />}
      </S.ForeGroundStar>
    </>
  );
};
