import * as S from './modal-style';

export const Modal = ({ content, onClose, isOpen }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <S.ModalContainer>
      <S.ModalContent>
        <S.ModalContentStyle>{content}</S.ModalContentStyle>
        <S.ModalButton type='button' onClick={onClose}>
          확인
        </S.ModalButton>
      </S.ModalContent>
    </S.ModalContainer>
  );
};
