import { MouseEvent, useState } from 'react';

import Image from 'next/image';

import * as S from './product-card-item-style';

const WishItemButton = () => {
  const [isWished, setIsWished] = useState(false);

  const handleClickWishButton = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsWished((prev) => !prev);
  };

  return (
    <>
      <S.WishButton type='button' onClick={handleClickWishButton}>
        {isWished ? (
          <Image src='/assets/images/button/wish-button-on.png' alt='찜하기 취소' width={42} height={35} />
        ) : (
          <Image src='/assets/images/button/wish-button-off.png' alt='찜하기' width={42} height={35} />
        )}
      </S.WishButton>
    </>
  );
};

export { WishItemButton };
