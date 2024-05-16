import { useEffect, useState } from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

import { useGetUserInfo } from '@entities/user/hooks';
import { useUserStore } from '@entities/user/model';

import * as S from './edit-page-style';
import { getQueryClient } from '@shared/lib/get-query-client';

export const EditPage = () => {
  const queryClient = getQueryClient();
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;
  const { data, status } = useGetUserInfo();
  const { setUserInfo } = useUserStore((state) => ({ setUserInfo: state.setUserInfo }));
  const [nickname, setNickname] = useState(data?.nickname);
  const [description, setDescription] = useState(data?.userDesc);
  const [selectedFile, setSelectedFile] = useState<string | null>(data?.profileImage || null);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const router = useRouter();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setSelectedFile(URL.createObjectURL(file));
      setIsChanged(true);
      setImageFile(file);
    }
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    setIsChanged(true);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
    setIsChanged(true);
  };

  const handleDeleteImage = () => {
    setSelectedFile(null);
    setIsChanged(true);
  };

  useEffect(() => {
    if (status === 'success' && data) {
      setUserInfo(data);
    }
  }, [data, status]);

  const handleSaveProfile = async () => {
    try {
      if (imageFile) {
        const fileName = imageFile.name;
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

        const uploadResponse = await fetch(presignedUrl, {
          method: 'PUT',
          body: imageFile,
          headers: {
            'Content-Type': imageFile.type,
          },
        });

        if (!uploadResponse.ok) throw new Error('파일 업로드에 실패했습니다.');

        const s3BucketBaseUrl = process.env.NEXT_PUBLIC_BUCKET_BASE_URL as string;
        const ImageUrl = `${s3BucketBaseUrl}/${fileName}`;

        const response = await fetch(`${BASE_URL}/api/user/my-info`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            nickname,
            userDesc: description,
            profileImage: ImageUrl,
          }),
        });

        if (response.ok) {
          setIsChanged(false);
          const updatedUserInfo = await response.json();
          setUserInfo(updatedUserInfo);
          setIsChanged(false);
          queryClient.invalidateQueries({ queryKey: ['user'] });
          router.push('/profile');
        } else {
          console.error('프로필 저장 실패:', response.status);
          console.log(nickname, description, ImageUrl);
        }
      }
    } catch (error) {
      console.error('프로필 저장 실패:', error);
    }
  };

  return (
    <>
      <Head>
        <title>Pawland :: 프로필 수정</title>
      </Head>
      <main>
        <S.EditPage>
          <S.PageTitle>프로필</S.PageTitle>
          <S.InfoContainer>
            <S.ProfileImage src={selectedFile || undefined} alt='프로필 이미지' width={200} height={200} />
            <S.EditButtonArea>
              <S.ImageEditButton htmlFor='fileUpload'>바꾸기</S.ImageEditButton>
              <S.FileUploadInput id='fileUpload' type='file' accept='image/*' onChange={handleFileChange} />

              <S.ImageEditButton onClick={handleDeleteImage}>삭제</S.ImageEditButton>
            </S.EditButtonArea>
            <S.InputArea>
              <S.InputItem>
                <S.Label htmlFor='name'>닉네임</S.Label>

                <S.NicknameInput
                  type='text'
                  id='name'
                  name='nickname'
                  value={nickname}
                  onChange={handleNicknameChange}
                />
              </S.InputItem>

              <S.InputItem>
                <S.Label htmlFor='description'>소개</S.Label>
                <S.DescriptionInput
                  id='description'
                  name='description'
                  value={description}
                  onChange={handleDescriptionChange}
                />
              </S.InputItem>
            </S.InputArea>
            <S.LoginInfoArea>
              <S.Label htmlFor='idInfo'>아이디 정보</S.Label>
              <S.LoginInformation> 카카오로 로그인 되었습니다.</S.LoginInformation>
            </S.LoginInfoArea>

            <S.BigButtonArea>
              <S.BigButton>비밀번호 변경하기</S.BigButton>
              <S.SaveButton $isActive={isChanged} onClick={handleSaveProfile}>
                프로필 저장하기
              </S.SaveButton>
              <S.BigButton>로그아웃</S.BigButton>
              <S.UnregisterButton>회원탈퇴</S.UnregisterButton>
            </S.BigButtonArea>
          </S.InfoContainer>
        </S.EditPage>
      </main>
    </>
  );
};
