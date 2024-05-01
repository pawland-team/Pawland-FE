import styled from 'styled-components';

import { textLineClamp2 } from '@shared/ui/styles/utills';

interface ProductFlexCardItemStyleProps {
  $flexGap: number;
  $cardNumberPerRow: number;
}

export const ProductFlexCardItem = styled.div<ProductFlexCardItemStyleProps>`
  overflow: hidden;
  width: ${(props) => `calc(100% / ${props.$cardNumberPerRow} - ${props.$flexGap}px)`};
  border-radius: 12px;
`;

export const ProductThumbnaile = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-bottom: 100%;

  .thumbnail-image {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(1);

    width: 100%;
    height: 100%;

    object-fit: cover;
  }
`;

export const ProductDescription = styled.div`
  padding: 12px 12px 0;
  background: #fff;

  h4 {
    ${textLineClamp2}
    height: 70px;

    font-size: 2.4rem;
    line-height: 34px;
    font-weight: 700;
    word-break: break-all;
    color: #4d5053;
  }

  .text-group {
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: flex-end;
    justify-content: flex-end;

    margin-top: 12px;
  }

  .price {
    font-size: 3.2rem;
    font-weight: 700;
    line-height: 42px;
  }

  .view {
    display: block;
    font-size: 1.6rem;
    font-weight: 400;
    color: ${({ theme }) => theme.color.gray_9E9E9E};
  }
`;

export const WishButton = styled.button`
  position: absolute;
  right: 14px;
  bottom: 20px;
`;
