import Link from 'next/link';

import { ProductListItemDto } from '@shared/apis/product-api';
import { DropdownButton } from '@shared/ui/buttons';
import { SmallThumbnail } from '@shared/ui/thumbnails/small-thumbnail';
import { formatPriceToKoStyle } from '@shared/utils/price';
import { formatDateShorter } from '@shared/utils/time';

import * as S from './registered-product-item-style';
import Image from 'next/image';

interface RegisteredProductItemProps {
  item: ProductListItemDto;
}

export const RegisteredProductItem = ({ item }: RegisteredProductItemProps) => {
  return (
    <Link href={`/product/${item.id}`}>
      <S.RegisteredProductItem>
        <SmallThumbnail imageUrl={item.thumbnailImage} />

        <S.DropDownArea>
          <DropdownButton
            dropdownItems={['판매중']}
            lastDropdownItem={'판매완료'}
            defaultMenu={item.status}
            iconPath='images/icon/arrow-down-icon-black.svg'
            width='100px'
            buttonHeight='28px'
            borderColor='#000000'
            fontColor='#000000'
            selectedFontSize='1.4rem'
          />
          <S.Date className='create-date'>{formatDateShorter(item.createAt)}</S.Date>
        </S.DropDownArea>

        <S.ProductName>{item.name}</S.ProductName>
        <S.IconPriceArea>
          <Link href={`/product/edit/${item.id}`}>
            <S.EditIcon
              className='edit-button'
              width={24}
              height={24}
              src='images/icon/pencil-icon.svg'
              alt='연필 아이콘'
            />
          </Link>

          <S.Price className='price'>{formatPriceToKoStyle(item.price)}</S.Price>
        </S.IconPriceArea>
      </S.RegisteredProductItem>
    </Link>
  );
};
