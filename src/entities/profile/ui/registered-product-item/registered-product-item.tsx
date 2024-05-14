import Link from 'next/link';

import { ProductListItemDto } from '@shared/apis/product-api';
import { DropdownButton } from '@shared/ui/buttons';
import { SmallThumbnail } from '@shared/ui/thumbnails/small-thumbnail';
import { formatPriceToKoStyle } from '@shared/utils/price';
import { formatDateShorter } from '@shared/utils/time';

import * as S from './registered-product-item-style';
import { ProductListItemDto } from '@shared/apis/product-api';

interface RegisteredProductItemProps {
  item: ProductListItemDto;
}

export const RegisteredProductItem = ({ item }: RegisteredProductItemProps) => {
  return (
    <Link href={`/product/${item.id}`}>
      <S.RegisteredProductItem>
        <SmallThumbnail imageUrl={item.thumbnailUrl} />
        <S.ItemInfoArea>
          <div>
            <DropdownButton
              dropdownItems={['판매중']}
              lastDropdownItem={'판매완료'}
              defaultMenu={'판매중'}
              iconPath='images/icon/arrow-down-icon-black.svg'
              width='100px'
              buttonHeight='28px'
              borderColor='#000000'
              fontColor='#000000'
              selectedFontSize='1.4rem'
            />
            <h1>{item.name}</h1>
          </div>
          <div className='text-area'>
            <span className='create-date'>{formatDateShorter(item.createAt)}</span>
            <p className='price'>{formatPriceToKoStyle(item.price)}</p>
          </div>
        </S.ItemInfoArea>
      </S.RegisteredProductItem>
    </Link>
  );
};
