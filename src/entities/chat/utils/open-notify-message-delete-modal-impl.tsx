import { CloseWithModalKey, OpenModalListWithModalKey } from '@shared/hooks/use-modal/types';

import { CHAT_CONFIRM_MESSAGE_DELETE_MODAL_KEY } from '../constants/modal-key';
import * as S from '../ui/chat-room/style';

interface OpenNotifyMessageDeleteModalParam {
  openModalList: OpenModalListWithModalKey;
  closeModalList: CloseWithModalKey;
}

export const openNotifyMessageDeleteModalImpl = async ({
  closeModalList,
  openModalList,
}: OpenNotifyMessageDeleteModalParam) => {
  const ModalComponent = await import('@shared/ui/modal/confirm-modal-frame').then(
    (module) => module.ConfirmModalFrame,
  );

  const handleConfirm = () => {
    closeModalList({ modalKey: CHAT_CONFIRM_MESSAGE_DELETE_MODAL_KEY });
  };

  openModalList({
    ModalComponent,
    modalKey: CHAT_CONFIRM_MESSAGE_DELETE_MODAL_KEY,
    props: {
      modalMessage: <S.ModalMessage>메세지 삭제가 완료되었습니다.</S.ModalMessage>,
      modalFooter: (
        <S.ModalFooterOnelineButton type='button' onClick={handleConfirm}>
          확인
        </S.ModalFooterOnelineButton>
      ),
    },
  });
};
