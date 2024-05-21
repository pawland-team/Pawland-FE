import { BaseSyntheticEvent, MutableRefObject } from 'react';

import { UseMutateAsyncFunction } from '@tanstack/react-query';

import { FocusRef, RegisterProductForm } from '@features/register-product/model';
import { getPreSignedURL, PreSignedURLResponse } from '@shared/apis/image-api';
import { clientWithTokenApi } from '@shared/apis/instance';
import { EditProductParam, ProductRegisterRequest, ProductRegisterResponse } from '@shared/apis/product-api';
import { useModalWithLocalState } from '@shared/hooks/use-modal';
import { OpenModalListWithModalKey } from '@shared/hooks/use-modal/types';
import { ConfirmModalFrame } from '@shared/ui/modal/confirm-modal-frame';
import { NormalSnackBar } from '@shared/ui/snack-bar/normal-snack-bar';

import { REGISTER_PRODUCT_PAGE_CONFIRM_MODAL_AFTER_SUBMIT } from '../constants/modal-key';
import * as S from '../ui/product-register-page/style';

interface OnValidSubmitImplParam {
  registerProductForm: RegisterProductForm;
  event?: BaseSyntheticEvent<object, any, any>;
  focusRef: MutableRefObject<FocusRef>;
  productId: number | undefined;
  openModal: ReturnType<typeof useModalWithLocalState>['openModal'];
  openModalList: OpenModalListWithModalKey;
  editMutateAsync: UseMutateAsyncFunction<ProductRegisterResponse, Error, EditProductParam, unknown>;
  mutateAsync: UseMutateAsyncFunction<ProductRegisterResponse, Error, ProductRegisterRequest, unknown>;
}

export const onValidSubmitImpl = async ({
  registerProductForm: {
    description,
    images,
    price,
    productTitle,
    selectedProductSortCategory,
    selectedProductConditionTagCategory,
    selectedRegionCategory,
    selectedSpeciesCategory,
    thumbnail,
  },
  focusRef,
  productId,
  openModal,
  openModalList,
  editMutateAsync,
  mutateAsync,
}: OnValidSubmitImplParam) => {
  if (!thumbnail) {
    openModal({
      ModalComponent: NormalSnackBar,
      props: { message: '썸네일을 등록해주세요.' },
      options: {
        persist: true,
      },
    });
    focusRef.current.thumbnail?.focus();

    return;
  }

  let productRegisterInfo: ProductRegisterRequest;

  if (typeof thumbnail === 'string') {
    /** ! 단언처리한 이유: {@link onSubmitInvalid} 에서 에러 경우의 수를 모두 처리해주도록 분리했음. */
    productRegisterInfo = {
      category: selectedProductSortCategory!,
      condition: selectedProductConditionTagCategory!,
      content: description,
      images,
      name: productTitle,
      price: Number(price!.replaceAll(',', '')),
      region: selectedRegionCategory!,
      species: selectedSpeciesCategory!,
      thumbnailImage: thumbnail,
    };
  } else {
    const file = thumbnail[0];
    const uuid = crypto.randomUUID();
    const uniqueFileName = `${uuid}-${file.name}`;
    let presignedUrl: PreSignedURLResponse['presignedUrl'];

    try {
      /**
       * unique file name
       */
      presignedUrl = (await getPreSignedURL({ fileName: uniqueFileName })).presignedUrl;
    } catch (error) {
      // 이건 콘솔로 바꿔야 할 듯
      console.error(error);
      openModal({
        ModalComponent: NormalSnackBar,
        props: { message: '프리사인 URL 요청에 실패하였습니다.' },
        options: {
          persist: true,
        },
      });
      focusRef.current.thumbnail?.focus();

      return;
    }

    try {
      // s3 등록 요청
      await clientWithTokenApi.put(presignedUrl, file, {
        headers: {
          'Content-Type': file.type,
        },
      });
    } catch (error) {
      console.error(error);
      openModal({
        ModalComponent: NormalSnackBar,
        props: { message: '이미지 업로드에 실패했습니다.' },
        options: {
          persist: true,
        },
      });
      focusRef.current.thumbnail?.focus();

      return;
    }

    const uniqueImageUrl = `${process.env.NEXT_PUBLIC_BUCKET_BASE_URL}/${uniqueFileName}`;
    productRegisterInfo = {
      category: selectedProductSortCategory!,
      condition: selectedProductConditionTagCategory!,
      content: description,
      images,
      name: productTitle,
      price: Number(price!.replaceAll(',', '')),
      region: selectedRegionCategory!,
      species: selectedSpeciesCategory!,
      thumbnailImage: uniqueImageUrl,
    };
  }

  try {
    let productIdForPath: number | undefined = productId;

    if (productId) {
      await editMutateAsync({ productId, product: productRegisterInfo });
    } else {
      const { id } = await mutateAsync(productRegisterInfo);
      productIdForPath = id;
    }

    const modalMessage = `상품${productId ? '수정' : '등록'}이 완료되었습니다.`;
    const moddalButtonMessage = `${productId ? '수정' : '등록'} 상품 보러 가기`;

    openModalList({
      ModalComponent: ConfirmModalFrame,
      modalKey: REGISTER_PRODUCT_PAGE_CONFIRM_MODAL_AFTER_SUBMIT,
      props: {
        modalMessage: <S.ModalMessage>{modalMessage}</S.ModalMessage>,
        modalFooter: (
          <S.ModalFooterOnelineButton href={`/product/${productIdForPath}`}>
            {moddalButtonMessage}
          </S.ModalFooterOnelineButton>
        ),
      },
    });
  } catch (error) {
    const modalErrorMessage = `(서버 리스폰스 에러) 상품 ${productId ? '수정' : '등록'}에 실패했습니다.`;

    openModal({
      ModalComponent: NormalSnackBar,
      props: { message: modalErrorMessage },
      options: {
        persist: true,
      },
    });
  }
};
