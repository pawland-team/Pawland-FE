import { ModalComponentForList } from '@shared/hooks/use-modal';

import * as S from './post-modal-style';

interface ModalProps {
  content: string;
}

export const PostModal: ModalComponentForList<ModalProps> = ({ closeModal, modalRef, content }) => {
  return (
    <S.Dim>
      <S.ModalContent ref={modalRef}>
        <S.ModalContentStyle>{content}</S.ModalContentStyle>
        <S.ModalButton type='button' onClick={closeModal}>
          확인
        </S.ModalButton>
      </S.ModalContent>
    </S.Dim>
  );
};
