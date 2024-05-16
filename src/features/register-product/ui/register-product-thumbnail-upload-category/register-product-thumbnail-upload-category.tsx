import { useId } from 'react';
import { useFormContext } from 'react-hook-form';

import Image from 'next/image';

import { RegisterProductForm } from '@features/register-product/model';
import { useDragAndSetFiles } from '@shared/hooks/use-drag-and-set-files';

import * as S from './style';
import { ProductRegisterCategoryMeta } from '../product-register-category-meta';
import { ProductRegisterCategorySubMeta } from '../product-register-category-sub-meta';

export const RegisterProductThumbnailUploadCategory = () => {
  const isMultipleFile = false;
  const uniqueLabelId = useId();

  const {
    dragRef,
    files: previewImageList,
    isDraggingOnTargetElement,
    onChangeFiles,
  } = useDragAndSetFiles({ isMultipleFile });

  const { register, watch } = useFormContext<Pick<RegisterProductForm, 'thumbnail'>>();
  const thumbnail = watch('thumbnail');
  const defaultImage = typeof thumbnail === 'string' ? thumbnail : null;
  const previewImage = previewImageList[0]?.url || defaultImage;

  return (
    <S.Wrapper>
      <ProductRegisterCategoryMeta
        metaTitle='대표 이미지'
        metaDescription={
          <>
            상품을 설명할 수 있는 가장 자신있는
            <br />
            이미지를 업로드해 주세요!
          </>
        }
      />
      <S.SelectBox>
        <ProductRegisterCategorySubMeta metaTitle='대표이미지' metaDescription='*메인으로 보여지는 이미지에요' />
        <S.UploadLabel htmlFor={uniqueLabelId} tabIndex={-1} ref={dragRef} $isDragging={isDraggingOnTargetElement}>
          <S.UploadDescriptionBox>
            <S.UploadIconWrapper>
              <Image src='/images/icon/upload-file-icon.svg' alt='upload-icon' fill sizes='20px' quality={40} />
            </S.UploadIconWrapper>
            <S.UploadImageDescription>
              <S.UploadImageDescriptionBold>이미지 업로드</S.UploadImageDescriptionBold>
              {
                <>
                  파일형식 : jpg 또는 png
                  <br />
                  사이즈 : 가로 910px, 세로 540px
                  <br />
                  *상세페이지에서 제일 먼저 보이는 이미지 입니다.
                </>
              }
            </S.UploadImageDescription>
          </S.UploadDescriptionBox>
          {previewImage ? (
            <S.PreviewImageWrap>
              <S.PreviewImage src={previewImage} />
            </S.PreviewImageWrap>
          ) : null}
          <S.HideInput
            id={uniqueLabelId}
            type='file'
            accept='image/*'
            multiple={isMultipleFile}
            {...register('thumbnail', {
              onChange: onChangeFiles,
              required: {
                // value: true,
                value: !previewImage,
                message: '대표 이미지를 업로드해주세요.',
              },
              validate: {
                // true여야지만 통과. 이외는 에러메세지 반환
                size: (value) => {
                  if (value) {
                    if (typeof value === 'object' && value[0].size > 1024 * 1024 * 10) {
                      return '대표 이미지 사이즈가 너무 큽니다. 10MB 이하로 업로드해주세요.';
                    }

                    return true;
                  }
                },
                length: (value) => {
                  if (!value || (typeof value === 'object' && value.length < 1)) {
                    return '대표 이미지를 업로드해주세요.';
                  }

                  if (typeof value === 'object' && value.length > 1) {
                    return '대표 이미지는 하나만 업로드해주세요.';
                  }

                  return true;
                },
              },
            })}
          />
        </S.UploadLabel>
      </S.SelectBox>
    </S.Wrapper>
  );
};
