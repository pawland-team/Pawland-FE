import Link from 'next/link';

import { mainProductInfo } from '@shared/apis/main-list-api/dto';
import { Description, Thumbnail } from '@shared/ui/product';

import * as S from './product-card-item-style';

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
