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
import {
  REGISTER_PRODUCT_PAGE_CONFIRM_MODAL_AFTER_SUBMIT,
  REGISTER_PRODUCT_PAGE_CONFIRM_MODAL_ON_ERROR,
} from '@pages/product-register/constants/modal-key';
import { getPreSignedURL, PreSignedURLResponse } from '@shared/apis/image-api';
import { clientWithTokenApi } from '@shared/apis/instance';
import { ProductRegisterRequest } from '@shared/apis/product-api';
import { useModalList, useModalWithLocalState } from '@shared/hooks/use-modal';
import { ConfirmModalFrame } from '@shared/ui/modal/confirm-modal-frame';
import { NormalSnackBar } from '@shared/ui/snack-bar/normal-snack-bar';

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

  const onSubmit = async (
    {
      description,
      images,
      price,
      productTitle,
      selectedProductSortCategory,
      selectedProductConditionTagCategory,
      selectedRegionCategory,
      selectedSpeciesCategory,
      thumbnail,
    }: RegisterProductForm,
    _event?: BaseSyntheticEvent<object, any, any>,
  ) => {
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

      console.dir(productRegisterInfo);

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

  const onSubmitInvalid = async (
    inputsErrors: FieldErrors<RegisterProductForm>,
    _event?: BaseSyntheticEvent<object, any, any>,
  ) => {
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
            <S.ProudctRegisterForm id={uniqueFormId} onSubmit={handleSubmit(onSubmit, onSubmitInvalid)}>
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
