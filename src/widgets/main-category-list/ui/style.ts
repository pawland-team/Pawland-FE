import styled from 'styled-components';

export const CategoryList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  max-width: 940px;

  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  img {
    border: 1px solid ${({ theme }) => theme.color.gray_BDBDBD};
    border-radius: 12px;
  }

  p {
    margin-top: 12px;
    font-size: 2rem;
    font-weight: 700;
  }
`;
