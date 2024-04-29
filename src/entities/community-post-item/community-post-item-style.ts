import styled from 'styled-components';

export const CommunityPostItem = styled.div`
  width: 100%;
  display: flex;
  padding: 20px 26px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.color.gray_F3F3F3};
  cursor: pointer;
  gap: 27px;

  &:hover {
    box-shadow: 4px 4px 4px 0 rgb(0 0 0 / 5%);
  }
`;

export const ItemInfoArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  .textArea {
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 488px;

    h1 {
      font-size: 2.4rem;
      max-width: 420px;
    }

    p {
      font-size: 1.2rem;
      color: ${({ theme }) => theme.color.gray_BDBDBD};
      line-height: 18px;
      max-height: 2 * 1.5em;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .valueArea {
      padding-top: 4px;
      padding-bottom: 4px;
      span {
        margin-left: 12px;
        padding-right: 12px;
        font-size: 1.2rem;
        color: ${({ theme }) => theme.color.gray_BDBDBD};
        line-height: 18px;
        border-right: 1px solid ${({ theme }) => theme.color.gray_BDBDBD};
      }

      .firstSpan {
        margin-left: 0;
      }

      .lastSpan {
        border-right: 0;
      }
    }
  }

  .buttonArea {
    display: flex;
    flex-direction: column;

    .editButton {
      margin-left: 35px;
    }
  }
`;
