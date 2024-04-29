'use client';

import { useContext } from 'react';

import { Portal } from '@shared/ui/portal';

import { ModalListStateContext, useModalListDispatch } from '../context/ModalListContext';
import { ModalKey, StringifiedModalKey } from '../types';

interface CloseParams {
  onClose?: VoidFunction;
  modalKey: ModalKey | StringifiedModalKey;
}
interface SubmitParams {
  onSubmit?: VoidFunction;
  modalKey: ModalKey | StringifiedModalKey;
}

type OnCloseModal = (closeParams: CloseParams) => () => Promise<void>;
type OnSubmitModal = (submitParams: SubmitParams) => (e?: React.BaseSyntheticEvent) => Promise<void>;

const ModalList = () => {
  const modalList = useContext(ModalListStateContext);

  const { closeWithModalKeyImpl } = useModalListDispatch();

  const onCloseModal: OnCloseModal =
    ({ onClose, modalKey }) =>
    async () => {
      queueMicrotask(() => {
        closeWithModalKeyImpl({ modalKey });

        if (typeof onClose === 'function') {
          onClose();
        }
      });
    };

  const onSubmitModal: OnSubmitModal =
    ({ onSubmit, modalKey }) =>
    async (e) => {
      if (e) {
        e.preventDefault?.();
        e.persist?.();
      }

      queueMicrotask(() => {
        closeWithModalKeyImpl({ modalKey });

        if (typeof onSubmit === 'function') {
          onSubmit();
        }
      });
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
              closeModal={onCloseModal({ onClose, modalKey })}
              submitModal={onSubmitModal({ onSubmit, modalKey })}
              {...rest}
            />
          );
        })}
    </Portal>
  );
};

export default ModalList;
