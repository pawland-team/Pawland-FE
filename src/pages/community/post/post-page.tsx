import Image from 'next/image';

import * as S from './post-page-style';

export const CommunityPostPage = () => {
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
            <S.RegionSelectItem>서울</S.RegionSelectItem>
            <S.RegionSelectItem>부산</S.RegionSelectItem>
            <S.RegionSelectItem>대구</S.RegionSelectItem>
            <S.RegionSelectItem>인천</S.RegionSelectItem>
            <S.RegionSelectItem>광주</S.RegionSelectItem>
            <S.RegionSelectItem>대전</S.RegionSelectItem>
            <S.RegionSelectItem>울산</S.RegionSelectItem>
            <S.RegionSelectItem>세종</S.RegionSelectItem>
            <S.RegionSelectItem>경기</S.RegionSelectItem>
            <S.RegionSelectItem>강원</S.RegionSelectItem>
            <S.RegionSelectItem>충북</S.RegionSelectItem>
            <S.RegionSelectItem>충남</S.RegionSelectItem>
            <S.RegionSelectItem>전북</S.RegionSelectItem>
            <S.RegionSelectItem>전남</S.RegionSelectItem>
            <S.RegionSelectItem>경북</S.RegionSelectItem>
            <S.RegionSelectItem>경남</S.RegionSelectItem>
            <S.RegionSelectItem>제주</S.RegionSelectItem>
            <S.RegionSelectItem>해외</S.RegionSelectItem>
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
        <S.TextEditorTitle>내용</S.TextEditorTitle>
        <div>여기에 텍스트 에디터</div>
      </S.TextEditorArea>

      <S.PostThumnailImageArea>
        <S.PostThumnailImageAreaTitleBox>
          <S.PostThumnailImageAreaTitle>대표이미지</S.PostThumnailImageAreaTitle>
          <S.PostThumnailImageAreaSubTitle>대표 이미지를 넣어주세요.</S.PostThumnailImageAreaSubTitle>
        </S.PostThumnailImageAreaTitleBox>
        <S.ThumnailUploadBox>
          <S.ThumnailUploadBoxTitle>대표이미지</S.ThumnailUploadBoxTitle>
          <S.ThumnailUploadBoxSubTitle>* 리스트에서 썸네일로 보여지는 이미지입니다.</S.ThumnailUploadBoxSubTitle>
          <input placeholder='이미지 업로드' />
        </S.ThumnailUploadBox>
      </S.PostThumnailImageArea>
    </S.PostPage>
  );
};
