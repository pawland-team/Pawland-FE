import { UseMutateFunction } from '@tanstack/react-query';
import { NextRouter } from 'next/router';

import type { CloseWithModalKey, OpenModalListWithModalKey } from '@shared/hooks/use-modal/types';

import { CHAT_CONFIRM_MODAL_KEY } from '../constants/modal-key';
import * as S from '../ui/chat-room/style';

interface HandleConfirmTransactionParam {
  orderId: number;
  productId: number;
  router: NextRouter;
  mutate: UseMutateFunction<
    boolean,
    Error,
    {
      orderId: number;
      productId: number;
    },
    unknown
  >;
  openModalList: OpenModalListWithModalKey;
  closeModalList: CloseWithModalKey;
}

export const handleConfirmTransactionImpl = async ({
  orderId,
  productId,
  router,
  mutate,
  openModalList,
  closeModalList,
}: HandleConfirmTransactionParam) => {
  const ModalComponent = await import('@shared/ui/modal/confirm-modal-frame').then(
    (module) => module.ConfirmModalFrame,
  );

  const handleConfirm = () => {
    mutate(
      { orderId, productId },
      {
        onSuccess: () => {
          router.push(`/product/${productId}`);
          closeModalList({ modalKey: CHAT_CONFIRM_MODAL_KEY });
        },
      },
    );
  };

  openModalList({
    ModalComponent,
    modalKey: CHAT_CONFIRM_MODAL_KEY,
    props: {
      modalMessage: <S.ModalMessage>거래를 확정하시겠습니까?</S.ModalMessage>,
      modalFooter: (
        <S.ButtonGroup>
          <button type='button' onClick={handleConfirm}>
            거래확정
          </button>
          <button type='button' onClick={() => closeModalList({ modalKey: CHAT_CONFIRM_MODAL_KEY })}>
            취소
          </button>
        </S.ButtonGroup>
      ),
    },
  });
};
