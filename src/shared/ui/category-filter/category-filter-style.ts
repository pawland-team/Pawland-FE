import styled from 'styled-components';

export const CategoryFilterStyle = styled.div`
  display: flex;
  align-items: stretch;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray_9E9E9E};

  .filter-title {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    max-width: 174px;
    height: inherit;
    padding: 10px 0;

    background: ${({ theme }) => theme.color.gray_F3F3F3};

    p {
      font-size: 1.4rem;
      font-weight: 700;
      line-height: 28px;
    }
  }

  .filter-checkbox {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    align-items: center;

    padding: 12px 20px;
  }
`;
