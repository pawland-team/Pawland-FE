import { MouseEvent, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';

import { CommunityPostListEntity } from '@shared/apis/community-api';

import * as S from './list-page-style';

const communityListQueryKey = 'communityList';

type RegionItem = {
  id: number;
  name: string;
};

type FilterItem = {
  id: number;
  name: string;
};

export const CommunityListPage = () => {
  const [isOpenRegion, setIsOpenRegion] = useState<boolean>(false);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);

  const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('최신순');

  const [hoveredItemId, setHoveredItemId] = useState<number | null>(null);

  const handleMouseEnter = (id: number) => {
    setHoveredItemId(id);
  };

  const handleMouseLeave = () => {
    setHoveredItemId(null);
  };

  const handleRegionSelect = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsOpenRegion((prev) => !prev);
  };

  const fetchCommunityList = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/community/list`);
    const data = await response.json();

    return data;
  };

  const { data: communityList, isLoading } = useQuery<CommunityPostListEntity[], Error>({
    queryKey: [communityListQueryKey],
    queryFn: fetchCommunityList,
  });

  const handleRegionCheckBox = (event: MouseEvent<HTMLInputElement>, regionName: string) => {
    event.stopPropagation();

    if (regionName === '전체') {
      // 전체 버튼을 클릭한 경우, 다른 모든 체크박스를 해제합니다.
      setSelectedRegions(selectedRegions.includes('전체') ? [] : ['전체']);
    } else {
      // 다른 버튼을 클릭한 경우, 전체 버튼을 해제합니다.
      setSelectedRegions((prev) => {
        if (prev.includes('전체')) {
          // 전체 버튼이 체크되어 있었다면, 전체 버튼을 제외하고 현재 버튼을 체크합니다.
          return [regionName];
        }

        if (prev.includes(regionName)) {
          // 현재 버튼이 이미 체크되어 있다면, 현재 버튼을 해제합니다.
          return prev.filter((name) => name !== regionName);
        }

        // 그렇지 않다면, 현재 버튼을 체크합니다.
        return [...prev, regionName];
      });
    }
  };

  const handleFilterSelect = (event: MouseEvent<HTMLDivElement>, filterName: string) => {
    event.stopPropagation();
    setSelectedFilter(filterName);
    setIsOpenFilter((prev) => !prev);
  };

  const RegionDropDownList: RegionItem[] = [
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

  const FilterDropDownList: FilterItem[] = [
    {
      id: 0,
      name: '최신순',
    },
    {
      id: 1,
      name: '조회순',
    },
    {
      id: 2,
      name: '추천순',
    },
    {
      id: 3,
      name: '댓글순',
    },
    {
      id: 4,
      name: '내가 쓴 글',
    },
  ];

  const selectedRegionNames: string[] = selectedRegions;

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
              {selectedRegionNames.length > 0 ? selectedRegionNames.join(', ') : '지역별'}
              <S.DownArrowIconWrapper>
                <Image src='/images/icon/arrow-down-icon-gray.svg' alt='arrow-icon' fill />
              </S.DownArrowIconWrapper>
              {isOpenRegion && (
                <>
                  <S.DropDownBox>
                    <S.RegionFormStyle>
                      {RegionDropDownList.map((item) => (
                        <S.RegionCheckBoxWrapper key={item.id}>
                          <input
                            type='checkbox'
                            value={item.id}
                            checked={selectedRegions.includes(item.name)}
                            onClick={(event) => handleRegionCheckBox(event, item.name)}
                          />
                          <label>{item.name}</label>
                        </S.RegionCheckBoxWrapper>
                      ))}
                    </S.RegionFormStyle>
                  </S.DropDownBox>
                </>
              )}
            </S.RegionSelectButton>

            <S.RegionSelectButton onClick={() => setIsOpenFilter((prev) => !prev)}>
              {selectedFilter}
              <S.DownArrowIconWrapper>
                <Image src='/images/icon/arrow-down-icon-gray.svg' alt='arrow-icon' fill />
              </S.DownArrowIconWrapper>
              {/* 최신순 조회수순 추천순 댓글순 내가쓴글 */}
              {isOpenFilter && (
                <>
                  <S.DropDownBox>
                    {FilterDropDownList.map((item) => (
                      <S.FilterWrapper key={item.id} onClick={(event) => handleFilterSelect(event, item.name)}>
                        <S.FilterContent>{item.name}</S.FilterContent>
                      </S.FilterWrapper>
                    ))}
                  </S.DropDownBox>
                </>
              )}
            </S.RegionSelectButton>
          </S.CategoryArea>
          <S.ItemListArea>
            {isLoading
              ? '로딩중'
              : communityList?.map((item) => {
                  const isHovered = hoveredItemId === item.id;

                  const arrowIconSrc = isHovered
                    ? '/images/icon/arrow-icon-blue.svg'
                    : '/images/icon/arrow-icon-gray.svg';

                  return (
                    <Link href={`/community/post-detail/${item.id}`} key={item.id}>
                      <S.ItemBox onMouseEnter={() => handleMouseEnter(item.id)} onMouseLeave={handleMouseLeave}>
                        <S.ThumnailImageWrapper>
                          <Image src={item.imageThumbnail} alt='thumnail-image' fill />
                        </S.ThumnailImageWrapper>
                        <S.TextContentsWrapper>
                          <S.ItemRegiontext>{item.region}</S.ItemRegiontext>
                          <S.ItemTitleText>{item.title}</S.ItemTitleText>
                          <S.ItemSubTextBox>
                            <S.ItemSubText>{item.writerInfo.nickname}</S.ItemSubText>
                            <S.ItemSubDivider />
                            <S.ItemSubText>{new Date(item.createdAt).toLocaleDateString()}</S.ItemSubText>
                            <S.ItemSubDivider />
                            <S.ItemSubText>댓글 {item.commentCount}</S.ItemSubText>
                            <S.ItemSubDivider />
                            <S.ItemSubText>추천 {item.recommendationCount}</S.ItemSubText>
                            <S.ItemSubDivider />
                            <S.ItemSubText>조회 {item.views}</S.ItemSubText>
                          </S.ItemSubTextBox>
                        </S.TextContentsWrapper>
                        <S.ArrowIconWrapper>
                          <Image src={arrowIconSrc} alt='arrow-icon' fill />
                        </S.ArrowIconWrapper>
                      </S.ItemBox>
                    </Link>
                  );
                })}
          </S.ItemListArea>
        </S.ContentsArea>
      </S.MainArea>
    </S.CommunityListPage>
  );
};
