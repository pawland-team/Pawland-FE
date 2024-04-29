import Image from 'next/image';

import * as S from './product-card-item-style';
import { WishItemButton } from './whish-item-button';

const Thumbnail = () => {
  return (
    <S.ProductThumbnaile className='thumbnail'>
      <Image
        width={276}
        height={276}
        placeholder='blur'
        blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNcvHhTPQAGYgJ5cH4fHAAAAABJRU5ErkJggg=='
        className='thumbnail-image'
        src='/images/mock/product-card-test-image.png'
        alt='상품 이미지'
      />
      <WishItemButton />
    </S.ProductThumbnaile>
  );
};

export { Thumbnail };
