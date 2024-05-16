import { styled } from 'styled-components';

export const Wrapper = styled.section`
  display: flex;
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
  justify-content: space-between;
  width: 100%;
  height: 64px;
`;

export const PriceInputBox = styled.div`
  display: flex;
  column-gap: 11px;
  height: fit-content;
`;

export const PriceInput = styled.input`
  flex-shrink: 0;

  width: 521px;
  height: 64px;
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

  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    appearance: none;
  }

  &:focus {
    color: ${({ theme: { color } }) => color.black_000000};
  }
`;

export const PriceUnit = styled.span`
  display: block;

  margin-block: 20px 25px;

  font-size: 1.6rem;
  font-weight: 500;
  line-height: normal;
  color: #bdbdbd;
  letter-spacing: 0.064rem;
`;

export const CheckBoxAligner = styled.div`
  padding-block: 20px 24px;
`;
