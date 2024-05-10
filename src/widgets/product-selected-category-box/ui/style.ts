import styled from 'styled-components';

export const SelectedCategoryBoxStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 10px 13px;

  background-color: ${({ theme }) => theme.color.gray_F9F9F9};
  border-top: 1px solid ${({ theme }) => theme.color.gray_BDBDBD};

  .input-list-box {
    display: flex;
    flex-wrap: wrap;
    gap: 8px 12px;
    align-items: center;
  }

  .clear-box {
    button {
      display: flex;
      gap: 8px;
      align-items: center;

      font-size: 1.4rem;
      line-height: 1.5;
      color: #808080;
    }
  }
`;
