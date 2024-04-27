import { formatPrice } from '@shared/utils/format-price';

import * as S from './product-card-item-style';

const Description = () => {
  return (
    <S.ProductDescription>
      <h4>뽁뽁이 뼈다귀 뽁뽁이 뼈다귀 뽁뽁이 뼈다귀 뽁뽁이 뼈다귀 뽁뽁이 뼈다귀 뽁뽁이 뼈다귀</h4>
      <div className='text-group'>
        <p className='price'>{formatPrice(30000)}</p>
        <span className='view'>조회수 20</span>
      </div>
    </S.ProductDescription>
  );
};

export { Description };
