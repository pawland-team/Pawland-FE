import styled from 'styled-components';

export const StarRating = styled.section`
  gap: 50px;
  margin-top: 24px;
`;

export const StarArea = styled.section`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const RatingValue = styled.span`
  font-size: 2.4rem;
  font-weight: 700;
  color: ${({ theme }) => theme.color.blue_43ADFF};
`;

export const RatingField = styled.fieldset`
  position: relative;
  transform: translateY(2px);

  display: flex;
  flex-direction: row-reverse;
  align-items: center;

  border: none;

  /* input[type='radio']:checked ~ label, */
  label:hover,
  label:hover ~ label {
    color: ${({ theme }) => theme.color.blue_43ADFF};
    transition: 0.3s;
  }
`;

export const Text = styled.span`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.color.gray_9E9E9E};
`;
