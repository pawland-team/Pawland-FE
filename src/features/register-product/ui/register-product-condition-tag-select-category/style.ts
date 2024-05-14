import { styled } from 'styled-components';

export const Wrapper = styled.section`
  display: flex;
  column-gap: 245px;
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
