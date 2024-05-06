'use client';

import { useEffect, useRef } from 'react';

import { OpenModalOptions } from './types';
import { useToggle } from '../use-toggle';

/**
 * useModal Core Hook
 *
 * 굳이 모달이 아니어도 사용할 수 있음.
 */
const useToggleModal = <T extends HTMLElement>(initialValue = false, openModalOptions?: OpenModalOptions) => {
  const [isModalOpen, toggleModal] = useToggle(initialValue);

  const modalRef = useRef<T | null>(null);

  useEffect(() => {
    const closeModal = async (e: MouseEvent) => {
      if (openModalOptions?.persist) return;

      queueMicrotask(() => {
        if (isModalOpen && modalRef.current && !modalRef.current.contains(e.target as Node)) {
          toggleModal();
        }
      });
    };

    document.addEventListener('mousedown', closeModal);

    return () => {
      document.removeEventListener('mousedown', closeModal);
    };
  }, [isModalOpen, toggleModal, openModalOptions]);

  return { isModalOpen, modalRef, toggleModal };
};

export { useToggleModal };
