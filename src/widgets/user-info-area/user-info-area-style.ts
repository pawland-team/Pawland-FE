import styled from 'styled-components';

export const UserInfoArea = styled.div`
  display: flex;
  flex-direction: row;
  gap: 37px;
  align-items: center;
  justify-content: center;
`;

export const ProfileImage = styled.img`
  position: relative;
  border: 2px solid ${({ theme }) => theme.color.gray_9E9E9E};
  border-radius: 50%;
`;

export const TextArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 272px;
`;

export const UserNickname = styled.div`
  display: flex;
  align-items: center;

  font-size: 3.2rem;
  font-weight: 700;
  line-height: 38px;
`;

export const UserIntroduce = styled.div`
  overflow: hidden;

  width: 100%;
  max-height: 3 * 1.5em;

  font-size: 1.6rem;
  font-weight: 300;
  line-height: 28px;
  text-overflow: ellipsis;
`;

export const RatingArea = styled.div`
  display: flex;

  width: 540px;
  height: 200px;
  margin-left: 107px;
  padding: 42px 37px;

  background-color: ${({ theme }) => theme.color.gray_F9F9F9};
  border-radius: 12px;
`;

export const RatingArea = styled.div`
  display: flex;

  width: 540px;
  height: 200px;
  margin-left: 107px;
  padding: 42px 37px;

  background-color: ${({ theme }) => theme.color.gray_F9F9F9};
  border-radius: 12px;
`;

export const Rating = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  justify-content: center;

  width: 233px;

  border-right: 1px solid ${({ theme }) => theme.color.gray_BDBDBD};
`;

export const Review = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  justify-content: center;

  width: 233px;
`;

export const Title = styled.span`
  font-size: 3rem;
  font-weight: 300;
  color: ${({ theme }) => theme.color.gray_BDBDBD};
`;

export const Number = styled.span`
  font-size: 5rem;
  font-weight: 300;
  color: ${({ theme }) => theme.color.black_000000};
`;
