import { ChangeEvent, useEffect } from 'react';

import { ANIMAL_SORT_LIST } from '@features/register-product/constants/list';
import { FocusRefProps, RegisterProductForm } from '@features/register-product/model';
import { SPECIES_REGEX } from '@shared/apis/product-api';
import { useSelectByName } from '@shared/hooks/use-select-by-name';
import { CommonCheckBox } from '@shared/ui/checkbox';

import * as S from './style';
import { ProductRegisterCategoryMeta } from '../product-register-category-meta';
import { ProductRegisterCategorySubMeta } from '../product-register-category-sub-meta';

type RegisterProductSpeciesSelectCategoryProps = FocusRefProps;

export const RegisterProductSpeciesSelectCategory = ({ focusRef }: RegisterProductSpeciesSelectCategoryProps) => {
  const { fieldObj, handleChangeCheckBox, clearErrors, setError } = useSelectByName<
    Pick<RegisterProductForm, 'selectedSpeciesCategory'>,
    ChangeEvent<HTMLInputElement>
  >({
    initialFieldValue: {
      selectedSpeciesCategory: null,
    },
    regexForTestingName: SPECIES_REGEX,
  });

  useEffect(() => {
    if (fieldObj.selectedSpeciesCategory === null) {
      setError('selectedSpeciesCategory', {
        type: 'required',
        message: '동물 종류를 선택해주세요.',
      });

      return;
    }

    clearErrors('selectedSpeciesCategory');
  }, [fieldObj.selectedSpeciesCategory, setError, clearErrors]);

  return (
    <S.Wrapper>
      <ProductRegisterCategoryMeta
        metaTitle='동물별 카테고리'
        metaDescription={<>구매자분들이 쉽게 찾을 수 있도록, 카테고리를 선정해주세요.</>}
      />
      <S.SelectBox>
        <ProductRegisterCategorySubMeta
          metaTitle='동물별 카테고리'
          metaDescription='*원활한 소통을 위해 추가하는 항목이에요!'
        />
        <S.SelectContainer
          tabIndex={-1}
          ref={(node) => {
            if (node) {
              focusRef.current.selectedSpeciesCategory = node;
            }
          }}
        >
          {ANIMAL_SORT_LIST.map(({ id, name, value }) => (
            <CommonCheckBox
              key={id}
              label={id}
              group={name}
              value={value}
              isChecked={!!(fieldObj.selectedSpeciesCategory === name)}
              handleChangeCheckBox={handleChangeCheckBox}
            />
          ))}
        </S.SelectContainer>
      </S.SelectBox>
    </S.Wrapper>
  );
};
