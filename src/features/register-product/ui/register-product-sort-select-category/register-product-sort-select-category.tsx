import { ChangeEvent, useEffect } from 'react';

import { CATEGORY_LIST } from '@features/register-product/constants/list';
import { FocusRefProps, RegisterProductForm } from '@features/register-product/model';
import { CATEGORY_REGEX } from '@shared/apis/product-api';
import { useSelectByName } from '@shared/hooks/use-select-by-name';
import { CommonCheckBox } from '@shared/ui/checkbox';

import * as S from './style';
import { ProductRegisterCategoryMeta } from '../product-register-category-meta';
import { ProductRegisterCategorySubMeta } from '../product-register-category-sub-meta';

type RegisterProductSortSelectCategoryProps = FocusRefProps;

export const RegisterProductSortSelectCategory = ({ focusRef }: RegisterProductSortSelectCategoryProps) => {
  const { fieldObj, handleChangeCheckBox, setError, clearErrors } = useSelectByName<
    Pick<RegisterProductForm, 'selectedProductSortCategory'>,
    ChangeEvent<HTMLInputElement>
  >({
    initialFieldValue: {
      selectedProductSortCategory: null,
    },
    regexForTestingName: CATEGORY_REGEX,
    shouldValidate: true,
  });

  useEffect(() => {
    if (fieldObj.selectedProductSortCategory === null) {
      setError('selectedProductSortCategory', {
        type: 'required',
        message: '상품 카테고리를 선택해주세요.',
      });

      return;
    }

    clearErrors('selectedProductSortCategory');
  }, [fieldObj.selectedProductSortCategory, setError, clearErrors]);

  return (
    <S.Wrapper>
      <ProductRegisterCategoryMeta
        metaTitle='상품 카테고리'
        metaDescription={<>구매자분들이 쉽게 찾을 수 있도록, 카테고리를 선정해주세요.</>}
      />
      <S.SelectBox>
        <ProductRegisterCategorySubMeta
          metaTitle='카테고리'
          metaDescription='*원활한 소통을 위해 추가하는 항목이에요!'
        />
        <S.SelectContainer>
          {CATEGORY_LIST.map(({ id, name, value }, idx) => (
            <CommonCheckBox
              ref={(node) => {
                if (node && idx === 0) {
                  focusRef.current.selectedProductSortCategory = node;
                }
              }}
              key={id}
              label={id}
              group={name}
              value={value}
              isChecked={!!(fieldObj.selectedProductSortCategory === name)}
              handleChangeCheckBox={handleChangeCheckBox}
            />
          ))}
        </S.SelectContainer>
      </S.SelectBox>
    </S.Wrapper>
  );
};
