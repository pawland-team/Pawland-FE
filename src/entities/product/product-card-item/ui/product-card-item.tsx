import Link from 'next/link';

import { Discription } from './discription';
import * as S from './product-card-item-style';
import { Thumbnail } from './thumbnail';

const ProductCardItem = () => {
  return (
    <S.ProductCardItem>
      <Link href='/'>
        <Thumbnail />
        <Discription />
      </Link>
    </S.ProductCardItem>
  );
};

export { ProductCardItem };
