import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';

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

type Author = {
  id: number;
  email: string;
  nickname: string;
  profileImage: string;
  star?: number;
  reviewCount?: number;
};

type Replies = {
  id: number;
  author: Author;
  content: string;
  createdAt: string;
};

type Comment = {
  id: number;
  author: Author;
  content: string;
  replies: Replies[];
  recommendCount: number;
  createdAt: string;
};

type Post = {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  region: string;
  views: number;
  author: Author;
  comments: Comment[];
  createdAt: string;
  recommendCount: number;
  recommended: boolean;
};

type Pageable = {
  pageNumber: number;
  pageSize: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  offset: number;
  paged: boolean;
  unpaged: boolean;
};

type ApiResponse = {
  content: Post[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
};

const CommunityListPage = () => {
  const [isOpenRegion, setIsOpenRegion] = useState<boolean>(false);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);

  const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('최신순');

  const [page, setPage] = useState<number>(1);
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [hoveredItemId, setHoveredItemId] = useState<number | null>(null);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const calculateTotalComments = (comments: Comment[]) => {
    return comments.reduce((total, comment) => {
      return total + 1 + comment.replies.length;
    }, 0);
  };

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

  const fetchCommunityList = async (
    page: number,
    selectedRegions: string[],
    selectedFilter: string,
    searchQuery: string,
  ): Promise<ApiResponse> => {
    const region = selectedRegions.length ? selectedRegions.join(',') : '';

    let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/post?page=${page}&content=${encodeURIComponent(searchQuery)}&region=${encodeURIComponent(region)}`;

    switch (selectedFilter) {
      case '내가 쓴 글':
        url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/post/my-post?page=${page}`;
        break;
      case '최신순':
        url += '&orderBy=new';
        break;
      case '조회순':
        url += '&orderBy=view';
        break;
      case '추천순':
        url += '&orderBy=recommend';
        break;
      case '댓글순':
        url += '&orderBy=comment';
        break;
      default:
        break;
    }

    const response = await fetch(url, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 401) {
      throw new Error('인증 실패: 로그인 정보가 유효하지 않습니다.');
    }

    if (!response.ok) {
      throw new Error('데이터를 불러오는 데 실패했습니다.');
    }

    return response.json();
  };

  const { data, isLoading } = useQuery<ApiResponse>({
    queryKey: [communityListQueryKey, page, selectedRegions, selectedFilter, searchQuery],
    queryFn: () => fetchCommunityList(page, selectedRegions, selectedFilter, searchQuery),
  });

  const communityList = data?.content || [];
  const totalPages = data?.totalPages || 1;

  useEffect(() => {
    const visiblePages = 5;
    let startPage = page - 2;

    if (startPage < 1) {
      startPage = 1;
    }

    let endPage = startPage + visiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - visiblePages + 1);
    }

    const newPageNumbers = [];

    for (let i = startPage; i <= endPage; i++) {
      newPageNumbers.push(i);
    }

    setPageNumbers(newPageNumbers);
  }, [page, totalPages]);

  const handleRegionCheckBox = (event: MouseEvent<HTMLInputElement>, regionName: string) => {
    event.stopPropagation();

    setSelectedRegions((prev) => {
      if (prev.includes(regionName)) {
        return prev.filter((name) => name !== regionName);
      }

      return [...prev, regionName];
    });
  };

  const handleFilterSelect = (event: MouseEvent<HTMLDivElement>, filterName: string) => {
    event.stopPropagation();
    setSelectedFilter(filterName);
    setIsOpenFilter((prev) => !prev);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const RegionDropDownList: RegionItem[] = [
    { id: 0, name: '대구' },
    { id: 1, name: '광주' },
    { id: 2, name: '울산' },
    { id: 3, name: '경기' },
    { id: 4, name: '충북' },
    { id: 5, name: '전북' },
    { id: 6, name: '경북' },
    { id: 7, name: '제주' },
    { id: 8, name: '서울' },
    { id: 9, name: '인천' },
    { id: 10, name: '대전' },
    { id: 11, name: '세종' },
    { id: 12, name: '강원' },
    { id: 13, name: '충남' },
    { id: 14, name: '전남' },
    { id: 15, name: '경남' },
    { id: 16, name: '부산' },
    { id: 17, name: '해외' },
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

  function isValidHttpUrl(string: string) {
    let url;

    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }

    return url.protocol === 'http:' || url.protocol === 'https:';
  }

  return (
    <S.CommunityListPage>
      <S.MainArea>
        <S.HeaderArea>
          <S.HeaderTitle>커뮤니티</S.HeaderTitle>
          <S.SearchBarContainer>
            <S.SearchIconWrapper>
              <Image src='/images/icon/search-icon.svg' alt='search-icon' fill />
            </S.SearchIconWrapper>
            <S.SearchBar placeholder='제목을 검색해주세요.' value={searchQuery} onChange={handleSearchChange} />
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
            {!isLoading &&
              communityList?.map((item) => {
                const isHovered = hoveredItemId === item.id;

                const arrowIconSrc = isHovered
                  ? '/images/icon/arrow-icon-blue.svg'
                  : '/images/icon/arrow-icon-gray.svg';

                const thumbnailUrl = isValidHttpUrl(item.thumbnail) ? item.thumbnail : '/images/test/test-image2.png';
                const totalComments = calculateTotalComments(item.comments);

                return (
                  <Link href={`/community/post-detail/${item.id}`} key={item.id}>
                    <S.ItemBox onMouseEnter={() => handleMouseEnter(item.id)} onMouseLeave={handleMouseLeave}>
                      <S.ThumnailImageWrapper>
                        <Image src={thumbnailUrl} alt='thumbnail-image' fill />
                      </S.ThumnailImageWrapper>
                      <S.TextContentsWrapper>
                        <S.ItemRegiontext>{item.region}</S.ItemRegiontext>
                        <S.ItemTitleText>{item.title}</S.ItemTitleText>
                        <S.ItemSubTextBox>
                          <S.ItemSubText>{item.author.nickname}</S.ItemSubText>
                          <S.ItemSubDivider />
                          <S.ItemSubText>{new Date(item.createdAt).toLocaleDateString()}</S.ItemSubText>
                          <S.ItemSubDivider />
                          <S.ItemSubText>댓글 {totalComments}</S.ItemSubText>
                          <S.ItemSubDivider />
                          <S.ItemSubText>추천 {item.recommendCount}</S.ItemSubText>
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
          <S.PaginationWrapper>
            <button type='button' onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
              &lt;
            </button>
            {pageNumbers.map((number) => (
              <button type='button' key={number} onClick={() => handlePageChange(number)} disabled={number === page}>
                {number}
              </button>
            ))}
            <button type='button' onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
              &gt;
            </button>
          </S.PaginationWrapper>
        </S.ContentsArea>
      </S.MainArea>
    </S.CommunityListPage>
  );
};

export { CommunityListPage };
