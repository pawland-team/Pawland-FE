import { useEffect } from 'react';
import { UseFormSetValue } from 'react-hook-form';

import { QueryStatus } from '@tanstack/react-query';

import { RegisterProductForm } from '@features/register-product/model';
import { ProductListItemDto } from '@shared/apis/product-api';
import { OpenModalListWithModalKey } from '@shared/hooks/use-modal/types';
import { ConfirmModalFrame } from '@shared/ui/modal/confirm-modal-frame';

import { REGISTER_PRODUCT_PAGE_CONFIRM_MODAL_ON_ERROR } from '../constants/modal-key';
import * as S from '../ui/product-register-page/style';

interface UseSetInitialFormValue {
  productId: number | undefined;
  getProductDetailStatus: QueryStatus;
  data: ProductListItemDto | undefined;
  openModalList: OpenModalListWithModalKey;
  setValue: UseFormSetValue<RegisterProductForm>;
}

export const useSetInitialFormValue = ({
  getProductDetailStatus,
  productId,
  data,
  openModalList,
  setValue,
}: UseSetInitialFormValue) => {
  useEffect(() => {
    // edit 페이지면 기존 데이터를 form에 채워넣는다.
    if (productId && getProductDetailStatus === 'success' && data) {
      setValue('description', data.content);
      setValue('price', data.price.toString());
      setValue('images', data.imageUrls);
      setValue('productTitle', data.name);
      setValue('selectedProductSortCategory', data.category);
      setValue('selectedProductConditionTagCategory', data.condition);
      setValue('selectedRegionCategory', data.region);
      setValue('selectedSpeciesCategory', data.species);
      setValue('thumbnail', data.thumbnailImage);

      return;
    }

    if (productId && getProductDetailStatus === 'error') {
      openModalList({
        ModalComponent: ConfirmModalFrame,
        modalKey: REGISTER_PRODUCT_PAGE_CONFIRM_MODAL_ON_ERROR,
        props: {
          modalMessage: <S.ModalMessage>삭제되거나 존재하지 않는 상품입니다.</S.ModalMessage>,
          modalFooter: <S.ModalFooterOnelineButton href={`/`}>홈으로 돌아가기</S.ModalFooterOnelineButton>,
        },
        options: {
          persist: true,
        },
      });
    }
  }, [data, getProductDetailStatus, productId, setValue]);
};
