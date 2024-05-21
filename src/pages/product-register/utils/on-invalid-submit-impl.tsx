import { BaseSyntheticEvent, MutableRefObject } from 'react';
import { FieldErrors, UseFormSetFocus } from 'react-hook-form';

import { FocusRef, RegisterProductForm } from '@features/register-product/model';
import { useModalWithLocalState } from '@shared/hooks/use-modal';
import { NormalSnackBar } from '@shared/ui/snack-bar/normal-snack-bar';

interface OnInvalidSubmitImplParam {
  inputsErrors: FieldErrors<RegisterProductForm>;
  event?: BaseSyntheticEvent<object, any, any>;
  isModalOpen: boolean;
  focusRef: MutableRefObject<FocusRef>;
  closeModal: () => Promise<void>;
  openModal: ReturnType<typeof useModalWithLocalState>['openModal'];
  setFocus: UseFormSetFocus<RegisterProductForm>;
}

export const onInvalidSubmitImpl = async ({
  inputsErrors,
  isModalOpen,
  focusRef,
  closeModal,
  openModal,
  setFocus,
}: OnInvalidSubmitImplParam) => {
  if (isModalOpen) {
    await closeModal();
  }

  // const firstErrorKey = Object.keys(inputsErrors).find((key) => inputsErrors[key]);
  const firstErrorKey = Object.keys(inputsErrors)[0] as Exclude<keyof typeof inputsErrors, 'images'>;

  if (firstErrorKey === 'root') {
    throw new Error('unintentended key root is picked from error object');
  }

  const firstErrorMessage = inputsErrors[firstErrorKey]?.message;
  const firstErrorRef = inputsErrors[firstErrorKey]?.ref;

  if (isModalOpen === false) {
    openModal({
      ModalComponent: NormalSnackBar,
      props: { message: firstErrorMessage || '입력하지 않은 필드가 있습니다.' },
      options: {
        persist: true,
      },
    });
  }

  // ref가 등록되어 있으면 해당 ref로 focus
  if (firstErrorRef) {
    // file type (thumbnail input)이면
    if (firstErrorRef.type === 'file') {
      // VM18668 register-product-page.tsx:187 Uncaught (in promise) DOMException: Failed to execute 'querySelector' on 'Document': '#:Rdt5km:' is not a valid selector.
      // @see https://stackoverflow.com/questions/37270787/uncaught-syntaxerror-failed-to-execute-queryselector-on-document
      // const linkedLabel = document.querySelector<HTMLLabelElement>(`#${firstErrorRef.id}`);
      const linkedLabel = document.querySelector<HTMLLabelElement>(`[id='${firstErrorRef.id}']`);

      if (linkedLabel) {
        linkedLabel.focus();
      }

      return;
    }

    setFocus(firstErrorKey);

    return;
  }

  if (!focusRef.current) {
    return;
  }

  focusRef.current[firstErrorKey]?.focus();
};
