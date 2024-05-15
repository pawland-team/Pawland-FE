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
  column-gap: 16px;
  align-items: center;
  justify-content: flex-start;

  height: 48px;

  label {
    display: flex;
    column-gap: 6px;
    align-items: center;

    font-size: 1.6rem;
    font-weight: 400;

    /* line-height: normal; */
    color: ${({ theme: { color } }) => color.gray_9E9E9E};
    letter-spacing: 0.064rem;
  }

  /* flex-wrap: wrap; */
`;
