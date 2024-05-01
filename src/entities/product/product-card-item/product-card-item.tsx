import Link from 'next/link';

import { mainProductInfo } from '@shared/apis/main-list-api/dto';

import * as S from './product-card-item-style';
import { Description } from '../ui/description';
import { Thumbnail } from '../ui/thumbnail';

interface ProductCardItemProps {
  item: mainProductInfo;
}

/**
 * @param item 상품 데이터
 */
const ProductCardItem = ({ item }: ProductCardItemProps) => {
  return (
    <S.ProductCardItemBox>
      <Link href={`/product/${item.id}`}>
        <Thumbnail item={item} />
        <Description item={item} />
      </Link>
    </S.ProductCardItemBox>
  );
};

export { ProductCardItem };
