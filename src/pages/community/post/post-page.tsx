import { useState } from 'react';

import Image from 'next/image';

import * as S from './post-page-style';

export const CommunityPostPage = () => {
  const [selectedRegion, setSelectedRegion] = useState('');

  const handleRegionSelect = (region: string) => {
    setSelectedRegion(region);
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
      <S.HeaderArea>
        <S.HeaderTitle>커뮤니티 등록</S.HeaderTitle>
        <S.ButtonArea>
          <S.TempSaveButton>
            <S.TempSaveButtonText>임시저장</S.TempSaveButtonText>
          </S.TempSaveButton>
          <S.PostButton>
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
          <S.TitleInput placeholder='제목을 20자내로 작성해주세요.' />
          <S.TitleInputCounter>0/20</S.TitleInputCounter>
        </S.TitleInputBox>
      </S.TitleInputArea>

      <S.TextEditorArea>
        <S.TextEditorTitle>내용을 입력해주세요.</S.TextEditorTitle>
        <div>여기에 텍스트 에디터</div>
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
            <S.HideInput id='thumnail-upload' type='file' />
          </S.UploadLabel>
        </S.ThumnailUploadBox>
      </S.PostThumnailImageArea>
    </S.PostPage>
  );
};
