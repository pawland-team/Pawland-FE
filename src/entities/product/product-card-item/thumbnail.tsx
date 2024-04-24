import * as S from './product-card-item-style';
// import { WishItemButton } from './whish-item-button';

const Thumbnail = () => {
  return (
    <S.ProductThumbnaile className='thumbnail'>
      <img src='https://loremflickr.com/600/400' alt='상품 이미지' />
      {/* <WishItemButton /> */}
    </S.ProductThumbnaile>
  );
};

export { Thumbnail };
