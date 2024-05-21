import { MutableRefObject } from 'react';
import type ReactQuill from 'react-quill';

import { getPreSignedURL, PreSignedURLResponse } from '@shared/apis/image-api';
import { clientWithTokenApi } from '@shared/apis/instance';
import { useModalWithLocalState } from '@shared/hooks/use-modal';
import { NormalSnackBar } from '@shared/ui/snack-bar/normal-snack-bar';

interface HandleQuillImageImplParam {
  quillRef: MutableRefObject<ReactQuill | null>;
  appendPreRegisteredToS3ProductImage: (uniqueFileName: string) => void;
  openModal: ReturnType<typeof useModalWithLocalState>['openModal'];
}

export const handleQuillImageImpl = ({
  appendPreRegisteredToS3ProductImage,
  openModal,
  quillRef,
}: HandleQuillImageImplParam) => {
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
