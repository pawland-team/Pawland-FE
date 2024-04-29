'use client';

import { useModalDispatch, useModalState } from './context/ModalContext';
import { CloseModal, OpenModal, UseModal } from './types';

/**
 *
 * @deprecated use useModalList instead
 * @example
 * ```ts
 * const { openModal, closeModal } = useModal();
 * const handleModal = () => {
 *   openModal(MyCustomModal, { linkUrl: input, onClose: clearInput });
 * };
 * ```
 */
export const useModal: UseModal = () => {
  const { close, open } = useModalDispatch();
  const { isModalOpen } = useModalState();

  const openModal: OpenModal = ({ Component, props, options }) => {
    open({
      ModalComponent: Component,
      props,
      options,
    });
  };

  const closeModal: CloseModal = async () => {
    close();
  };

  return { openModal, closeModal, isModalOpen };
};
