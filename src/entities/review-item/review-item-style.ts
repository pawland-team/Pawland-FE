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

  .user-profile {
    border: 1px solid ${({ theme }) => theme.color.gray_9E9E9E};
    border-radius: 50%;
  }

  .check-icon {
    margin-left: 5px;
  }

  .content {
    font-size: 1.2rem;
    line-height: 28px;
  }
`;

export const UserInfoArea = styled.div`
  display: flex;
  align-items: center;
`;

export const Nickname = styled.span`
  margin-left: 16px;
  font-size: 1.2rem;
  line-height: 28px;
  color: ${({ theme }) => theme.color.gray_BDBDBD};
`;

export const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-left: 40px;
`;
