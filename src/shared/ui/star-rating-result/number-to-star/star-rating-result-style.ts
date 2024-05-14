import styled from 'styled-components';

export const StarRating = styled.section`
  gap: 50px;
`;

export const StarArea = styled.section`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const RatingValue = styled.span`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.color.black_000000};
`;

export const RatingField = styled.fieldset`
  position: relative;
  transform: translateY(2px);

  display: flex;
  flex-direction: row-reverse;
  align-items: center;

  border: none;
`;
