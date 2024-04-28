import { RegisteredProductItem } from '../../entities/registered-product-item/registered-product-item';
import * as S from './registered-product-list-style';

export const RegisteredProductList = () => {
  return (
    <S.RegisteredProductList>
      <RegisteredProductItem />
    </S.RegisteredProductList>
  );
};
