// import { MouseEvent, useState } from 'react';

import Image from 'next/image';

import * as S from '../product-flex-card-item/product-flex-card-item-style';

interface WishItemButtonProps {
  isWished: boolean;
}

const WishItemButton = ({ isWished }: WishItemButtonProps) => {
  // const [isWished, setIsWished] = useState(false);

  // const handleClickWishButton = (e: MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   setIsWished((prev) => !prev);
  // };

  return (
    <>
      <S.WishButton type='button'>
        {isWished ? (
          <Image src='/images/button/wish-button-on.png' alt='찜하기 취소' width={42} height={35} />
        ) : (
          <Image src='/images/button/wish-button-off.png' alt='찜하기' width={42} height={35} />
        )}
      </S.WishButton>
    </>
  );
};

export { WishItemButton };
