import Link from 'next/link';

import { mainProductInfo } from '@shared/apis/main-list-api/dto';
import { Description, Thumbnail } from '@shared/ui/product';

import * as S from './product-flex-card-item-style';

interface ProductFlexCardItemProps {
  flexGap?: number;
  cardNumberPerRow?: number;
  item: mainProductInfo;
}

/**
 * @param flexGap 카드 간격 (number)
 * @param cardNumberPerRow 한줄 카드 갯수 (number)
 * @param item 상품 데이터
 */
const ProductFlexCardItem = ({ flexGap = 23, cardNumberPerRow = 4, item }: ProductFlexCardItemProps) => {
  return (
    <S.ProductFlexCardItem $flexGap={flexGap} $cardNumberPerRow={cardNumberPerRow}>
      <Link href={`/product/${item.id}`}>
        <Thumbnail item={item} />
        <Description item={item} />
      </Link>
    </S.ProductFlexCardItem>
  );
};

export { ProductFlexCardItem };
