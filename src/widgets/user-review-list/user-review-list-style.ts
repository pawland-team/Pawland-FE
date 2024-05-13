import styled from 'styled-components';

export const UserReviewList = styled.div`
  display: flex;
  flex-direction: column;

  width: 95%;
  max-width: 1194px;
  margin-top: 110px;

  h3 {
    margin-bottom: 72px;
    padding-bottom: 27px;

    font-size: 2.8rem;
    font-weight: 600;

    border-bottom: 1px solid ${({ theme }) => theme.color.black_000000};
  }
`;
