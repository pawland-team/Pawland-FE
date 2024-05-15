import { useEffect, useMemo } from 'react';

import Link from 'next/link';

import { useCreateChatRoom } from '@entities/chat/hooks';
import { usePostOrder } from '@entities/order/hooks';
import { ProductListItemDto } from '@shared/apis/product-api';
import { useModalWithLocalState } from '@shared/hooks/use-modal';
import { CommonButton } from '@shared/ui/buttons';
import { CategoryTree, ProductInteractionButtonsBox, RateStar } from '@shared/ui/product';
import { NormalSnackBar } from '@shared/ui/snack-bar/normal-snack-bar';
import { StarRatingResult } from '@shared/ui/star-rating-result/number-to-star';
import { formatPrice } from '@shared/utils/price';
import { formatDateShorter } from '@shared/utils/time';

import * as S from './product-detail-info-style';

interface ProductDetailInfoProps {
  id: number;
  detailInfo: ProductListItemDto;
}

const ProductDetailInfo = ({ id, detailInfo }: ProductDetailInfoProps) => {
  const { mutateAsync: postOrderMutate, status: postOrderStatus } = usePostOrder();
  const { mutateAsync: createChatRoomMutate, status: createChatRoomStatus } = useCreateChatRoom();
  const { isModalOpen, ModalComponent, openModal, closeModal } = useModalWithLocalState();
  const router = useRouter();

  const isLoading = useMemo(() => {
    return postOrderStatus === 'pending' || createChatRoomStatus === 'pending';
  }, [postOrderStatus, createChatRoomStatus]);

  const createChatRoom = async () => {
    const orderId = await postOrderMutate(detailInfo.id, {
      onError: () => {
        openModal({
          ModalComponent: NormalSnackBar,
          props: { message: '주문 생성에 실패하였습니다.' },
          options: {
            persist: true,
          },
        });
      },
    });

    if (orderId && postOrderStatus === 'success') {
      createChatRoomMutate(
        { productId: detailInfo.id, sellerId: detailInfo.seller.id, orderId },
        {
          onError: () => {
            openModal({
              ModalComponent: NormalSnackBar,
              props: { message: '채팅방 생성에 실패하였습니다.' },
              options: {
                persist: true,
              },
            });
          },
          onSuccess: () => {
            router.push('/chat');
          },
        },
      );
    }
  };

  useEffect(
    () => () => {
      closeModal();
    },
    [closeModal],
  );

  return (
    <S.ProductDetailInfoArea>
      {isModalOpen && <ModalComponent />}
      <div>
        <S.SubInfoContainer>
          <CategoryTree region={detailInfo.region} species={detailInfo.species} category={detailInfo.category} />
          <ProductInteractionButtonsBox id={id} isWished={detailInfo.wished} />
        </S.SubInfoContainer>
        <S.MainInfoContainer>
          <time>{formatDateShorter(detailInfo.createAt)}</time>
          <h2>{detailInfo.name}</h2>
          <div className='seller-info-box'>
            {/*
            TODO : 유저 페이지로 이동될 수 있도록 / 내 이름 클릭하면 프로필 페이지로 이동하도록해야함
             */}
            <Link href={`/user/${detailInfo.seller.id}`}>
              <p>{detailInfo.seller.nickname}</p>
            </Link>
            <RateStar rate={detailInfo.seller.star} />
            <StarRatingResult number={detailInfo.seller.star} />
          </div>
          <S.DivideLine />
          <h3>{formatPrice(detailInfo.price)}</h3>
        </S.MainInfoContainer>
      </div>
      <S.ButtonContainer>
        <CommonButton
          handleClick={createChatRoom}
          backgroundColor='#43ADFF'
          fontColor='#fff'
          fontSize='24px'
          padding='16px'
          fontWeight='600'
          disabled={isLoading}
        >
          {detailInfo.status === '판매중' && '채팅하기'}
          {detailInfo.status === '판매취소' && '판매취소'}
          {detailInfo.status === '판매 완료' && '판매완료'}
        </CommonLink>
      </S.ButtonContainer>
    </S.ProductDetailInfoArea>
  );
};

export { ProductDetailInfo };
