import Link from 'next/link';

import { mainProductInfo } from '@shared/apis/main-list-api/dto';

import { Description } from './description';
import * as S from './product-card-item-style';
import { Thumbnail } from './thumbnail';

interface ProductCardItemProps {
  flexGap?: number;
  cardNumberPerRow?: number;
  item: mainProductInfo;
}

/**
 * @param flexGap 카드 간격 (number)
 * @param cardNumberPerRow 한줄 카드 갯수 (number)
 */
const ProductCardItem = ({ flexGap = 23, cardNumberPerRow = 4, item }: ProductCardItemProps) => {
  return (
    <S.ProductCardItem $flexGap={flexGap} $cardNumberPerRow={cardNumberPerRow}>
      <Link href='/'>
        <Thumbnail item={item} />
        <Description item={item} />
      </Link>
    </S.ProductCardItem>
  );
};

export { ProductCardItem };
