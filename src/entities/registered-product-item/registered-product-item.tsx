import { DropdownButton } from '../../shared/ui/buttons/dropdown-button/dropdown-button';
import { SmallThumbnail } from '../../shared/ui/thumbnails/small-thumbnail/small-thumbnail';
import * as S from './registered-product-item-style';

export const RegisteredProductItem = () => {
  return (
    <S.RegisteredProductItem>
      <SmallThumbnail />
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
    </S.RegisteredProductItem>
  );
};
