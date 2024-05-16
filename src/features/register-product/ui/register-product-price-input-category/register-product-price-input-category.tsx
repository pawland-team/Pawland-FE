import { ChangeEvent, useId } from 'react';
import { useFormContext } from 'react-hook-form';

import { RegisterProductForm } from '@features/register-product/model';
import { useSelectByName } from '@shared/hooks/use-select-by-name';
import { CommonCheckBox } from '@shared/ui/checkbox';

import * as S from './style';
import { ProductRegisterCategoryMeta } from '../product-register-category-meta';
import { ProductRegisterCategorySubMeta } from '../product-register-category-sub-meta';

export const RegisterProductPriceInputCategory = () => {
  const id = useId();
  const { register, setValue } = useFormContext<Pick<RegisterProductForm, 'price'>>();

  const { fieldObj, handleChangeCheckBox } = useSelectByName<
    Pick<RegisterProductForm, 'price'>,
    ChangeEvent<HTMLInputElement>
  >({
    initialFieldValue: {
      price: null,
    },
    regexForTestingName: /\w/,
  });

  const toggleCheckBox = (e: ChangeEvent<HTMLInputElement>) => {
    // (헷갈릴 수 있음) e.target는 항상 변화가 일어난 현재의 이벤트 객체 타겟의 상태를 가져옴.
    // 이번 변화로 체크가 해제된 상태라면
    if (!e.target.checked) {
      // 해제된 상태랑 동기화를 맞춰주기 위해, 값이 없는 상태로 만들어준다.
      setValue('price', null);

      return;
    }

    handleChangeCheckBox(e);
  };

  return (
    <S.Wrapper>
      <ProductRegisterCategoryMeta
        metaTitle='금액 입력'
        metaDescription={<>구매자분들이 쉽게 찾을 수 있도록, 카테고리를 선정해주세요.</>}
      />
      <S.SelectBox>
        <ProductRegisterCategorySubMeta
          metaTitle='금액입력'
          metaDescription='*원활한 소통을 위해 추가하는 항목이에요!'
        />
        <S.SelectContainer>
          <S.PriceInputBox>
            {/* pattern 속성값으로 숫자 정규표현식이 들어가야 한다. */}
            <S.PriceInput
              type='text'
              // TODO: register option 분리하기
              {...register('price', {
                // 값이 없으면 NaN (얘도 number 타입임)
                // valueAsNumber: true,
                onChange: (event: ChangeEvent<HTMLInputElement>) => {
                  // console.log(typeof event.target.value); // string
                  const { value } = event.target;
                  const parsedValue = value.replaceAll(',', '');
                  const numericValue = parseInt(parsedValue, 10);

                  if (Number.isNaN(numericValue)) {
                    setValue('price', null);

                    return;
                  }

                  if (numericValue < 0) {
                    setValue('price', '0');

                    return;
                  }

                  if (numericValue > 1000_000_000) {
                    setValue('price', (1000_000_000).toLocaleString('ko-KR'));

                    return;
                  }

                  setValue('price', numericValue.toLocaleString('ko-KR'));
                },
                required: {
                  value: true,
                  message: '금액을 입력해주세요',
                },
              })}
              placeholder='금액을 입력해주세요'
            />
            <S.PriceUnit>원</S.PriceUnit>
          </S.PriceInputBox>
          <S.CheckBoxAligner>
            <CommonCheckBox
              key={id}
              label={id}
              group={'0'}
              value={'무료나눔'}
              isChecked={!!(fieldObj.price === '0')}
              handleChangeCheckBox={toggleCheckBox}
            />
          </S.CheckBoxAligner>
        </S.SelectContainer>
      </S.SelectBox>
    </S.Wrapper>
  );
};
