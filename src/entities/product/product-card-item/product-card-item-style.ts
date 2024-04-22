import styled from 'styled-components';

import { textLineClamp2 } from '@shared/ui/styles/text-style/text-style';

export const ProductCardItem = styled.div`
  overflow: hidden;
  width: calc(100% / 3);
  border-radius: 12px;
`;

export const ProductThumbnaile = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-bottom: 100%;

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const ProductDescription = styled.div`
  height: 165px;
  padding: 12px;
  background: #fff;

  h4 {
    ${textLineClamp2}
    font-size: 1.4rem;
    font-weight: 300;
    line-height: 18px;
  }

  .price {
    margin-top: 10px;
    font-size: 2rem;
    font-weight: 600;
  }

  .view {
    display: block;
    margin-top: 4px;
    font-size: 1.2rem;
    color: #9e9e9e;
  }
`;
