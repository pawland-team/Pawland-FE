import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type SortingValueType = '최신순' | '조회순' | '인기순' | '낮은 가격순' | '높은 가격순';

export type CategoryItemList = {
  group: string;
  data: {
    value: string;
    label: string;
    isChecked: boolean;
  }[];
};

export interface CheckedCategoryState {
  /**
   * region/species/상품별 한꺼번에 관리
   */
  initialValueList: {
    [index: string]: CategoryItemList;
    region: CategoryItemList;
    species: CategoryItemList;
    category: CategoryItemList;
    isFree: CategoryItemList;
  };
  /**
   * 변경된 group 값이 저장되는 곳
   */
  updatedValueList: {
    [index: string]: CategoryItemList;
    region: CategoryItemList;
    species: CategoryItemList;
    category: CategoryItemList;
    isFree: CategoryItemList;
  };
  /**
   * 선택된 값만 배열로 따로 관리
   */
  selectedValues: {
    group: string;
    value: string;
    isChecked: boolean;
  }[];
  /**
   * 소팅
   */
  sorting: SortingValueType;

  /**
   * 검색용 params
   */
  searchParams: {
    [index: string]: string[];
    region: string[];
    species: string[];
    category: string[];
  };
  /**
   * isFree 검색용 params
   */
  isFree: boolean;
  /**
   * 키워드 검색
   */
  content: string;
  /**
   * 페이지네이션 용
   * - page : 현재 페이지
   * - size : 한 페이지당 보여지는 카드 갯수
   * - totlaItemCount : 리스트가 가지는 모든 카드 갯수
   */
  pagingStatus: {
    page: number;
    size: number;
    totalItemCount: number;
  };
  /**
   * 선택된 값 배열에 추가 및 중복되는 값은 추가하지 않도록
   */
  addSelectedValue: (group: string, value: string, isChecked: boolean) => void;
  removeSelectedValue: (group: string, value: string) => void;
  changeSelectedSortingValue: (value: SortingValueType) => void;
  clearSelectedValues: () => void;
  changeIsFree: (isChecked: boolean) => void;
  changeContent: (value: string) => void;
  changePagingStatus: (page: number, size: number, totalItemCount: number) => void;
}

const initialValueList = {
  region: {
    group: 'region',
    data: [
      { value: '서울', label: '서울', isChecked: false },
      { value: '대구', label: '대구', isChecked: false },
      { value: '인천', label: '인천', isChecked: false },
      { value: '광주', label: '광주', isChecked: false },
      { value: '대전', label: '대전', isChecked: false },
      { value: '울산', label: '울산', isChecked: false },
      { value: '세종', label: '세종', isChecked: false },
      { value: '경기', label: '경기', isChecked: false },
      { value: '강원', label: '강원', isChecked: false },
      { value: '충북', label: '충북', isChecked: false },
      { value: '충남', label: '충남', isChecked: false },
      { value: '전북', label: '전북', isChecked: false },
      { value: '전남', label: '전남', isChecked: false },
      { value: '경북', label: '경북', isChecked: false },
      { value: '경남', label: '경남', isChecked: false },
      { value: '제주', label: '제주', isChecked: false },
      { value: '해외', label: '해외', isChecked: false },
    ],
  },
  species: {
    group: 'species',
    data: [
      { value: '강아지', label: '강아지', isChecked: false },
      { value: '고양이', label: '고양이', isChecked: false },
      { value: '그외 동물', label: '그외 동물', isChecked: false },
    ],
  },
  category: {
    group: 'category',
    data: [
      { value: '사료', label: '사료', isChecked: false },
      { value: '장난감', label: '장난감', isChecked: false },
      { value: '옷', label: '옷', isChecked: false },
      { value: '악세사리', label: '악세사리', isChecked: false },
      { value: '그 외 상품', label: '그 외 상품', isChecked: false },
    ],
  },
  isFree: {
    group: 'isFree',
    data: [
      {
        value: '무료나눔',
        label: '무료나눔',
        isChecked: false,
      },
    ],
  },
};

const initialSorting = '최신순';

const initialSearchParams = {
  region: [],
  species: [],
  category: [],
};

const initialIsFree = false;
const initialPagingStatus = { page: 1, size: 12, totalItemCount: 0 };

export const useCheckedCategoryStore = create<CheckedCategoryState>()(
  devtools((set) => ({
    initialValueList,
    updatedValueList: initialValueList,
    selectedValues: [],
    sorting: initialSorting,
    searchParams: initialSearchParams,
    isFree: initialIsFree,
    content: '',
    pagingStatus: initialPagingStatus,

    addSelectedValue: (group, value, isChecked) => {
      set((state) => {
        // 받아온 value값과 기존 value 값이 일치 (중복)한다면? 해당 값의 isChecked 상태를 바꿔줌.
        // 값이 일치하지 않다면? 그대로 유지 (체크 false 유지)
        const updatedValues = state.updatedValueList[group].data.map((item) =>
          item.value === value ? { ...item, isChecked } : item,
        );

        // 현재 selectedValues 안에 value와 중복된 값이 있으면 true, 그렇지 않으면 false 반환
        const isDuplicated = state.selectedValues.some((item) => item.value === value);
        // checked가 true이며, isDuplicated가 false일 경우 = true 반환(즉, 중복된거도 없고 checked도 true인 상태)
        const shouldAddToSelectedValues = isChecked && !isDuplicated;
        // 지금 현재 selectedValues 배열의 값과 들어온 값을 비교해서, 중복되지 않는 값만 새로운 배열에 담아 반환
        const filteredSelectedValues = state.selectedValues.filter((item) => item.value !== value);

        // 현재 searchParams 안에 value와 중복된 값이 있으면 true, 그렇지 않으면 false 반환
        const isSearchParamDuplicated = state.searchParams[group].some((item) => item === value);
        // 그냥 기존 배열에 새로운 value 추가
        const updatedSearchParams = [...state.searchParams[group], value];
        // value 값과 중복되는 값은 제외하고 나머지 값들만 배열로 반환
        const filteredSearchParams = updatedSearchParams.filter((item) => item !== value);

        return {
          updatedValueList: {
            ...state.updatedValueList,
            [group]: {
              group,
              data: updatedValues,
            },
          },
          // shouldAddToSelectedValues 가 true라면 새로 들어온 값을 추가한다.
          // false라면 필터링된 새로운 배열을 반환한다.
          selectedValues: shouldAddToSelectedValues
            ? [...state.selectedValues, { group, value, isChecked }]
            : filteredSelectedValues,

          // searchParam 업데이트
          searchParams: isSearchParamDuplicated
            ? { ...state.searchParams, [group]: filteredSearchParams }
            : { ...state.searchParams, [group]: updatedSearchParams },
        };
      });
    },
    // 선택된 값 배열에서 제거
    removeSelectedValue: (group, value) => {
      set((state) => {
        // 1. selectedValues map돌려서 selectedValues value값이랑 받아온 value값이랑 같은지 체크
        // 같으면 true 아니면 false 반환.
        const isValueExist = state.selectedValues.map((item) => item.value === value);

        // 2. 같다면 selectedValues에서 삭제
        const filterSelectedValue = state.selectedValues.filter((item) => item.value !== value);

        // 3.  initialValueList에서 group, value일치하는 부분 isChecked false로 해제시키자.
        const updatedValues = state.updatedValueList[group].data.map((item) =>
          item.value === value ? { ...item, isChecked: false } : item,
        );

        // 4. searchParams에서 group, value일치하는 부분 삭제
        const filterSearchParams = state.searchParams[group].filter((item) => item !== value);

        return {
          updatedValueList: {
            ...state.updatedValueList,
            [group]: {
              group,
              data: updatedValues,
            },
          },
          selectedValues: isValueExist ? filterSelectedValue : undefined,
          searchParams: {
            ...state.searchParams,
            [group]: filterSearchParams,
          },
        };
      });
    },

    // 선택된 값 모두 초기화
    clearSelectedValues: () => {
      set({
        updatedValueList: initialValueList,
        selectedValues: [],
        searchParams: initialSearchParams,
        isFree: false,
      });
    },

    // sorting 셀렉트 박스 value 값 변경하기
    changeSelectedSortingValue: (value: SortingValueType) => {
      set({ sorting: value });
    },

    // isFree 변경하기
    changeIsFree: (isChecked: boolean) => {
      set({ isFree: isChecked });
    },
    // 키워드 검색 용
    changeContent: (value: string) => {
      set({ content: value });
    },
    // 페이지 변경
    changePagingStatus: (page: number, size: number, totalItemCount: number) => {
      set((state) => ({
        ...state,
        pagingStatus: {
          page,
          size,
          totalItemCount,
        },
      }));
    },
  })),
);
