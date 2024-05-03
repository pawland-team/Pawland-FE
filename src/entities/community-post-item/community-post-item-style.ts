import styled from 'styled-components';

export const CommunityPostItem = styled.div`
  cursor: pointer;

  display: flex;
  gap: 27px;

  width: 100%;
  padding: 20px 26px;

  border: 1px solid ${({ theme }) => theme.color.gray_F3F3F3};
  border-radius: 6px;

  &:hover {
    box-shadow: 4px 4px 4px 0 rgb(0 0 0 / 5%);
  }
`;

export const ItemInfoArea = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  .text-area {
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 488px;

    h1 {
      max-width: 420px;
      font-size: 2.4rem;
    }

    p {
      overflow: hidden;

      max-height: 2 * 1.5em;

      font-size: 1.2rem;
      line-height: 18px;
      color: ${({ theme }) => theme.color.gray_BDBDBD};
      text-overflow: ellipsis;
    }

    .value-area {
      padding-top: 4px;
      padding-bottom: 4px;

      span {
        margin-left: 12px;
        padding-right: 12px;

        font-size: 1.2rem;
        line-height: 18px;
        color: ${({ theme }) => theme.color.gray_BDBDBD};

        border-right: 1px solid ${({ theme }) => theme.color.gray_BDBDBD};
      }

      .first-span {
        margin-left: 0;
      }

      .last-span {
        border-right: 0;
      }
    }
  }

  .button-area {
    display: flex;
    flex-direction: column;
    gap: 60px;

    .edit-button {
      margin-left: 35px;
    }
  }
`;
