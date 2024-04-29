'use client';

import { useEffect, useRef } from 'react';

import { useToggle } from '../use-toggle';
import { OpenModalOptions } from './types';

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
