import styled from 'styled-components';

export const UserCommunityList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 110px;
  width: 95%;
  max-width: 1194px;

  h3 {
    margin-bottom: 72px;
    padding-bottom: 27px;
    font-size: 2.8rem;
    font-weight: 600;
    border-bottom: 1px solid ${({ theme }) => theme.color.black_000000};
  }
`;
