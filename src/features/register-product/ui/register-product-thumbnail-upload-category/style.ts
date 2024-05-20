import { css, styled } from 'styled-components';

import { likePre } from '@shared/ui/styles/utils/text-style';

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

const draggingEffect = css<{ $isDragging: boolean }>`
  ${({ $isDragging }) =>
    $isDragging &&
    css`
      translate: -2.5px 0; /* TODO: 밀림 현상 방지하기 */
      background-color: rgb(67 173 255 / 10%);
      border: 5px dashed ${({ theme }) => theme.color.blue_43ADFF};
    `}
`;

export const UploadLabel = styled.label<{ $isDragging: boolean }>`
  cursor: pointer;

  position: relative;

  display: flex;
  align-items: center;

  width: 686px;
  height: 200px;
  padding: 32px 188px 50px 189px;

  background-color: ${({ theme }) => theme.color.gray_F9F9F9};
  border-radius: 6px;
  ${draggingEffect}
`;

export const PreviewImageWrap = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
`;

export const PreviewImage = styled.img`
  width: 100%;
  max-width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const UploadDescriptionBox = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  align-items: center;

  width: 309px;
  max-width: 309px;
  height: fit-content;
`;

export const UploadIconWrapper = styled.div`
  position: relative;
  width: 20px;
  height: 20px;
`;

export const UploadImageDescription = styled.p`
  ${likePre}
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 90px;

  font-size: 1.6rem;
  font-weight: 500;
  line-height: normal;
  color: ${({ theme }) => theme.color.gray_9E9E9E};
  text-align: center;
  white-space: nowrap;
`;

export const UploadImageDescriptionBold = styled.b`
  font-size: 2rem;
  font-weight: 700;
  color: #686868;
  text-align: center;
`;

export const HideInput = styled.input`
  display: none;
`;
