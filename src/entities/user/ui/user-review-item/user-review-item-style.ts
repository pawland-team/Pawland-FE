import styled from 'styled-components';

export const ReviewItem = styled.div`
  display: flex;
  flex-direction: row;

  padding: 31px 36px;

  border: 1px solid ${({ theme }) => theme.color.gray_F3F3F3};
  border-radius: 6px;

  .user-profile {
    border: 1px solid ${({ theme }) => theme.color.gray_9E9E9E};
    border-radius: 50%;
  }

  .content {
    font-size: 2.4rem;
    line-height: 28px;
  }
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 26px;
  margin-left: 36px;
`;

export const Nickname = styled.span`
  margin-top: 14px;
  font-size: 2.4rem;
  line-height: 28px;
  color: ${({ theme }) => theme.color.gray_BDBDBD};
`;

export const Date = styled.span`
  margin-top: 14px;
  margin-left: 450px;

  font-size: 2.4rem;
  line-height: 28px;
  color: ${({ theme }) => theme.color.gray_BDBDBD};
`;
