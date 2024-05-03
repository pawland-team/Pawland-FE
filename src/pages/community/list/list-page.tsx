import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import * as S from './list-page-style';

export const CommunityListPage = () => {
  const [iconSrc, setIconSrc] = useState('/images/icon/arrow-icon-gray.svg');
  const [isOpen, setIsOpen] = useState(false);

  const handleRegionSelect = () => {
    setIsOpen((prev) => !prev);
  };

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
              <S.ButtonTextWrapper>새 글 등록</S.ButtonTextWrapper>
            </Link>
          </S.NewPostButton>
        </S.HeaderArea>

        <S.ContentsArea>
          <S.CategoryArea>
            <S.RegionSelectButton onClick={handleRegionSelect}>
              지역별
              <S.DownArrowIconWrapper>
                <Image src='/images/icon/arrow-down-icon-gray.svg' alt='arrow-icon' fill />
              </S.DownArrowIconWrapper>
              {isOpen && (
                <>
                  <S.DropDownBox>
                    <h1>열렸다.</h1>
                  </S.DropDownBox>
                </>
              )}
            </S.RegionSelectButton>

            <S.RegionSelectButton>
              최신순
              <S.DownArrowIconWrapper>
                <Image src='/images/icon/arrow-down-icon-gray.svg' alt='arrow-icon' fill />
              </S.DownArrowIconWrapper>
            </S.RegionSelectButton>
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
                <S.TextContentsWrapper>
                  <S.ItemRegiontext>지역</S.ItemRegiontext>
                  <S.ItemTitleText>제목제목제목제목제목</S.ItemTitleText>
                  <S.ItemSubTextBox>
                    <S.ItemSubText>닉네임</S.ItemSubText>
                    <S.ItemSubDivider />
                    <S.ItemSubText>2024.05.03</S.ItemSubText>
                    <S.ItemSubDivider />
                    <S.ItemSubText>댓글 100</S.ItemSubText>
                    <S.ItemSubDivider />
                    <S.ItemSubText>추천 100</S.ItemSubText>
                  </S.ItemSubTextBox>
                </S.TextContentsWrapper>
                <S.ArrowIconWrapper>
                  <Image src={iconSrc} alt='arrow-icon' fill />
                </S.ArrowIconWrapper>
              </S.ItemBox>
            </Link>
          </S.ItemListArea>
        </S.ContentsArea>
      </S.MainArea>
    </S.CommunityListPage>
  );
};
