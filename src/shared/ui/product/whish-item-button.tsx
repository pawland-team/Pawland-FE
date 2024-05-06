import { MouseEvent, useState } from 'react';

import Image from 'next/image';

interface WishItemButtonProps {
  isWished: boolean;
  /**
   * 버튼 너비 : default 42
   */
  width?: number;
  /**
   * 버튼 높이 : default 35
   */
  height?: number;
}

/**
 * 찜 버튼
 */

const WishItemButton = ({ isWished, width = 42, height = 35 }: WishItemButtonProps) => {
  const [isWishedChange, setIsWishedChange] = useState(isWished);

  const handleClickWishButton = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsWishedChange((prev) => !prev);
  };

  return (
    <>
      <button type='button' onClick={handleClickWishButton}>
        {isWishedChange ? (
          <Image src='/images/button/wish-button-on.png' alt='찜하기 취소' width={width} height={height} />
        ) : (
          <Image src='/images/button/wish-button-off.png' alt='찜하기' width={width} height={height} />
        )}
      </button>
    </>
  );
};

export { WishItemButton };
