import { useMemo, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import ReactQuill, { ReactQuillProps } from 'react-quill';

import { styled } from 'styled-components';

import { FocusRefProps, RegisterProductForm } from '@features/register-product/model';
import { useProductImageListStore } from '@features/register-product/model/store';
import { getPreSignedURL, PreSignedURLResponse } from '@shared/apis/image-api';
import { clientWithTokenApi } from '@shared/apis/instance';
import { useModalWithLocalState } from '@shared/hooks/use-modal';
import { NormalSnackBar } from '@shared/ui/snack-bar/normal-snack-bar';

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
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.setAttribute('name', 'image');
    input.click();

    input.onchange = async () => {
      if (!input.files) {
        return;
      }

      const file = input.files[0];

      // 10MB 이상의 파일은 업로드 불가능
      if (file.size > 1024 * 1024 * 10) {
        openModal({
          ModalComponent: NormalSnackBar,
          props: { message: '파일 크기는 10MB까지만 가능합니다.' },
          options: {
            persist: true,
          },
        });

        return;
      }

      /**
       * unique file name
       */
      const uuid = crypto.randomUUID();
      const uniqueFileName = `${uuid}-${file.name}`;

      let presignedUrl: PreSignedURLResponse['presignedUrl'];

      // 백엔드 서버에 pre-signed url을 요청하는 부분
      // 여기서 보내는 fileName이 s3에 저장될 파일 이름이다.
      try {
        presignedUrl = (await getPreSignedURL({ fileName: uniqueFileName })).presignedUrl;
        console.log(presignedUrl);
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
        // 한 번이라도 S3에 등록한 이미지 리스트 전역 스토어에 저장
        appendPreRegisteredToS3ProductImage(uniqueFileName);
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

      if (!quillRef.current) {
        return;
      }

      const uniqueImageUrl = `${process.env.NEXT_PUBLIC_BUCKET_BASE_URL}/${uniqueFileName}`;
      console.log(uniqueImageUrl);
      // 에디터 정보 가져오기
      const quill = quillRef.current.getEditor();
      // const range = quillRef.current.getEditorSelection();
      // @see https://quilljs.com/docs/api#getselection
      // 현재 에디터 커서 위치를 알려준다.
      const range = quill.getSelection(true);

      if (range) {
        // 현재 커서 위치에 이미지를 추가
        // @see https://quilljs.com/docs/api#insertembed
        quill.insertEmbed(range.index, 'image', uniqueImageUrl);
        // 이미지 추가 후에 커서를 이미지 뒤로 이동
        // @see https://quilljs.com/docs/api#setselection
        quill.setSelection({ index: range.index + 1, length: 0 });
      } else {
        console.error('User cursor is not in the editor');
      }
    };
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
        // handlers: {},
      },
    }),
    [],
  );

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
  ];

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
        formats={formats}
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
