import styled from 'styled-components';

export const ReviewInput = styled.textarea`
  width: 100%;
  height: 84px;
  margin-top: 14px;
  padding: 14px;

  font-size: 1.2rem;
  color: ${({ theme }) => theme.color.gray_9E9E9E};

  background-color: ${({ theme }) => theme.color.gray_F9F9F9};
  border: 1px solid ${({ theme }) => theme.color.gray_F3F3F3};
  border-radius: 10px;
`;

export const ButtonArea = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 28px;
`;
