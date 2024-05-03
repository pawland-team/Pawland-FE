import styled from 'styled-components';
import Image from 'next/image';

export const EditPage = styled.div`
  padding-bottom: 130px;
`;
export const PageTitle = styled.div`
  margin-top: 126px;
  margin-left: 366px;

  font-size: 3.2rem;
  font-weight: 700;
  line-height: 42px;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 12px;

  div {
    display: flex;
    gap: 12px;
    margin-top: 21px;
  }
`;

export const EditButtonArea = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 21px;
`;

export const ImageEditButton = styled.label`
  cursor: pointer;

  display: flex;
  justify-content: center;

  width: 50px;

  font-size: 1.4rem;
  line-height: 20px;
  color: ${({ theme }) => theme.color.gray_9E9E9E};

  border-bottom: 2px solid ${({ theme }) => theme.color.gray_9E9E9E};
`;

export const FileUploadInput = styled.input`
  display: none;
`;

export const ProfileImage = styled.img`
  position: relative;
  border: 2px solid ${({ theme }) => theme.color.gray_9E9E9E};
  border-radius: 50%;
`;

export const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
`;

export const InputItem = styled.div`
  display: flex;
  flex-direction: column;

  div {
    margin-top: 0;
  }
`;

export const Label = styled.label`
  width: 378px;
  padding-bottom: 10px;

  font-size: 1.2rem;
  line-height: 20px;
  color: ${({ theme }) => theme.color.gray_9E9E9E};

  border-bottom: 1px solid ${({ theme }) => theme.color.gray_9E9E9E};
`;

export const NicknameInput = styled.input`
  width: 100%;
  margin-left: 12px;

  font-size: 1.6rem;
  font-weight: 700;
  color: ${({ theme }) => theme.color.gray_9E9E9E};
`;

export const DescriptionInput = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 12px;

  font-size: 1.6rem;
  font-weight: 700;
  line-height: 27px;
  color: ${({ theme }) => theme.color.gray_9E9E9E};

  border: 1px solid ${({ theme }) => theme.color.gray_F3F3F3};
  border-radius: 10px;
`;

export const SaveButtonArea = styled.div`
  display: flex;
  justify-content: end;
`;

export const LoginInfoArea = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LoginInformation = styled.div`
  justify-content: center;

  margin-top: 15px;

  font-size: 1.6rem;
  font-weight: 700;
  color: ${({ theme }) => theme.color.gray_9E9E9E};
`;

export const BigButtonArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 300px;
`;

export const BigButton = styled.button`
  width: 378px;
  padding-top: 13px;
  padding-bottom: 13px;

  font-size: 1.6rem;
  font-weight: 700;
  color: #999;

  border: 1px solid ${({ theme }) => theme.color.gray_BDBDBD};
  border-radius: 37px;
`;

export const UnregisterButton = styled.button`
  width: auto;

  font-size: 1.6rem;
  line-height: 20px;
  color: ${({ theme }) => theme.color.gray_9E9E9E};

  border-bottom: 1px solid ${({ theme }) => theme.color.gray_9E9E9E};
`;
