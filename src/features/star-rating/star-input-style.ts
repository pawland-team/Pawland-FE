import styled, { css } from 'styled-components';

interface LabelProps {
  $isHalf: boolean;
  $uniqueValue: number;
  $selectedRating: number;
}

/**
 * 자신만의 고유한 크기가 아예 없는 input
 */
export const BackgroundStar = styled.input`
  /* dispaly: none을 준 이유는? 겹쳐 있으면 안 보여야 하니까 */
  display: none;
`;

/**
 * input 태그가 자신만의 고유한 크기가 없기 때문에
 * 모든 유저 인터렉티브 이벤트를 input 대신 label이 받아서 처리함
 * 그래서 on*이벤트들을 label에 걸어줘야 한다.
 */
export const ForeGroundStar = styled.label<LabelProps>`
  cursor: pointer;
  font-size: 3.6rem;
  color: ${({ theme, $uniqueValue, $selectedRating }) => {
    // 현재 가리키고 있는 별점의 고유값이 선택된 별점보다 작거나 같으면 색이 칠해진 상태로 표시
    if ($uniqueValue <= $selectedRating) {
      return theme.color.blue_43ADFF;
    }

    // 현재 가리키고 있는 별점의 고유값이 선택된 별점보다 크면 투명한 상태로 표시
    return theme.color.gray_F3F3F3;
  }};

  /* background-color: ${({ theme }) => theme.color.blue_43ADFF}; */

  transition: 0.3s;

  ${({ $isHalf }) =>
    $isHalf &&
    css`
      position: absolute;
      overflow: hidden;
      width: 18px;

      &:nth-of-type(10) {
        transform: translate(-162px);
      }

      &:nth-of-type(8) {
        transform: translate(-126px);
      }

      &:nth-of-type(6) {
        transform: translate(-90px);
      }

      &:nth-of-type(4) {
        transform: translate(-54px);
      }

      &:nth-of-type(2) {
        transform: translate(-18px);
      }
    `};
`;
