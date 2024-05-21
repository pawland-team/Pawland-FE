import { BaseSyntheticEvent, PropsWithChildren, useEffect, useId, useRef } from 'react';
import { FieldErrors, FormProvider, useForm } from 'react-hook-form';

import { InferGetServerSidePropsType } from 'next';
import Head from 'next/head';

import { useGetProductDetail } from '@entities/product/hooks/use-get-product-detail.query';
import { useEditProductMutation, useRegisterProductMutation } from '@features/register-product/hooks';
import { FocusRef, RegisterProductForm } from '@features/register-product/model';
import {
  ProductHeaderButtonContainer,
  RegisterProductConditionTagSelectCategory,
  RegisterProductDescriptionTextEditor,
  RegisterProductPriceInputCategory,
  RegisterProductRegionSelectCategory,
  RegisterProductSortSelectCategory,
  RegisterProductSpeciesSelectCategory,
  RegisterProductThumbnailUploadCategory,
  RegisterProductTitleCategory,
} from '@features/register-product/ui';
import { useSetInitialFormValue } from '@pages/product-register/hooks/use-set-initial-form-value';
import { onInvalidSubmitImpl } from '@pages/product-register/utils/on-invalid-submit-impl';
import { onValidSubmitImpl } from '@pages/product-register/utils/on-valid-submit-impl';
import { useModalList, useModalWithLocalState } from '@shared/hooks/use-modal';

import { getServerSideProps } from '@/pages/product/edit/[productId]';

import * as S from './style';

/**
 * 조립은 page 단에서 한다.
 *
 * TODO: 제출 코드 리팩토링
 *
 * ProdutEditPage로도 사용된다.
 */
export const ProductRegisterPage = ({
  productId,
}: PropsWithChildren<Partial<InferGetServerSidePropsType<typeof getServerSideProps>>>) => {
  const uniqueFormId = useId();
  const focusRef = useRef<FocusRef>({});
  const { openModalList, destroy } = useModalList();
  const { ModalComponent, isModalOpen, openModal, closeModal } = useModalWithLocalState();
  const { data, status: getProductDetailStatus } = useGetProductDetail(productId!, 0); // productId 없으면 실행 안 되게끔 해 놨음.
  const { status, mutateAsync } = useRegisterProductMutation();
  const { status: editStatus, mutateAsync: editMutateAsync } = useEditProductMutation();

  const methods = useForm<RegisterProductForm>({
    mode: 'onBlur',
    defaultValues: {
      description: '',
      price: null,
      images: [],
      productTitle: '',
      selectedProductSortCategory: null,
      selectedProductConditionTagCategory: null,
      selectedRegionCategory: null,
      selectedSpeciesCategory: null,
      thumbnail: null,
    },
    // input이 아닌 요소들도 있어서 snackbar와 함께 수동으로 focus
    shouldFocusError: false,
  });

  const { handleSubmit, setFocus, setValue } = methods;

  useSetInitialFormValue({ getProductDetailStatus, productId, data, openModalList, setValue });

  const onValidSubmit = async (
    registerProductForm: RegisterProductForm,
    event?: BaseSyntheticEvent<object, any, any>,
  ) => {
    onValidSubmitImpl({
      registerProductForm,
      focusRef,
      productId,
      event,
      openModal,
      openModalList,
      editMutateAsync,
      mutateAsync,
    });
  };

  const onInvalidSubmit = async (
    inputsErrors: FieldErrors<RegisterProductForm>,
    event?: BaseSyntheticEvent<object, any, any>,
  ) => {
    onInvalidSubmitImpl({ inputsErrors, isModalOpen, focusRef, closeModal, openModal, setFocus, event });
  };

  // only for cleanup
  useEffect(
    () => () => {
      destroy();
    },
    [],
  );

  return (
    <>
      <Head>
        <title>Pawland :: 상품 등록하기</title>
      </Head>
      <S.Wrapper>
        {isModalOpen && <ModalComponent />}
        <S.HeaderArea>
          <S.PageTitle>상품등록</S.PageTitle>
          <ProductHeaderButtonContainer status={productId ? editStatus : status} uniqueFormId={uniqueFormId} />
        </S.HeaderArea>
        <S.ProductRegisterBody>
          <FormProvider {...methods}>
            <S.ProudctRegisterForm id={uniqueFormId} onSubmit={handleSubmit(onValidSubmit, onInvalidSubmit)}>
              <RegisterProductSpeciesSelectCategory focusRef={focusRef} />
              <S.Divider />
              <RegisterProductSortSelectCategory focusRef={focusRef} />
              <S.Divider />
              <RegisterProductRegionSelectCategory focusRef={focusRef} />
              <S.Divider />
              <RegisterProductPriceInputCategory />
              <S.Divider />
              <RegisterProductConditionTagSelectCategory focusRef={focusRef} />
              <S.Divider />
              <RegisterProductTitleCategory />
              <S.Divider />
              <RegisterProductThumbnailUploadCategory />
              <S.Divider />
              <RegisterProductDescriptionTextEditor focusRef={focusRef} />
            </S.ProudctRegisterForm>
          </FormProvider>
        </S.ProductRegisterBody>
      </S.Wrapper>
    </>
  );
};
