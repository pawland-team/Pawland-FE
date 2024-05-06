import { ReactNode } from 'react';

import { ModalComponentForList } from '@shared/hooks/use-modal';

import * as S from './style';

interface ChatConfirmModalPrpos {
  modalMessage: ReactNode;
  modalFooter: ReactNode;
}

export const ChatConfirmModal: ModalComponentForList<ChatConfirmModalPrpos> = ({
  modalRef,
  modalMessage,
  modalFooter,
}) => {
  return (
    <S.Dimmed>
      <S.Container ref={modalRef}>
        <S.ModalContent>{modalMessage}</S.ModalContent>
        <S.ModalFooter>{modalFooter}</S.ModalFooter>
      </S.Container>
    </S.Dimmed>
  );
};
