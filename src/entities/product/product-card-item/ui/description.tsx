import { mainProductInfo } from '@shared/apis/main-list-api/dto';
import { formatPrice } from '@shared/utils/price';

import * as S from './product-card-item-style';

interface DescriptionProps {
  item: mainProductInfo;
}

const Description = ({ item }: DescriptionProps) => {
  return (
    <S.ProductDescription>
      <h4>{item.productName}</h4>
      <div className='text-group'>
        <p className='price'>{formatPrice(item.price)}</p>
        <span className='view'>조회수 {item.views}</span>
      </div>
    </S.ProductDescription>
  );
};

export { Description };
