import React, { ChangeEvent, useMemo, useRef, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

import 'react-quill/dist/quill.snow.css';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { QuillOptionsStatic } from 'quill';

import { useModalList } from '@shared/hooks/use-modal';
import { PostModal } from '@shared/ui/modal/post-modal';

import * as S from './post-page-style';

interface FormData extends FieldValues {
  title: string;
  content: string;
}

interface ReactQuillProps {
  theme: string;
  value: string;
  onChange: (content: string) => void;
  modules?: QuillOptionsStatic['modules'];
  formats: string[];
  // 무슨 타입을 줘야될지 몰라서 임시로 any 설정했습니다
  forwardedRef: React.Ref<any>;
  style: React.CSSProperties;
}

const ReactQuill = dynamic<ReactQuillProps>(
  async () => {
    const { default: RQ } = await import('react-quill');

    // eslint-disable-next-line react/display-name
    return ({ forwardedRef, ...props }: ReactQuillProps) => <RQ ref={forwardedRef} {...props} />;
  },
  {
    ssr: false,
  },
);

export const CommunityPostPage = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [thumbnailPreview, setThumbnailPreview] = useState<string>('');
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const { register, handleSubmit, setValue, watch, reset } = useForm<FormData>();
  const { openModalList } = useModalList();
  const router = useRouter();
  // 무슨 타입을 줘야될지 몰라서 임시로 any 설정했습니다
  const quillRef = useRef<any>(null);

  const formats = [
    'header',
    'font',
    'size',
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
    'color',
    'background',
  ];

  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files ? input.files[0] : null;

      if (file) {
        const fileName = file.name;
        console.log('콘텐츠 이미지 이름:', fileName);

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/image`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fileName }),
          credentials: 'include',
        });

        if (!response.ok) throw new Error('프리사인 URL 요청에 실패했습니다.');

        const preSignedData = await response.json();
        const { presignedUrl }: { presignedUrl: string } = preSignedData;

        const uploadResponse = await fetch(presignedUrl, {
          method: 'PUT',
          body: file,
          headers: {
            'Content-Type': file.type,
          },
        });

        if (!uploadResponse.ok) throw new Error('파일 업로드에 실패했습니다.');

        const s3BucketBaseUrl = process.env.NEXT_PUBLIC_BUCKET_BASE_URL as string;
        const imageUrl = `${s3BucketBaseUrl}/${fileName}`;
        const editor = quillRef.current.getEditor();
        const range = editor.getSelection(true);
        editor.insertEmbed(range.index, 'image', imageUrl);
      }
    };
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: '1' }, { header: '2' }, { font: [] }],
          [{ color: [] }, { background: [] }],
          [{ size: ['small', false, 'large', 'huge'] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link', 'image'],
        ],
        handlers: { image: imageHandler },
      },
    }),
    [],
  );

  const onSubmit = async (data: FormData) => {
    console.log('form submitted', data);

    if (!selectedRegion) {
      openModalList({
        ModalComponent: PostModal,
        modalKey: ['post-modal'],
        props: {
          content: '지역을 선택해주세요.',
        },
      });

      return;
    }

    if (!thumbnailFile) {
      openModalList({
        ModalComponent: PostModal,
        modalKey: ['post-modal'],
        props: {
          content: '썸네일 이미지를 선택해주세요.',
        },
      });

      return;
    }

    try {
      // 프리사인 URL 요청
      const fileName = thumbnailFile.name;
      console.log('썸네일 이미지 이름:', fileName);

      const preSignedResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/image`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileName }),
        credentials: 'include',
      });

      if (!preSignedResponse.ok) throw new Error('프리사인 URL 요청에 실패했습니다.');

      const preSignedData = await preSignedResponse.json();
      const { presignedUrl }: { presignedUrl: string } = preSignedData;

      // 프리사인 URL로 파일 업로드
      const uploadResponse = await fetch(presignedUrl, {
        method: 'PUT',
        body: thumbnailFile,
        headers: {
          'Content-Type': thumbnailFile.type,
        },
      });

      if (!uploadResponse.ok) throw new Error('파일 업로드에 실패했습니다.');

      const s3BucketBaseUrl = process.env.NEXT_PUBLIC_BUCKET_BASE_URL as string;
      const thumbnailUrl = `${s3BucketBaseUrl}/${fileName}`;

      // 업로드된 파일의 URL을 서버로 전송
      const postData = {
        title: data.title,
        content: data.content,
        region: selectedRegion,
        thumbnail: thumbnailUrl,
      };

      console.log('postData:', postData);

      const postResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
        credentials: 'include',
      });

      if (!postResponse.ok) throw new Error('게시물 업로드에 실패했습니다.');

      openModalList({
        ModalComponent: PostModal,
        modalKey: ['post-modal'],
        props: {
          content: '게시물이 성공적으로 업로드 되었습니다.',
          onClose: () => {
            router.push('/community/list');
          },
        },
      });
      reset();
      setSelectedRegion('');
      setThumbnailPreview('');
      setThumbnailFile(null);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
      openModalList({
        ModalComponent: PostModal,
        modalKey: ['post-modal'],
        props: {
          content: `오류 발생: ${errorMessage}`,
        },
      });
    }
  };

  const handleRegionSelect = (region: string) => {
    setSelectedRegion(region);
  };

  const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setThumbnailPreview(URL.createObjectURL(file));
      setThumbnailFile(file);
    } else {
      setThumbnailFile(null);
    }
  };

  const regionList = [
    '서울',
    '부산',
    '대구',
    '인천',
    '광주',
    '대전',
    '울산',
    '세종',
    '경기',
    '강원',
    '충북',
    '충남',
    '전북',
    '전남',
    '경북',
    '경남',
    '제주',
    '해외',
  ];

  return (
    <S.PostPage>
      <form onSubmit={handleSubmit(onSubmit)}>
        <S.HeaderArea>
          <S.HeaderTitle>커뮤니티 등록</S.HeaderTitle>
          <S.ButtonArea>
            <S.TempSaveButton>
              <S.TempSaveButtonText>임시저장</S.TempSaveButtonText>
            </S.TempSaveButton>
            <S.PostButton type='submit'>
              <S.PostButtonIconWrapper>
                <Image src='/images/button/add-button.svg' alt='add-button' fill />
              </S.PostButtonIconWrapper>
              <S.buttonTextWrapper>커뮤니티 등록</S.buttonTextWrapper>
            </S.PostButton>
          </S.ButtonArea>
        </S.HeaderArea>

        <S.CategoryArea>
          <S.CategoryTitleBox>
            <S.CategoryTitle>지역 선택</S.CategoryTitle>
            <div>
              <S.CategortyParagraph>나와 가까운 이용자들과의</S.CategortyParagraph>
              <S.CategortyParagraph>원활한 소통을 위하여 지역을 선택해주세요.</S.CategortyParagraph>
            </div>
          </S.CategoryTitleBox>
          <S.RegionBox>
            <S.RegionSelectBoxTitle>지역 선택</S.RegionSelectBoxTitle>
            <S.RegionSelectBox>
              {regionList.map((region) => (
                <S.RegionSelectItem
                  key={region}
                  onClick={() => handleRegionSelect(region)}
                  style={{
                    backgroundColor: selectedRegion === region ? '#43ADFF' : '',
                    color: selectedRegion === region ? '#FFFFFF' : '',
                  }}
                >
                  {region}
                </S.RegionSelectItem>
              ))}
            </S.RegionSelectBox>
          </S.RegionBox>
        </S.CategoryArea>

        <S.TitleInputArea>
          <S.TitleInputTitle>제목을 입력해주세요.</S.TitleInputTitle>
          <S.TitleInputBox>
            <S.TitleInput
              placeholder='제목을 40자내로 작성해주세요.'
              {...register('title', { required: true, maxLength: 40 })}
            />
            <S.TitleInputCounter>{watch('title', '').length}/40</S.TitleInputCounter>
          </S.TitleInputBox>
        </S.TitleInputArea>

        <S.TextEditorArea>
          <S.TextEditorTitle>내용을 입력해주세요.</S.TextEditorTitle>
          <ReactQuill
            forwardedRef={quillRef}
            theme='snow'
            value={watch('content')}
            onChange={(content) => setValue('content', content)}
            modules={modules}
            formats={formats}
            style={{ height: '500px' }}
          />
        </S.TextEditorArea>

        <S.PostThumnailImageArea>
          <S.PostThumnailImageAreaTitleBox>
            <S.PostThumnailImageAreaTitle>대표이미지</S.PostThumnailImageAreaTitle>
            <S.PostThumnailImageAreaSubTitle>대표 이미지를 넣어주세요.</S.PostThumnailImageAreaSubTitle>
          </S.PostThumnailImageAreaTitleBox>
          <S.ThumnailUploadBox>
            <S.ThumnailUploadBoxTitle>대표이미지</S.ThumnailUploadBoxTitle>
            <S.ThumnailUploadBoxSubTitle>* 썸네일로 보여지는 이미지입니다.</S.ThumnailUploadBoxSubTitle>
            <S.UploadLabel htmlFor='thumnail-upload'>
              <S.UploadIconWrapper>
                <Image src='/images/icon/upload-file-icon.svg' alt='upload-icon' fill />
              </S.UploadIconWrapper>
              <S.UploadSpan>이미지 업로드</S.UploadSpan>
              <S.HideInput id='thumnail-upload' type='file' onChange={handleThumbnailChange} />
              {thumbnailPreview && (
                <div>
                  <Image src={thumbnailPreview} alt='thumbnail-preview' width={200} height={200} />
                </div>
              )}
            </S.UploadLabel>
          </S.ThumnailUploadBox>
        </S.PostThumnailImageArea>
      </form>
    </S.PostPage>
  );
};
