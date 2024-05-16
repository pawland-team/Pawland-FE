import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import dynamic from 'next/dynamic';

import { FocusRefProps, RegisterProductForm } from '@features/register-product/model';
import {
  DeltaOnChangeQuill,
  EditorOnChangeQuill,
  SourceOnChangeQuill,
  ValueOnChangeQuill,
} from '@shared/interface/quill';

import * as S from './style';

// @see error - ReferenceError: document is not defined NextJS
// https://stackoverflow.com/questions/73047747/error-referenceerror-document-is-not-defined-nextjs
const CustomQuill = dynamic(() => import('./custom-quill').then((module) => module.CustomQuill), { ssr: false });

type RegisterProductDescriptionTextEditorProps = FocusRefProps;

export const RegisterProductDescriptionTextEditor = ({ focusRef }: RegisterProductDescriptionTextEditorProps) => {
  const { setValue, setError, watch, clearErrors } = useFormContext<
    Pick<RegisterProductForm, 'description' | 'images'>
    // Pick<RegisterProductForm, 'description' | 'images'> & { just_for_reset_quill: string }
  >();
  const description = watch('description');

  const handleQuillChange = (
    value: ValueOnChangeQuill,
    _delta: DeltaOnChangeQuill,
    _source: SourceOnChangeQuill,
    editor: EditorOnChangeQuill,
  ) => {
    // console.dir(editor.getContents());
    // console.log('-------------------------------');

    // img 추출
    // 형태: [{ insert: { image: '....' } }, { insert: { image: '....' } }, ...]
    // console.dir(editor.getContents().ops?.filter((op) => op.insert.image));

    // img만 추출
    // 형태: ['....', '....', ...]
    // console.dir(
    //   editor
    //     .getContents()
    //     .ops?.filter((op) => op.insert.image)
    //     .map((op) => op.insert.image),
    // );

    // setValue('just_for_reset_quill', value);
    // images 필드는 옵셔널하다 빈 배열[]로 보내도 된다는 뜻.
    setValue(
      'images',
      editor
        .getContents()
        .ops?.filter((op) => op.insert.image)
        // TODO: double check
        .map((op) => op.insert.image) as string[],
    );

    setValue('description', editor.getHTML());
  };

  useEffect(() => {
    if (!description) {
      setError(
        'description',
        {
          type: 'required',
          message: '상품에 대한 내용을 입력해주세요.',
        },
        {
          shouldFocus: true,
        },
      );

      return;
    }

    clearErrors('description');
  }, [description, clearErrors, setError]);

  return (
    <S.Wrapper>
      <S.CategoryHeaderArea>
        <S.MetaHeader>
          내용 <span>*</span>
        </S.MetaHeader>
        <S.MetaDescription>
          업데이트된 내용, 주의해야하는 점들을 안내해요!
          <br />
          {/* <span>*사진이 없이, 글로만 설명이 가능합니다.</span> */}
          <span>*사진과 글로 설명이 가능합니다.</span>
        </S.MetaDescription>
      </S.CategoryHeaderArea>
      <CustomQuill onChange={handleQuillChange} focusRef={focusRef} />
    </S.Wrapper>
  );
};
