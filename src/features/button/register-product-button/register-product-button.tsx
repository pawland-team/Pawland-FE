import Image from '../../../../node_modules/next/image';
import Link from '../../../../node_modules/next/link';
import * as S from './register-product-button-style';

export const RegisterProductButton = () => {
  return (
    <Link href='/profile/edit'>
      <S.RegisterProductButton>
        <Image width={24} height={24} src='images/icon/plus-icon.svg' alt='화살표 아이콘' />

        <div>상품등록하기</div>
      </S.RegisterProductButton>
    </Link>
  );
};
