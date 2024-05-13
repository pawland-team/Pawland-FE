import { DropdownButton } from '@shared/ui/buttons';

import * as S from './my-registered-product-list-style';
import { RegisteredProductItem } from '@entities/profile/ui';

export const MyRegisteredProductList = () => {
  return (
    <S.RegisteredProductList>
      <div className='button-area'>
        <DropdownButton
          dropdownItems={['전체보기', '판매중']}
          lastDropdownItem={'판매완료'}
          defaultMenu={'전체보기'}
          iconPath={'images/icon/arrow-down-icon-gray.svg'}
        />
      </div>
      <RegisteredProductItem />
      <RegisteredProductItem />
      <RegisteredProductItem />
      <RegisteredProductItem />
    </S.RegisteredProductList>
  );
};
