import styled, { css } from 'styled-components';

interface LabelProps {
  $isHalf: boolean;
  $uniqueValue: number;
  $rating: number;
}

export const BackgroundStar = styled.input`
  display: none;
`;

export const ForeGroundStar = styled.label<LabelProps>`
  font-size: 1rem;
  color: ${({ theme, $uniqueValue, $rating }) => {
    if ($uniqueValue <= $rating) {
      return theme.color.black_000000;
    }

    return theme.color.gray_F3F3F3;
  }};

  ${({ $isHalf }) =>
    $isHalf &&
    css`
      position: absolute;
      overflow: hidden;
      width: 18px;

      &:nth-of-type(10) {
        transform: translate(-32px);
      }

      &:nth-of-type(8) {
        transform: translate(-22px);
      }

      &:nth-of-type(6) {
        transform: translate(-12px);
      }

      &:nth-of-type(4) {
        transform: translate(-2px);
      }

      &:nth-of-type(2) {
        transform: translate(8px);
      }
    `};
`;
