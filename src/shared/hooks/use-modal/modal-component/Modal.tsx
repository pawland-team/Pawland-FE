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

  const onCloseHandler = async () => {
    await close();

    if (typeof onClose === 'function') {
      onClose();
    }
  };

  const onSubmitHandler = async (e?: React.BaseSyntheticEvent) => {
    if (e) {
      e.preventDefault?.();
      e.persist?.();
    }

    await close();

    if (typeof onSubmit === 'function') {
      onSubmit();
    }
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
