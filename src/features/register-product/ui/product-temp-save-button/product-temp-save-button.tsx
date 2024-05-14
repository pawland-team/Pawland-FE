import { styled } from 'styled-components';

export const ProductTempSaveButton = () => {
  return <S.TempSaveButton type='button'>임시저장</S.TempSaveButton>;
};

const S = {
  TempSaveButton: styled.button`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 174px;
    height: 40px;
    padding: 10px 32px;

    font-size: 1.6rem;
    font-weight: 700;
    line-height: 2rem; /* 125% */
    color: ${({ theme: { color } }) => color.blue_43ADFF};
    text-align: center;

    background: ${({ theme: { color } }) => color.white_FFFFFF};
    border: 2px solid ${({ theme: { color } }) => color.blue_43ADFF};
    border-radius: 6px;
  `,
};
