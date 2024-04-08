'use client';

import { useContext } from 'react';

import { Portal } from '@shared/ui/portal';

import { ModalStateContext, useModalDispatch } from '../context/ModalContext';

/**
 * @deprecated use ModalList instead
 */
const Modal = () => {
  const {
    ModalComponent,
    props: { onClose, onSubmit, modalRef, ...rest },
    isModalOpen,
  } = useContext(ModalStateContext);
  const { close } = useModalDispatch();

  const onCloseHandler = () => {
    if (typeof onClose === 'function') {
      onClose();
    }

    close();
  };

  const onSubmitHandler = (e?: React.BaseSyntheticEvent) => {
    if (e) {
      e.preventDefault?.();
      e.persist?.();
    }

    if (typeof onSubmit === 'function') {
      onSubmit();
    }

    close();
  };

  return (
    <>
      {isModalOpen && ModalComponent && (
        <Portal rootId='#modal'>
          <ModalComponent
            modalRef={modalRef || null}
            closeModal={onCloseHandler}
            submitModal={onSubmitHandler}
            isCurrentModalOpen={isModalOpen}
            {...rest}
          />
        </Portal>
      )}
    </>
  );
};

export default Modal;
