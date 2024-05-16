import { useEffect, useRef, useState } from 'react';

import {
  ExposedModalPropsWithoutModalRef,
  ModalComponent,
  ModalComponentHasAllRequiredProps,
  ModalComponentSuperSet,
  OpenModalOptions,
  OptionalModalProps,
} from '../types';
// import { useToggleModal } from '../useToggleModal';

type DirectModalComponentProps = Partial<OptionalModalProps>;

/**
 * ### use context useModal hook instead
 * - this hook can be used to open and close modal without context api
 * - but it is not recommended to use this hook
 * - because this is a hook bound to a local component(local state), so it's unlikely to be used frequently.
 */
const useModalWithLocalState = <CustomModalProps = unknown, T extends HTMLElement = HTMLElement>() => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalRef = useRef<T | null>(null);

  const [modalInfo, setModalInfo] = useState<{
    ModalComponent: ModalComponent;
    props?: ExposedModalPropsWithoutModalRef<ModalComponent<CustomModalProps>>;
    options: OpenModalOptions;
  }>();
  // const { isModalOpen, toggleModal, modalRef } = useToggleModal(false, modalInfo?.options);

  useEffect(() => {
    const closeModal = async (e: MouseEvent) => {
      if (modalInfo?.options.persist) return;

      queueMicrotask(() => {
        if (isModalOpen && modalRef.current && !modalRef.current.contains(e.target as Node)) {
          setIsModalOpen(true);
        }
      });
    };

    document.addEventListener('mousedown', closeModal);

    return () => {
      document.removeEventListener('mousedown', closeModal);
    };
  }, [isModalOpen, modalInfo?.options.persist]);

  const closeModal = async () => {
    if (isModalOpen) {
      queueMicrotask(() => {
        setIsModalOpen(false);

        if (modalInfo && modalInfo.props && typeof modalInfo.props.onClose === 'function') {
          modalInfo.props.onClose();
        }
      });
    }
  };

  const submitModal = async (e?: React.BaseSyntheticEvent) => {
    if (e) {
      e.preventDefault?.();
      e.persist?.();
    }

    if (isModalOpen) {
      queueMicrotask(() => {
        setIsModalOpen(false);

        if (modalInfo && modalInfo.props && typeof modalInfo.props.onSubmit === 'function') {
          modalInfo.props.onSubmit();
        }
      });
    }
  };

  const openModal = <VMC extends ModalComponentSuperSet>({
    ModalComponent,
    props,
    options,
  }: {
    ModalComponent: ModalComponentHasAllRequiredProps<VMC>;
    props?: ExposedModalPropsWithoutModalRef<VMC>;
    options?: OpenModalOptions;
  }) => {
    if (!isModalOpen) {
      setModalInfo({ ModalComponent, props, options: options || { persist: false } });
      setIsModalOpen(true);
    }
  };

  // const closeModal = async () => {
  //   if (isModalOpen) {
  //     queueMicrotask(() => {
  //       toggleModal();

  //       if (modalInfo && modalInfo.props && typeof modalInfo.props.onClose === 'function') {
  //         modalInfo.props.onClose();
  //       }
  //     });
  //   }
  // };

  // const submitModal = async (e?: React.BaseSyntheticEvent) => {
  //   if (e) {
  //     e.preventDefault?.();
  //     e.persist?.();
  //   }

  //   if (isModalOpen) {
  //     queueMicrotask(() => {
  //       toggleModal();

  //       if (modalInfo && modalInfo.props && typeof modalInfo.props.onSubmit === 'function') {
  //         modalInfo.props.onSubmit();
  //       }
  //     });
  //   }
  // };

  // const openModal = <VMC extends ModalComponentSuperSet>({
  //   ModalComponent,
  //   props,
  //   options,
  // }: {
  //   ModalComponent: ModalComponentHasAllRequiredProps<VMC>;
  //   props?: ExposedModalPropsWithoutModalRef<VMC>;
  //   options?: OpenModalOptions;
  // }) => {
  // ! toggle로 하니까 modal이 true 상태가 되질 않는다.
  //   if (!isModalOpen) {
  //     console.log(1);
  //     console.log(ModalComponent);
  //     setModalInfo({ ModalComponent, props, options: options || { persist: false } });
  //     toggleModal();
  //   }
  // };

  /**
   * TODO: DirectModalComponentProps에서 OptionalModalProps 제거하기
   */
  const ModalComponent = (directProps?: DirectModalComponentProps) => {
    if (!modalInfo || !modalInfo.ModalComponent || !isModalOpen) {
      throw new Error(
        'ModalComponent property should be passed to openModal function.\nYou can see this message when isModalOpen is not true but has been tried to render ModalComponent.',
      );
    }

    const { ModalComponent: Modal } = modalInfo;

    return (
      <Modal
        modalRef={modalRef}
        closeModal={closeModal}
        submitModal={submitModal}
        isCurrentModalOpen={isModalOpen}
        {...modalInfo.props}
        {...directProps}
      />
    );
  };

  return { isModalOpen, modalProps: modalInfo?.props, modalInfo, openModal, closeModal, ModalComponent };
};

export { useModalWithLocalState };
