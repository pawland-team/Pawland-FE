import styled from 'styled-components';
import Image from 'next/image';

export const UserInfoArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const ProfileImageArea = styled.div``;
export const ProfileImage = styled(Image)`
  position: relative;
  border: 2px solid ${({ theme }) => theme.color.gray_9E9E9E};
  border-radius: 50%;
`;

export const UserNicknameArea = styled.div`
  display: flex;
  margin-top: 20px;

  div {
    font-size: 2.8rem;
    line-height: 38px;
  }
`;

export const UserIntroduce = styled.div`
  margin-top: 16px;

  font-size: 1.6rem;
  font-weight: 300;
  line-height: 28px;
  text-align: center;
`;

export const Line = styled.hr`
  width: 100%;
  margin-top: 40px;
  border: 0.6px solid ${({ theme }) => theme.color.gray_BDBDBD};
`;
