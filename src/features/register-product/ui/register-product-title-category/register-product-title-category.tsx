import { ChangeEvent, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { RegisterProductForm } from '@features/register-product/model';

import * as S from './style';
import { ProductRegisterCategoryMeta } from '../product-register-category-meta';

export const RegisterProductTitleCategory = () => {
  const [countedTitleLength, setCountedTitleLength] = useState(0);
  const { register, setValue } = useFormContext<Pick<RegisterProductForm, 'productTitle'>>();

  return (
    <S.Wrapper>
      <ProductRegisterCategoryMeta metaTitle='상품 제목을 알려주세요.' />
      <S.ProductTitleInputBox>
        <S.ProductTitleInput
          type='text'
          {...register('productTitle', {
            required: {
              value: true,
              message: '상품 제목을 입력해주세요.',
            },
            maxLength: {
              value: 25,
              message: '상품 제목은 25자내로 작성해주세요.',
            },
            onChange: (event: ChangeEvent<HTMLInputElement>) => {
              const { value } = event.target;

              if (value.length > 25) {
                // 강제로 25자로 자르기
                setValue('productTitle', value.slice(0, 25));
                setCountedTitleLength(25);

                return;
              }

              setCountedTitleLength(value.length);
            },
          })}
          placeholder='카테고리를 25자내로 작성해주세요.'
        />
        <S.ProductTitleCounter>{countedTitleLength} / 25</S.ProductTitleCounter>
      </S.ProductTitleInputBox>
    </S.Wrapper>
  );
};
