'use client';

import { useContext } from 'react';

import { Portal } from '@shared/ui/portal';

import { ModalListStateContext, useModalListDispatch } from '../context/ModalListContext';
import { ModalKey, StringifiedModalKey } from '../types';

interface SubmitParams {
  onSubmit?: VoidFunction;
  modalKey: ModalKey | StringifiedModalKey;
}

interface CloseParams {
  onClose?: VoidFunction;
  modalKey: ModalKey | StringifiedModalKey;
}
type OnSubmitModal = (submitParams: SubmitParams) => (e?: React.BaseSyntheticEvent) => void;
type OnCloseModal = (closeParams: CloseParams) => () => void;

const ModalList = () => {
  const modalList = useContext(ModalListStateContext);

  const { closeWithModalKeyImpl } = useModalListDispatch();

  const onSubmitModal: OnSubmitModal =
    ({ onSubmit, modalKey }) =>
    (e) => {
      if (e) {
        e.preventDefault?.();
        e.persist?.();
      }

      if (typeof onSubmit === 'function') {
        onSubmit();
      }

      closeWithModalKeyImpl({ modalKey });
    };

  const onCloseModal: OnCloseModal =
    ({ onClose, modalKey }) =>
    () => {
      if (typeof onClose === 'function') {
        onClose();
      }

      closeWithModalKeyImpl({ modalKey });
    };

  return (
    <Portal rootId='#modal'>
      {modalList.length > 0 &&
        modalList.map((modal) => {
          const {
            ModalComponent,
            props: { modalRef, onClose, onSubmit, ...rest },
            modalKey,
          } = modal;

          return (
            <ModalComponent
              key={modalKey}
              modalRef={modalRef}
              isCurrentModalOpen={Boolean(modalKey.length) && Boolean(modalKey)}
              submitModal={onSubmitModal({ onSubmit, modalKey })}
              closeModal={onCloseModal({ onClose, modalKey })}
              {...rest}
            />
          );
        })}
    </Portal>
  );
};

export default ModalList;
