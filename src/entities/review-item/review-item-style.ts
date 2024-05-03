import styled from 'styled-components';

export const ReviewItem = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 36px;
  margin-left: 128px;
  padding: 13px 18px;

  background-color: ${({ theme }) => theme.color.gray_F9F9F9};
  border: 1px solid ${({ theme }) => theme.color.gray_F3F3F3};
  border-radius: 6px;

  div {
    display: flex;
    align-items: center;
  }

  .user-profile {
    border: 1px solid ${({ theme }) => theme.color.gray_9E9E9E};
    border-radius: 50%;
  }

  span {
    margin-left: 16px;
    font-size: 1.2rem;
    line-height: 28px;
    color: ${({ theme }) => theme.color.gray_BDBDBD};
  }

  .check-icon {
    margin-left: 5px;
  }

  .content {
    margin-left: 38px;
    font-size: 1.2rem;
  }
`;
