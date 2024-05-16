import { styled } from 'styled-components';

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  align-items: flex-start;
  justify-content: space-between;

  width: 100%;
  height: fit-content;
`;

export const SelectBox = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 12px;

  width: 100%;
  height: fit-content;
`;

export const SelectContainer = styled.div`
  display: flex;
  column-gap: 12px;
  align-items: center;
  justify-content: flex-start;

  height: fit-content;
`;

export const SelectItem = styled.input`
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 10px 20px;

  font-size: 1.6rem;
  font-weight: 400;
  color: ${({ theme }) => theme.color.gray_9E9E9E};

  border: 1px solid ${({ theme }) => theme.color.gray_9E9E9E};
  border-radius: 6px;

  transition: color 300ms ease-in-out;

  &:hover {
    font-weight: 700;
    color: ${({ theme }) => theme.color.blue_43ADFF};
    border: 1px solid ${({ theme }) => theme.color.blue_43ADFF};
  }
`;

export const ProductTitleInputBox = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;

  width: 100%;
  height: fit-content;
`;

export const ProductTitleInput = styled.input`
  flex-shrink: 0;

  width: 100%;
  height: 64px;
  margin-top: 9px;
  padding: 20px 32px 25px;

  font-size: 1.6rem;
  font-weight: 500;
  line-height: normal;
  color: ${({ theme: { color } }) => color.black_000000};
  letter-spacing: 0.064rem;

  background: #fafafa;
  border-radius: 6px;

  &::placeholder {
    color: #bdbdbd;
  }
`;

export const ProductTitleCounter = styled.span`
  align-self: flex-end;

  font-size: 1.4rem;
  font-weight: 500;
  line-height: normal;
  color: ${({ theme }) => theme.color.gray_9E9E9E};
  text-align: right;
`;
