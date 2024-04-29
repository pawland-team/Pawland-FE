import { RegisteredProductItem } from '../../entities/registered-product-item/registered-product-item';
import { DropdownButton } from '../../shared/ui/buttons/index';
import * as S from './registered-product-list-style';

export const RegisteredProductList = () => {
  return (
    <S.RegisteredProductList>
      <DropdownButton dropdownItems={['전체보기', '판매중']} lastDropdownItem={'판매완료'} />
      <RegisteredProductItem />
    </S.RegisteredProductList>
  );
};
