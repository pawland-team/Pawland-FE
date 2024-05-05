import { useRouter } from 'next/router';

import { CommonButton } from '@shared/ui/buttons';
import { CategoryTree, ProductInteractionButtonsBox, RateStar } from '@shared/ui/product';
import { formatPrice } from '@shared/utils/price';

import * as S from './product-detail-info-style';

const ProductDetailInfo = () => {
  const router = useRouter();

  const handleClickToChat = () => {
    router.push('/chat');
  };

  return (
    <S.ProductDetailInfoArea>
      <div>
        <S.SubInfoContainer>
          <CategoryTree region='서울' species='강아지' />
          <ProductInteractionButtonsBox />
        </S.SubInfoContainer>
        <S.MainInfoContainer>
          <time>2024.12.10</time>
          <h2>제목 홍길동이 파는</h2>
          <div className='seller-info-box'>
            <p>홍길동이</p>
            <RateStar rate={4} />
          </div>
          <S.DivideLine />
          <h3>{formatPrice(3000)}</h3>
        </S.MainInfoContainer>
      </div>
      <S.ButtonContainer>
        <CommonButton
          handleClick={handleClickToChat}
          backgroundColor='#43ADFF'
          fontColor='#fff'
          fontSize='24px'
          padding='16px'
          fontWeight='600'
        >
          채팅하기
        </CommonButton>
      </S.ButtonContainer>
    </S.ProductDetailInfoArea>
  );
};

export { ProductDetailInfo };
