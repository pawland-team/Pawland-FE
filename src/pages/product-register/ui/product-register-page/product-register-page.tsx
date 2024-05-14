import { BaseSyntheticEvent, useEffect, useId, useRef } from 'react';
import { FieldErrors, FormProvider, useForm } from 'react-hook-form';

import { useRegisterProductMutation } from '@features/register-product/hooks';
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
import { REGISTER_PRODUCT_PAGE_CONFIRM_MODAL_AFTER_SUBMIT } from '@pages/product-register/constants/modal-key';
import { getPreSignedURL, PreSignedURLResponse } from '@shared/apis/image-api';
import { clientWithTokenApi } from '@shared/apis/instance';
import { useModalList, useModalWithLocalState } from '@shared/hooks/use-modal';
import { ConfirmModalFrame } from '@shared/ui/modal/confirm-modal-frame';
import { NormalSnackBar } from '@shared/ui/snack-bar/normal-snack-bar';

import * as S from './style';

/**
 * 조립은 page 단에서 한다.
 */
export const ProductRegisterPage = () => {
  const uniqueFormId = useId();
  const { openModalList, destroy } = useModalList();
  const { ModalComponent, isModalOpen, openModal, closeModal } = useModalWithLocalState();
  // 요청 로딩 처리하기
  const { status, mutateAsync } = useRegisterProductMutation();
  /**
   * - register에 등록되지 않은 요소에 대한 custom focus ref
   * - register의 ref는 input, textarea만 등록 및 focus가능하다.
   */
  // const [focusElementFunctionObject, setFocusElementFunctionObject] = useState<FocusElementFunctionObject>();

  const focusRef = useRef<FocusRef>({});

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

  const { handleSubmit, setFocus } = methods;

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

      return;
    }

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

      return;
    }

    const uniqueImageUrl = `${process.env.NEXT_PUBLIC_BUCKET_BASE_URL}/${uniqueFileName}`;

    try {
      /** ! 단언처리한 이유: {@link onSubmitInvalid} 에서 에러 경우의 수를 모두 처리해주도록 분리했음. */
      const { id } = await mutateAsync({
        category: selectedProductSortCategory!,
        condition: selectedProductConditionTagCategory!,
        content: description,
        images,
        name: productTitle,
        price: Number(price!.replaceAll(',', '')),
        region: selectedRegionCategory!,
        species: selectedSpeciesCategory!,
        thumbnailImage: uniqueImageUrl,
      });

      openModalList({
        ModalComponent: ConfirmModalFrame,
        modalKey: REGISTER_PRODUCT_PAGE_CONFIRM_MODAL_AFTER_SUBMIT,
        props: {
          modalMessage: <S.ModalMessage>상품등록이 완료되었습니다.</S.ModalMessage>,
          modalFooter: (
            // TODO: 상품 상세 페이지로 이동하는 링크로 변경
            // # 등록한 해당 상품 id 필요함.
            <S.ModalFooterOnelineButton href={`/product/${id}`}>등록 상품 보러 가기</S.ModalFooterOnelineButton>
          ),
        },
      });
    } catch (error) {
      openModal({
        ModalComponent: NormalSnackBar,
        props: { message: '(서버 리스폰스 에러) 상품 등록에 실패했습니다.' },
        options: {
          persist: true,
        },
      });
    }
  };

  const onSubmitInvalid = (
    inputsErrors: FieldErrors<RegisterProductForm>,
    _event?: BaseSyntheticEvent<object, any, any>,
  ) => {
    console.log(inputsErrors);

    if (isModalOpen) {
      closeModal();
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
      if (firstErrorRef.type === 'file') {
        // VM18668 register-product-page.tsx:187 Uncaught (in promise) DOMException: Failed to execute 'querySelector' on 'Document': '#:Rdt5km:' is not a valid selector.
        // @see https://stackoverflow.com/questions/37270787/uncaught-syntaxerror-failed-to-execute-queryselector-on-document
        // const linkedLabel = document.querySelector<HTMLLabelElement>(`#${firstErrorRef.id}`);
        const linkedLabel = document.querySelector<HTMLLabelElement>(`[id='${firstErrorRef.id}']`);

        if (linkedLabel) {
          console.log(1);
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
    <S.Wrapper>
      {isModalOpen && <ModalComponent />}
      <S.HeaderArea>
        <S.PageTitle>상품등록</S.PageTitle>
        <ProductHeaderButtonContainer status={status} uniqueFormId={uniqueFormId} />
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
  );
};
