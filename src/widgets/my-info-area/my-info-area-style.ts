import styled from 'styled-components';

export const MyInfoArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
export const ProfileImage = styled.img`
  position: relative;
  border: 2px solid ${({ theme }) => theme.color.gray_9E9E9E};
  border-radius: 50%;
`;

export const UserNicknameArea = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;

  div {
    font-size: 2.8rem;
    line-height: 38px;
  }
`;

export const UserIntroduce = styled.div`
  overflow: hidden;

  width: 100%;
  max-height: 3 * 1.5em;
  margin-top: 16px;

  font-size: 1.6rem;
  font-weight: 300;
  line-height: 28px;
  text-align: center;
  text-overflow: ellipsis;
`;

export const Line = styled.hr`
  width: 100%;
  margin-top: 40px;
  border: 0.6px solid ${({ theme }) => theme.color.gray_BDBDBD};
`;
