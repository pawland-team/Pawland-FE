import Link from 'next/link';
import { styled } from 'styled-components';

import {
  REGISTER_PRODUCT_CONTENT_SIZE,
  REGISTER_PRODUCT_HEADER_SIZE,
} from '@features/register-product/constants/style';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: ${REGISTER_PRODUCT_CONTENT_SIZE.onDesktop.width}px;
  margin-inline: auto;

  /* 천장이랑 바닥 이격 */
  padding-block: 126px 212px;
`;

export const PageTitle = styled.h1`
  display: flex;
  flex-shrink: 0;
  align-items: center;

  width: 240px;
  height: 52px;

  font-size: 3.2rem;
  font-weight: 700;
  line-height: 4.2rem; /* 131.25% */
  color: #242424;
  letter-spacing: -0.06rem;
`;

export const HeaderArea = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: ${REGISTER_PRODUCT_HEADER_SIZE.onDesktop.height}px;
  padding-inline: 5px 3px;
`;

export const ProductRegisterBody = styled.section`
  width: 100%;
  height: fit-content;
  padding-top: 62px;
`;

export const ProudctRegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 80px;

  width: 100%;
  height: fit-content;
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e0e0e0;
`;

export const ModalMessage = styled.pre`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 118px;

  font-size: 1.6rem;
  font-weight: 400;
  line-height: normal;
  color: ${({ theme: { color } }) => color.black_000000};
  text-align: center;
  letter-spacing: 0.064rem;

  border: 1px solid #eee;
`;

export const ModalFooterOnelineButton = styled(Link)`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  font-size: 2rem;
  font-weight: 700;
  line-height: normal;
  color: ${({ theme: { color } }) => color.black_000000};
  text-align: center;

  &:hover {
    color: ${({ theme: { color } }) => color.white_FFFFFF};
    background: ${({ theme: { color } }) => color.blue_2087D6};
  }
`;
