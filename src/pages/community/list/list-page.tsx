import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import * as S from './list-page-style';

export const CommunityListPage = () => {
  const [iconSrc, setIconSrc] = useState('/images/icon/arrow-icon-gray.svg');

  return (
    <S.CommunityListPage>
      <S.MainArea>
        <S.HeaderArea>
          <S.HeaderTitle>커뮤니티</S.HeaderTitle>
          <S.SearchBarContainer>
            <S.SearchIconWrapper>
              <Image src='/images/icon/search-icon.svg' alt='search-icon' fill />
            </S.SearchIconWrapper>
            <S.SearchBar placeholder='제목을 검색해주세요.' />
          </S.SearchBarContainer>
          <S.NewPostButton>
            <S.PostButtonIconWrapper>
              <Image src='/images/button/add-button.svg' alt='add-button' fill />
            </S.PostButtonIconWrapper>
            <Link href='/community/post'>
              <S.buttonTextWrapper>새 글 등록</S.buttonTextWrapper>
            </Link>
          </S.NewPostButton>
        </S.HeaderArea>

        <S.ContentsArea>
          <S.CategoryArea>
            <div>지역별</div>
            <div>최신순</div>
          </S.CategoryArea>
          <S.ItemListArea>
            <Link href='/community/post-detail'>
              <S.ItemBox
                onMouseEnter={() => setIconSrc('/images/icon/arrow-icon-blue.svg')}
                onMouseLeave={() => setIconSrc('/images/icon/arrow-icon-gray.svg')}
              >
                <S.ThumnailImageWrapper>
                  <Image src='/images/logo/signature-logo.svg' alt='thumnail-image' fill />
                </S.ThumnailImageWrapper>
                <S.textContentsWrapper>
                  <S.itemRegiontext>지역</S.itemRegiontext>
                  <S.itemTitleText>제목제목제목제목제목</S.itemTitleText>
                  <S.itemSubTextBox>
                    <S.itemSubText>날짜</S.itemSubText>
                    <S.itemSubDivider />
                    <S.itemSubText>댓글 100</S.itemSubText>
                    <S.itemSubDivider />
                    <S.itemSubText>추천 100</S.itemSubText>
                  </S.itemSubTextBox>
                </S.textContentsWrapper>
                <S.arrowIconWrapper>
                  <Image src={iconSrc} alt='arrow-icon' fill />
                </S.arrowIconWrapper>
              </S.ItemBox>
            </Link>
          </S.ItemListArea>
        </S.ContentsArea>
      </S.MainArea>
    </S.CommunityListPage>
  );
};
