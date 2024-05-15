'use client';

import { useCallback, useMemo, useRef, useState } from 'react';

import { ModalListDispatchContext, ModalListStateContext } from '../context/ModalListContext';
import {
  CloseWithModalKeyImpl,
  CustomModalRef,
  Destroy,
  IModalListDispatchContext,
  ManagedModalInfo,
  ModalInfoManageMap,
  ModalKey,
  ModalListProviderProps,
  OpenedModalStateWithModalKey,
  OpenWithModalKeyImpl,
  SetCustomModalRef,
  Watch,
} from '../types';
import { useCloseModalOnMouseDown } from '../useCloseModalOnMouseDown';
import { usePersistScrollingDim } from '../usePersistScrollingDim';

const ModalListProvider = ({ children }: ModalListProviderProps) => {
  const [openedModalList, setOpenedModalList] = useState<OpenedModalStateWithModalKey[]>([]);
  const modalInfoManageMapRef = useRef<ModalInfoManageMap>(new Map());

  const watch: Watch = (modalKey: ModalKey) => {
    return modalInfoManageMapRef.current.get(JSON.stringify(modalKey));
  };

  const setCustomModalRef: SetCustomModalRef = useCallback(({ modalKey, ModalComponent, options }) => {
    const customModalRef = <T extends HTMLElement | null>(node: T) => {
      if (node) {
        const optionsRemappedWithDefaultValue: ManagedModalInfo['options'] = options
          ? // 전달 받은 옵션으로 기본값 덮어씌움
            { scrollable: false, ...options }
          : options;
        modalInfoManageMapRef.current.set(modalKey, {
          ModalComponent,
          options: optionsRemappedWithDefaultValue,
          modalNode: node,
        });
      }
    };

    return customModalRef as CustomModalRef;
  }, []);

  const openWithModalKeyImpl: OpenWithModalKeyImpl = ({ modalKey, ModalComponent, props, options }) => {
    const stringifiedModalKey = JSON.stringify(modalKey);
    const modalInfo = { modalKey: stringifiedModalKey, ModalComponent };
    const modalRef: CustomModalRef = setCustomModalRef({ ModalComponent, modalKey: stringifiedModalKey, options });
    Object.defineProperty(modalRef, 'current', {
      configurable: false,
      enumerable: false,
      get: () => watch(modalKey),
      /**
       * TODO: getter/setter 타입 정의 지원하면 주석 해제. 아니면 class로 변경
       * {@link CustomModalRef} 지원하면 타입 수정
       * @see https://github.com/microsoft/TypeScript/issues/2521
       * @see https://github.com/microsoft/TypeScript/issues/43662
       */
      // set: <T extends HTMLElement | null>(node: T) => {
      //   const customModalRef: CustomModalRef = setCustomModalRef({
      //     ModalComponent,
      //     modalKey: stringifiedModalKey,
      //     options,
      //   });
      //   customModalRef(node);
      // },
    });
    setOpenedModalList((prev) => {
      return [...prev, { ...modalInfo, props: props ? { ...props, modalRef } : { modalRef } }];
    });
  };

  const closeWithModalKeyImpl: CloseWithModalKeyImpl = async ({ modalKey }) => {
    const stringifiedModalKey = typeof modalKey === 'string' ? modalKey : JSON.stringify(modalKey);

    queueMicrotask(() => {
      setOpenedModalList((prev) => {
        return prev.filter((modal) => modal.modalKey !== stringifiedModalKey);
      });
      const removalResult = modalInfoManageMapRef.current.delete(stringifiedModalKey);

      if (!removalResult) {
        console.error(
          `Failed to remove a modal with key: ${stringifiedModalKey}.\nThis error occurs because the modal has already been removed or the modal key is invalid.\nPlease check your modal key.\nBtw, this error is not critical and will not stop the application.`,
        );
      }
    });
  };

  const destroy: Destroy = async () => {
    queueMicrotask(() => {
      modalInfoManageMapRef.current.clear();
      setOpenedModalList([]);
    });
  };

  // options
  useCloseModalOnMouseDown({ modalInfoManageMap: modalInfoManageMapRef.current, closeWithModalKeyImpl });
  usePersistScrollingDim({ modalInfoManageMap: modalInfoManageMapRef.current, dependencyList: [openedModalList] });

  const dispatch: IModalListDispatchContext = useMemo(
    () => ({ openWithModalKeyImpl, closeWithModalKeyImpl, watch, destroy }),
    [],
  );

  return (
    <ModalListDispatchContext.Provider value={dispatch}>
      <ModalListStateContext.Provider value={openedModalList}>{children}</ModalListStateContext.Provider>
    </ModalListDispatchContext.Provider>
  );
};

export default ModalListProvider;
