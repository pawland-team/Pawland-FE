'use client';

import { useModalListDispatch } from './context/ModalListContext';
import { CloseWithModalKey, OpenModalListWithModalKey, UseModalList } from './types';

export const useModalList: UseModalList = () => {
  const { closeWithModalKeyImpl, openWithModalKeyImpl, watch, destroy } = useModalListDispatch();

  /**
   * @example
   * ```tsx
   * openModalList({ modalKey: ['my-modal'], ModalComponent: MyCustomModal, props: { linkUrl: input, onClose: clearInput } })
   * ```
   */
  const openModalList: OpenModalListWithModalKey = ({ modalKey, ModalComponent, props, options }) => {
    openWithModalKeyImpl({ modalKey, ModalComponent, props, options });
  };

  /**
   * @example
   * ```tsx
   * closeModalList({ modalKey: ['my-modal'] })
   * ```
   */
  const closeModalList: CloseWithModalKey = async ({ modalKey }) => {
    closeWithModalKeyImpl({ modalKey });
  };

  return { openModalList, closeModalList, watch, destroy };
};
// Path: hooks/use-modal/useModalList.ts
