import { formatPrice } from '@shared/utils/format-price';

import * as S from './product-card-item-style';

const Discription = () => {
  return (
    <S.ProductDescription>
      <h4>[직거래희망] 저희 아버지가 직접 키운 고양이가 환장하는 캣닢 유기농 쿨거 가능 </h4>
      <div className='text-group'>
        <p className='price'>{formatPrice(30000)}원</p>
        <span className='view'>조회수 20</span>
      </div>
    </S.ProductDescription>
  );
};

export { Discription };
