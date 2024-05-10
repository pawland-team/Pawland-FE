import Link from 'next/link';

import { ProductListItemDto } from '@shared/apis/product-api';
import { DropdownButton } from '@shared/ui/buttons';
import { SmallThumbnail } from '@shared/ui/thumbnails/small-thumbnail';
import { formatPriceToKoStyle } from '@shared/utils/price';
import { formatDateShorter } from '@shared/utils/time';

import * as S from './registered-product-item-style';

interface RegisteredProductItemProps {
  item: ProductListItemDto;
}

export const RegisteredProductItem = ({ item }: RegisteredProductItemProps) => {
  return (
    <Link href={`/product/${item.id}`}>
      <S.RegisteredProductItem>
<<<<<<<< HEAD:src/entities/profile/ui/registered-product-item/registered-product-item.tsx
        <SmallThumbnail imageUrl={item.thumbnailUrl} />
========
        <SmallThumbnail imageUrl={''} />
>>>>>>>> 7cc1cd6 (Feat: 프로필페이지 커뮤니티 리스트 api 연동, 유저페이지 ui, 폴더구조 변경 ):src/entities/profile/registered-product-item/ui/registered-product-item.tsx
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
