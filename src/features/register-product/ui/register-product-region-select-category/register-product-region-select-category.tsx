import { MouseEvent, useEffect } from 'react';

import { REGION_LIST } from '@features/register-product/constants/list';
import { FocusRefProps, RegisterProductForm } from '@features/register-product/model';
import { REGION_REGEX } from '@shared/apis/product-api';
import { useSelectByName } from '@shared/hooks/use-select-by-name';

import * as S from './style';
import { ProductRegisterCategoryMeta } from '../product-register-category-meta';
import { ProductRegisterCategorySubMeta } from '../product-register-category-sub-meta';

type RegisterProductRegionSelectCategoryProps = FocusRefProps;

export const RegisterProductRegionSelectCategory = ({ focusRef }: RegisterProductRegionSelectCategoryProps) => {
  const { fieldObj, handleChangeCheckBox, setError, clearErrors } = useSelectByName<
    Pick<RegisterProductForm, 'selectedRegionCategory'>,
    MouseEvent<HTMLInputElement>
  >({
    initialFieldValue: {
      selectedRegionCategory: null,
    },
    regexForTestingName: REGION_REGEX,
  });

  useEffect(() => {
    if (fieldObj.selectedRegionCategory === null) {
      setError('selectedRegionCategory', {
        type: 'required',
        message: '지역을 선택해주세요.',
      });

      return;
    }

    clearErrors('selectedRegionCategory');
  }, [fieldObj.selectedRegionCategory, setError, clearErrors]);

  return (
    <S.Wrapper>
      <ProductRegisterCategoryMeta
        metaTitle='지역 선택'
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
          metaTitle='지역 선택'
          metaDescription='*원활한 소통을 위해 추가하는 항목이에요!'
        />
        <S.SelectContainer>
          <S.RegionSelectBox
            tabIndex={-1}
            ref={(node) => {
              if (node) {
                focusRef.current.selectedRegionCategory = node;
              }
            }}
          >
            {REGION_LIST.map((region) => (
              <S.RegionSelectItem
                type='button'
                key={region}
                name={region}
                onClick={handleChangeCheckBox}
                style={{
                  backgroundColor: fieldObj.selectedRegionCategory === region ? '#43ADFF' : '',
                  color: fieldObj.selectedRegionCategory === region ? '#FFFFFF' : '',
                }}
                value={region}
              />
            ))}
          </S.RegionSelectBox>
        </S.SelectContainer>
      </S.SelectBox>
    </S.Wrapper>
  );
};
