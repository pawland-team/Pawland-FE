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

  const RegionDropDownList = [
    {
      id: 0,
      name: '전체',
    },
    {
      id: 1,
      name: '대구',
    },
    {
      id: 2,
      name: '광주',
    },
    {
      id: 3,
      name: '울산',
    },
    {
      id: 4,
      name: '경기',
    },
    {
      id: 5,
      name: '충북',
    },
    {
      id: 6,
      name: '전북',
    },
    {
      id: 7,
      name: '경북',
    },
    {
      id: 8,
      name: '제주',
    },
    {
      id: 9,
      name: '서울',
    },
    {
      id: 10,
      name: '인천',
    },
    {
      id: 11,
      name: '대전',
    },
    {
      id: 12,
      name: '세종',
    },
    {
      id: 13,
      name: '강원',
    },
    {
      id: 14,
      name: '충남',
    },
    {
      id: 15,
      name: '전남',
    },
    {
      id: 16,
      name: '경남',
    },
    {
      id: 17,
      name: '해외',
    },
  ];

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
                    <S.RegionFormStyle>
                      {RegionDropDownList.map((item) => (
                        <S.RegionCheckBoxWrapper key={item.id}>
                          <input type='checkbox' value={item.id} onChange={handleRegionSelect} />
                          <label>{item.name}</label>
                        </S.RegionCheckBoxWrapper>
                      ))}
                    </S.RegionFormStyle>
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
