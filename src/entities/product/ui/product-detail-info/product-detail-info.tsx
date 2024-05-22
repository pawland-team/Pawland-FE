import { useEffect, useMemo } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { chatQueryKeys } from '@entities/chat/apis';
import { useCreateChatRoom } from '@entities/chat/hooks';
import { usePostOrder } from '@entities/order/hooks';
import { useUserStore } from '@entities/user/model';
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
  const userInfo = useUserStore((state) => state.userInfo);

  const router = useRouter();
  const queryClient = useQueryClient();

  const isLoading = useMemo(() => {
    return postOrderStatus === 'pending' || createChatRoomStatus === 'pending';
  }, [postOrderStatus, createChatRoomStatus]);

  const createChatRoom = async () => {
    // TODO: 채팅방이 이미 만들어져 있으면 주문생성하기랑 채팅방 생성 더 이상 하지 않도록 막아야 함.
    // ! 내가 이미 이 사람하고 채팅방 연결을 한 상태인지 확인할 수 있는 api가 필요함.
    // - 이미 채팅방이 만들어져 있으면 채팅방으로 이동하도록 하고(router push),
    // - 채팅방이 없으면 주문생성하기랑 채팅방 생성하기를 진행하도록 해야함. -> 성공하면 router push
    // (오더에서) 302로 오면 챗으로 리다이렉트
    let orderId: number | undefined;

    // 현재 user의 id랑 해당 상품의 seller의 id가 같으면 내 채팅방으로 이동
    if (userInfo?.id === detailInfo.seller.id) {
      router.push('/chat');
    }

    try {
      orderId = await postOrderMutate(detailInfo.id);
    } catch (error) {
      console.error(error);

      if (isAxiosError(error) && error.response?.status === 302) {
        openModal({
          ModalComponent: NormalSnackBar,
          props: { message: '이미 존재하는 거래 채팅입니다.' },
          options: {
            persist: true,
          },
        });
        router.push('/chat');

        return;
      }

      openModal({
        ModalComponent: NormalSnackBar,
        props: { message: '주문 생성에 실패하였습니다.' },
        options: {
          persist: true,
        },
      });

      return;
    }

    try {
      if (orderId) {
        await createChatRoomMutate({ productId: detailInfo.id, sellerId: detailInfo.seller.id, orderId });
        await queryClient.invalidateQueries({ queryKey: chatQueryKeys.all() });
        router.push('/chat');
      }
    } catch (error) {
      console.error(error);
      openModal({
        ModalComponent: NormalSnackBar,
        props: { message: '채팅방 생성에 실패하였습니다.' },
        options: {
          persist: true,
        },
      });
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
        </CommonButton>
      </S.ButtonContainer>
    </S.ProductDetailInfoArea>
  );
};

export { ProductDetailInfo };
