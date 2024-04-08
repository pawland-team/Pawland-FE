import { useModalList } from './useModalList';

('use client');

export type { ModalComponent, ModalComponentProps } from './types';

export { useToggleModal } from './useToggleModal';

export { default as ModalProvider } from './provider/ModalProvider';

export { default as ModalListProvider } from './provider/ModalListProvider';

export { default as Modal } from './modal-component/Modal';

export { default as ModalList } from './modal-component/ModalList';

export { useModalOnLocal } from './legacy/useModal';

export { useModal } from './useModal';

export { useModalList };

export default useModalList;
