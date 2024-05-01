import Image from 'next/image';

import { mainProductInfo } from '@shared/apis/main-list-api/dto';

import * as S from '../product-flex-card-item/product-flex-card-item-style';
import { WishItemButton } from './whish-item-button';

interface ThumbnailProps {
  item: mainProductInfo;
}

const Thumbnail = ({ item }: ThumbnailProps) => {
  return (
    <S.ProductThumbnaile className='thumbnail'>
      <Image
        width={276}
        height={276}
        placeholder='blur'
        blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNcvHhTPQAGYgJ5cH4fHAAAAABJRU5ErkJggg=='
        className='thumbnail-image'
        src={item.imageThumbnail}
        alt={`${item.productName} 상품의 대표 이미지`}
      />
      <WishItemButton isWished={item.isWished} />
    </S.ProductThumbnaile>
  );
};

export { Thumbnail };
