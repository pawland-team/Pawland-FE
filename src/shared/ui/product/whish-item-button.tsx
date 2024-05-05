import { MouseEvent, useState } from 'react';

import Image from 'next/image';
import styled from 'styled-components';

interface WishItemButtonProps {
  isWished: boolean;
}

const WishItemButton = ({ isWished }: WishItemButtonProps) => {
  const [isWishedChange, setIsWishedChange] = useState(isWished);

  const handleClickWishButton = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsWishedChange((prev) => !prev);
  };

  return (
    <>
      <SWishButton type='button' onClick={handleClickWishButton}>
        {isWishedChange ? (
          <Image src='/images/button/wish-button-on.png' alt='찜하기 취소' width={42} height={35} />
        ) : (
          <Image src='/images/button/wish-button-off.png' alt='찜하기' width={42} height={35} />
        )}
      </SWishButton>
    </>
  );
};

export { WishItemButton };

const SWishButton = styled.button`
  position: absolute;
  right: 14px;
  bottom: 20px;
`;
