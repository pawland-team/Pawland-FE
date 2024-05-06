import Link from 'next/link';
import { useRouter } from 'next/router';

import { ProductDetailType } from '@shared/apis/product-api/product-detail.mock';
import { CommonButton } from '@shared/ui/buttons';
import { CategoryTree, ProductInteractionButtonsBox, RateStar } from '@shared/ui/product';
import { formatPrice } from '@shared/utils/price';

import * as S from './product-detail-info-style';

interface ProductDetailInfoProps {
  detailInfo: ProductDetailType;
}

const ProductDetailInfo = ({ detailInfo }: ProductDetailInfoProps) => {
  const router = useRouter();

  const handleClickToChat = () => {
    router.push('/chat');
  };

  return (
    <S.ProductDetailInfoArea>
      <div>
        <S.SubInfoContainer>
          <CategoryTree region={detailInfo.region} species={detailInfo.species} category={detailInfo.category} />
          <ProductInteractionButtonsBox isWished={detailInfo.isWished} />
        </S.SubInfoContainer>
        <S.MainInfoContainer>
          <time>{detailInfo.createdAt}</time>
          <h2>{detailInfo.productName}</h2>
          <div className='seller-info-box'>
            {/* TODO : 유저 페이지로 이동될 수 있도록 */}
            <Link href='/'>
              <p>{detailInfo.seller.nickname}</p>
            </Link>
            <RateStar rate={detailInfo.seller.stars} />
          </div>
          <S.DivideLine />
          <h3>{formatPrice(detailInfo.price)}</h3>
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
          disabled={detailInfo.saleState !== 'selling'}
        >
          {detailInfo.saleState === 'selling' && '채팅하기'}
          {detailInfo.saleState === 'canceled' && '판매취소'}
          {detailInfo.saleState === 'completed' && '판매완료'}
        </CommonButton>
      </S.ButtonContainer>
    </S.ProductDetailInfoArea>
  );
};

export { ProductDetailInfo };
