import { ProductFlexCardItem } from '@entities/product/product-flex-card-item/product-flex-card-item';
import { mainProductInfo } from '@shared/apis/main-list-api/dto';

import * as S from './product-list-style';

interface ProductListProps {
  cardListFlexGap?: string;
  cardItemFlexGap?: number;
  cardItemNumberPerRow?: number;
  flexWrap?: string;
  listData: mainProductInfo[];
}

/**
 * 상품 카드 리스트
 * - props 내려주지 않으면 기본 4개 보여지도록 설정되어있음 (메인/상품 리스트 디폴트)
 * @param cardListFlexGap 카드 리스트 flex gap
 * @param flexGap 카드 아이템 flex gap
 * @param cardNumberPerRow 한줄 카드 갯수
 * @param isFlexWrap 카드 줄바꿈 설정 default 'wrap'
 * @param listData 상품 리스트
 */

const ProductList = ({
  cardListFlexGap = '60px 30px',
  cardItemFlexGap,
  cardItemNumberPerRow,
  flexWrap = 'wrap',
  listData,
}: ProductListProps) => {
  return (
    <S.ProductListContainer $cardListFlexGap={cardListFlexGap} $flexWrap={flexWrap}>
      {listData.map((item) => (
        <ProductFlexCardItem
          key={item.id}
          flexGap={cardItemFlexGap}
          cardNumberPerRow={cardItemNumberPerRow}
          item={item}
        />
      ))}
    </S.ProductListContainer>
  );
};

export { ProductList };
