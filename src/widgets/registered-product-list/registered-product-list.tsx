import { RegisteredProductItem } from '../../entities/registered-product-item/registered-product-item';
import { DropdownButton } from '../../shared/ui/buttons/index';
import * as S from './registered-product-list-style';

export const RegisteredProductList = () => {
  return (
    <S.RegisteredProductList>
      <div className='buttonArea'>
        <DropdownButton dropdownItems={['전체보기', '판매중']} lastDropdownItem={'판매완료'} />
      </div>
      <RegisteredProductItem />
      <RegisteredProductItem />
      <RegisteredProductItem />
      <RegisteredProductItem />
    </S.RegisteredProductList>
  );
};
