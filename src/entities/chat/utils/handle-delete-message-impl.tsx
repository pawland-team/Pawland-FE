import { CloseWithModalKey, OpenModalListWithModalKey } from '@shared/hooks/use-modal/types';

import { CHAT_MESSAGE_DELETE_MODAL_KEY } from '../constants/modal-key';
import * as S from '../ui/chat-room/style';

interface HandleDeleteMessageImplParam {
  openModalList: OpenModalListWithModalKey;
  closeModalList: CloseWithModalKey;
  openNotifyMessageDeleteModal: () => Promise<void>;
}

export const handleDeleteMessageImpl = async ({
  closeModalList,
  openModalList,
  openNotifyMessageDeleteModal,
}: HandleDeleteMessageImplParam) => {
  const ModalComponent = await import('@shared/ui/modal/confirm-modal-frame').then(
    (module) => module.ConfirmModalFrame,
  );

  const handleConfirm = async () => {
    await closeModalList({ modalKey: CHAT_MESSAGE_DELETE_MODAL_KEY });
    openNotifyMessageDeleteModal();
  };

  openModalList({
    ModalComponent,
    modalKey: CHAT_MESSAGE_DELETE_MODAL_KEY,
    props: {
      modalMessage: (
        <S.ModalMessage>
          메세지를 삭제하시겠습니까?
          {`\n`}
          삭제 후 복구는 불가능합니다.
        </S.ModalMessage>
      ),
      modalFooter: (
        <S.ButtonGroup>
          <button type='button' onClick={handleConfirm}>
            확인
          </button>
          <button type='button' onClick={() => closeModalList({ modalKey: CHAT_MESSAGE_DELETE_MODAL_KEY })}>
            취소
          </button>
        </S.ButtonGroup>
      ),
    },
  });
};
