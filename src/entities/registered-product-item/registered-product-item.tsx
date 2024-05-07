import Link from 'next/link';

import * as S from './registered-product-item-style';
import { SmallThumbnail } from '@shared/ui/thumbnails/small-thumbnail';
import { DropdownButton } from '@shared/ui/buttons';
import { formatDateShorter } from '@shared/utils/time';
import { formatPriceToKoStyle } from '@shared/utils/price';

export const RegisteredProductItem = () => {
  return (
    <Link href='/'>
      <S.RegisteredProductItem>
        <SmallThumbnail />
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
            <h1>뽁뽁이 뼈다귀</h1>
          </div>
          <div className='text-area'>
            <span className='create-date'>{formatDateShorter('2024-03-12T09:52:06.381Z')}</span>
            <p className='price'>{formatPriceToKoStyle(30000)}</p>
          </div>
        </S.ItemInfoArea>
      </S.RegisteredProductItem>
    </Link>
  );
};
