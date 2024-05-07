import { ProductFlexCardItem } from '@entities/product-card/product-flex-card-item/product-flex-card-item';
import { mainProductInfo } from '@shared/apis/main-list-api/dto';

import * as S from './product-flex-list-style';

interface ProductFlexListProps {
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

const ProductFlexList = ({
  cardListFlexGap = '60px 30px',
  cardItemFlexGap,
  cardItemNumberPerRow,
  flexWrap = 'wrap',
  listData,
}: ProductFlexListProps) => {
  return (
    <S.ProductFlexListContainer $cardListFlexGap={cardListFlexGap} $flexWrap={flexWrap}>
      {listData.map((item) => (
        <ProductFlexCardItem
          key={item.id}
          flexGap={cardItemFlexGap}
          cardNumberPerRow={cardItemNumberPerRow}
          item={item}
        />
      ))}
    </S.ProductFlexListContainer>
  );
};

export { ProductFlexList };
