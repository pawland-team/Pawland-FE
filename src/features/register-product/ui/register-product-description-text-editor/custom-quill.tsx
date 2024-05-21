import { useMemo, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import ReactQuill, { ReactQuillProps } from 'react-quill';

import { styled } from 'styled-components';

import { FocusRefProps, RegisterProductForm } from '@features/register-product/model';
import { useProductImageListStore } from '@features/register-product/model/store';
import { handleQuillImageImpl } from '@features/register-product/utils/handle-quill-image-impl';
import { useModalWithLocalState } from '@shared/hooks/use-modal';

interface CustomQuillProps
  extends Omit<ReactQuillProps, 'className' | 'modules' | 'onChange'>,
    Required<Pick<ReactQuillProps, 'onChange'>>,
    FocusRefProps {}

export const CustomQuill = ({ theme = 'snow', onChange, focusRef, ...rest }: CustomQuillProps) => {
  const quillRef = useRef<ReactQuill | null>(null);
  const { ModalComponent, openModal, isModalOpen } = useModalWithLocalState();

  const appendPreRegisteredToS3ProductImage = useProductImageListStore(
    (state) => state.appendPreRegisteredToS3ProductImage,
  );

  const { watch } = useFormContext<Pick<RegisterProductForm, 'description'>>();

  /**
   * ? 궁금증
   * - 이미지를 지우는 순간에도 imageHandler가 발동하나?
   * - 발동되면 이 때 S3에 요청해서 지우면 좋은데
   */
  const imageHandler = () => {
    handleQuillImageImpl({ appendPreRegisteredToS3ProductImage, openModal, quillRef });
  };

  // https://quilljs.com/docs/modules/toolbar
  // https://techtrendtalk.com/%EB%A6%AC%EC%95%A1%ED%8A%B8-quill-%EC%97%90%EB%94%94%ED%84%B0-%EC%82%AC%EC%9A%A9%EB%B2%95-2023/
  const mod = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
          [
            {
              color: [
                '#000000',
                '#e60000',
                '#ff9900',
                '#ffff00',
                '#008a00',
                '#0066cc',
                '#9933ff',
                '#ffffff',
                '#facccc',
                '#ffebcc',
                '#ffffcc',
                '#cce8cc',
                '#cce0f5',
                '#ebd6ff',
                '#bbbbbb',
                '#f06666',
                '#ffc266',
                '#ffff66',
                '#66b966',
                '#66a3e0',
                '#c285ff',
                '#888888',
                '#a10000',
                '#b26b00',
                '#b2b200',
                '#006100',
                '#0047b2',
                '#6b24b2',
                '#444444',
                '#5c0000',
                '#663d00',
                '#666600',
                '#003700',
                '#002966',
                '#3d1466',
                'custom-color',
              ],
            },
            { background: [] },
          ],
          ['link', 'image'],
          ['clean'],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    [],
  );

  return (
    <>
      {isModalOpen && <ModalComponent />}
      <S.CustomQuill
        tabIndex={-1}
        ref={(quill) => {
          if (quill) {
            focusRef.current.description = quill;
            quillRef.current = quill;
          }
        }}
        theme={theme}
        modules={mod}
        value={watch('description')}
        onChange={onChange}
        {...rest}
      />
    </>
  );
};

const S = {
  CustomQuill: styled(ReactQuill)`
    flex-shrink: 0;
    width: 100%;
    height: 621px;
  `,
};
