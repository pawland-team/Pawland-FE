import { DropdownButton } from '@shared/ui/buttons';

import * as S from './my-registered-product-list-style';
import { RegisteredProductItem } from '@entities/profile/ui';
import { useGetmyProductList } from '@entities/profile/hooks/use-get-my-product-list.query';
import { NoProductBox } from '@shared/ui/error';

export const MyRegisteredProductList = () => {
  const initialParams = {
    page: 1,
    size: 4,
    type: '',
  };

  const { data, status } = useGetmyProductList(initialParams);
  console.log(data, status);

  if (status === 'success') {
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
        {data?.length === 0 && <NoProductBox />}

        {data.map((item) => (
          <RegisteredProductItem key={item.id} item={item} />
        ))}
      </S.RegisteredProductList>
    );
  }
};
