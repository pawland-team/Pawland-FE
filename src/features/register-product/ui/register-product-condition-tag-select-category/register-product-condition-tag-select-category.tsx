import { MouseEvent, useEffect } from 'react';

import { CONDITION_TAG_LIST } from '@features/register-product/constants/list';
import { FocusRefProps, RegisterProductForm } from '@features/register-product/model';
import { PRODUCT_CONDITION_REGEX } from '@shared/apis/product-api';
import { useSelectByName } from '@shared/hooks/use-select-by-name';

import * as S from './style';
import { ProductRegisterCategoryMeta } from '../product-register-category-meta';
import { ProductRegisterCategorySubMeta } from '../product-register-category-sub-meta';

type RegisterProductConditionTagSelectCategoryProps = FocusRefProps;

export const RegisterProductConditionTagSelectCategory = ({
  focusRef,
}: RegisterProductConditionTagSelectCategoryProps) => {
  const { fieldObj, handleChangeCheckBox, setError, clearErrors } = useSelectByName<
    {
      selectedProductConditionTagCategory: RegisterProductForm['selectedProductConditionTagCategory'];
    },
    MouseEvent<HTMLInputElement>
  >({
    initialFieldValue: {
      selectedProductConditionTagCategory: null,
    },
    regexForTestingName: PRODUCT_CONDITION_REGEX,
  });

  useEffect(() => {
    if (fieldObj.selectedProductConditionTagCategory === null) {
      setError('selectedProductConditionTagCategory', {
        type: 'required',
        message: '상품의 상태를 선택해주세요.',
      });

      return;
    }

    clearErrors('selectedProductConditionTagCategory');
  }, [fieldObj.selectedProductConditionTagCategory, setError, clearErrors]);

  return (
    <S.Wrapper>
      <ProductRegisterCategoryMeta
        metaTitle='상품 상태 선택'
        metaDescription={
          <>
            구매자분들이 쉽게 찾을 수 있도록,
            <br />
            카테고리를 선정해주세요.
          </>
        }
      />
      <S.SelectBox>
        <ProductRegisterCategorySubMeta
          metaTitle='상품의 상태를 선택해주세요.'
          metaDescription='*원활한 소통을 위해 추가하는 항목이에요!'
        />
        <S.SelectContainer>
          {CONDITION_TAG_LIST.map(({ id, name, value }, idx) => (
            <S.SelectItem
              ref={(node) => {
                if (node && idx === 0) {
                  focusRef.current.selectedProductConditionTagCategory = node;
                }
              }}
              type='button'
              key={id}
              name={name}
              onClick={handleChangeCheckBox}
              style={{
                backgroundColor: fieldObj.selectedProductConditionTagCategory === name ? '#43ADFF' : '',
                color: fieldObj.selectedProductConditionTagCategory === name ? '#FFFFFF' : '',
              }}
              value={value}
            />
          ))}
        </S.SelectContainer>
      </S.SelectBox>
    </S.Wrapper>
  );
};
