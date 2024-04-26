import Link from 'next/link';

import { Discription } from './discription';
import * as S from './product-card-item-style';
import { Thumbnail } from './thumbnail';

interface ProductCardItemProps {
  flexGap: number;
  cardNumberPerRow: number;
}

/**
 * @param flexGap 카드 간격 (number)
 * @param cardNumberPerRow 한줄 카드 갯수 (number)
 */
const ProductCardItem = ({ flexGap, cardNumberPerRow }: ProductCardItemProps) => {
  return (
    <S.ProductCardItem $flexGap={flexGap} $cardNumberPerRow={cardNumberPerRow}>
      <Link href='/'>
        <Thumbnail />
        <Discription />
      </Link>
    </S.ProductCardItem>
  );
};

export { ProductCardItem };
