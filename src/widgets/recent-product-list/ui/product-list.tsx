import { ProductCardItem } from '@entities/product/product-card-item';

import * as S from './product-list-style';

interface ProductListProps {
  cardListFlexGap?: string;
  cardItemFlexGap?: number;
  cardItemNumberPerRow?: number;
}

/**
 * 상품 카드 리스트
 * - props 내려주지 않으면 기본 4개 보여지도록 설정되어있음 (메인/상품 리스트 디폴트)
 * @param cardListFlexGap 카드 리스트 flex gap
 * @param flexGap 카드 아이템 flex gap
 * @param cardNumberPerRow 한줄 카드 갯수
 */

const ProductList = ({ cardListFlexGap = '60px 30px', cardItemFlexGap, cardItemNumberPerRow }: ProductListProps) => {
  return (
    <S.ProductListContainer $cardListFlexGap={cardListFlexGap}>
      <ProductCardItem flexGap={cardItemFlexGap} cardNumberPerRow={cardItemNumberPerRow} />
      <ProductCardItem flexGap={cardItemFlexGap} cardNumberPerRow={cardItemNumberPerRow} />
      <ProductCardItem flexGap={cardItemFlexGap} cardNumberPerRow={cardItemNumberPerRow} />
      <ProductCardItem flexGap={cardItemFlexGap} cardNumberPerRow={cardItemNumberPerRow} />
      <ProductCardItem flexGap={cardItemFlexGap} cardNumberPerRow={cardItemNumberPerRow} />
      <ProductCardItem flexGap={cardItemFlexGap} cardNumberPerRow={cardItemNumberPerRow} />
      <ProductCardItem flexGap={cardItemFlexGap} cardNumberPerRow={cardItemNumberPerRow} />
      <ProductCardItem flexGap={cardItemFlexGap} cardNumberPerRow={cardItemNumberPerRow} />
    </S.ProductListContainer>
  );
};

export { ProductList };
