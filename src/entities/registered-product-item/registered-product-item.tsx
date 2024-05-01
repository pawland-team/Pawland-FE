import { DropdownButton } from '../../shared/ui/buttons/dropdown-button/dropdown-button';
import { SmallThumbnail } from '../../shared/ui/thumbnails/small-thumbnail/small-thumbnail';
import { formatPrice } from '@shared/utils/format-price';
import * as S from './registered-product-item-style';
import { formatDateShorter } from '../../shared/utils/time/format-date-shorter/format-date-shorter';
import Link from '../../../node_modules/next/link';

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
              iconPath='images/icon/arrow-down-icon-black.svg'
              width='100px'
              buttonHeight='28px'
              borderColor='#000000'
              fontColor='#000000'
              selectedFontSize='1.4rem'
            />
            <h1>뽁뽁이 뼈다귀</h1>
          </div>
          <div className='textArea'>
            <span className='createDate'>{formatDateShorter('2024-03-12T09:52:06.381Z')}</span>
            <p className='price'>{formatPrice(30000)}원</p>
          </div>
        </S.ItemInfoArea>
      </S.RegisteredProductItem>
    </Link>
  );
};