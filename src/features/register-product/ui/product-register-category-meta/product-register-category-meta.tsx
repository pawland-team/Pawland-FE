import { ReactNode } from 'react';

import { styled } from 'styled-components';

import { likePre } from '@shared/ui/styles/utils/text-style';

interface ProductRegisterCategoryMetaProps {
  metaTitle: ReactNode;
  metaDescription?: ReactNode;
  /**
   * 기본값 true.
   * true면 * 표시가 붙는다.
   */
  isRequired?: boolean;
  /**
   * unit: px
   */
  rowGap?: number;
}

/**
 * meta 최대 너비가 제각각임.
 */
export const ProductRegisterCategoryMeta = ({
  metaTitle,
  metaDescription,
  isRequired = true,
  rowGap = 9,
}: ProductRegisterCategoryMetaProps) => {
  return (
    <S.MetaWrapper $rowGap={rowGap}>
      <S.MetaTitle>
        {metaTitle} <S.RequireStarMarker $isRequired={isRequired}>*</S.RequireStarMarker>
      </S.MetaTitle>
      {metaDescription ? <S.MetaDescription>{metaDescription}</S.MetaDescription> : null}
    </S.MetaWrapper>
  );
};

const S = {
  MetaWrapper: styled.div<{ $rowGap: NonNullable<ProductRegisterCategoryMetaProps['rowGap']> }>`
    display: flex;
    flex-direction: column;
    row-gap: ${({ $rowGap }) => $rowGap}px;
    align-items: flex-start;
  `,
  MetaTitle: styled.h2`
    font-size: 2.8rem;
    font-weight: 700;
    line-height: normal;
    color: #222;
  `,
  RequireStarMarker: styled.span<{ $isRequired: boolean }>`
    display: ${({ $isRequired }) => ($isRequired ? 'inline' : 'none')};

    font-size: 2.8rem;
    font-weight: 700;
    line-height: normal;
    color: ${({ theme: { color } }) => color.blue_43ADFF};
  `,
  MetaDescription: styled.p`
    font-size: 2rem;
    font-weight: 400;
    line-height: normal;
    color: ${({ theme: { color } }) => color.gray_9E9E9E};

    ${likePre}
  `,
};
