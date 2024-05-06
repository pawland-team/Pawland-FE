import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// 어차피 post 보낼때는 value값만 파라미터 추가되는거 아님..? 아 region=** 이렇게 가야하넹

export type SortingValueType = '최신순' | '조회순' | '인기순' | '낮은 가격순' | '높은 가격순';

export type CategoryItemList = {
  category: string;
  data: {
    label: string;
    value: string;
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
    product: CategoryItemList;
    giveAway: CategoryItemList;
  };
  /**
   * 변경된 group 값이 저장되는 곳
   */
  updatedValueList: {
    [index: string]: CategoryItemList;
    region: CategoryItemList;
    species: CategoryItemList;
    product: CategoryItemList;
    giveAway: CategoryItemList;
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
   * 선택된 값 배열에 추가 및 중복되는 값은 추가하지 않도록
   */
  addSelectedValue: (group: string, value: string, label: string, isChecked: boolean) => void;
  // addGiveAwayValue: (group: string, value: string, isChecked: boolean) => void;
  removeSelectedValue: (group: string, value: string) => void;
  changeSelectedSortingValue: (value: SortingValueType) => void;
}

const initialValueList = {
  region: {
    category: 'region',
    data: [
      { label: '서울', value: '서울', isChecked: false },
      { label: '대구', value: '대구', isChecked: false },
      { label: '인천', value: '인천', isChecked: false },
      { label: '광주', value: '광주', isChecked: false },
      { label: '대전', value: '대전', isChecked: false },
      { label: '울산', value: '울산', isChecked: false },
      { label: '세종', value: '세종', isChecked: false },
      { label: '경기', value: '경기', isChecked: false },
      { label: '강원', value: '강원', isChecked: false },
      { label: '충북', value: '충북', isChecked: false },
      { label: '충남', value: '충남', isChecked: false },
      { label: '전북', value: '전북', isChecked: false },
      { label: '전남', value: '전남', isChecked: false },
      { label: '경북', value: '경북', isChecked: false },
      { label: '경남', value: '경남', isChecked: false },
      { label: '제주', value: '제주', isChecked: false },
      { label: '해외', value: '해외', isChecked: false },
    ],
  },
  species: {
    category: 'species',
    data: [
      { label: 'dog', value: '강아지', isChecked: false },
      { label: 'cat', value: '고양이', isChecked: false },
      { label: 'etc', value: '그 외 동물', isChecked: false },
    ],
  },
  product: {
    category: 'product',
    data: [
      { label: 'food', value: '사료', isChecked: false },
      { label: 'toy', value: '장난감', isChecked: false },
      { label: 'clothes', value: '옷', isChecked: false },
      { label: 'accessory', value: '악세사리', isChecked: false },
      { label: 'etc', value: '그 외 상품', isChecked: false },
    ],
  },
  giveAway: {
    category: 'giveAway',
    data: [
      {
        label: 'free',
        value: '무료나눔',
        isChecked: false,
      },
    ],
  },
};

const initialSorting = '최신순';

// TODO: 중복되는 몇개의 코드들이 보이는데, 해당 코드는 리펙토링때 utils 함수로 해결봐보자.
export const useCheckedCategoryStore = create<CheckedCategoryState>()(
  devtools((set) => ({
    initialValueList,
    updatedValueList: initialValueList,
    selectedValues: [],
    sorting: initialSorting,

    addSelectedValue: (group, value, label, isChecked) => {
      set((state) => {
        const updatedValues = state.updatedValueList[group].data.map((item) =>
          item.value === value ? { ...item, isChecked } : item,
        );
        // 현재 selectedValues 안에 value와 중복된 값이 있으면 true, 그렇지 않으면 false 반환
        const isDuplicated = state.selectedValues.some((item) => item.value === value);
        // checked가 true이며, isDuplicated가 false일 경우 = true 반환(즉, 중복된거도 없고 checked도 true인 상태)
        const shouldAddToSelectedValues = isChecked && !isDuplicated;

        // 지금 현재 selectedValues 배열의 값과 들어온 값을 비교해서, 중복되지 않는 값만 새로운 배열에 담아 반환
        const filteredSelectedValues = state.selectedValues.filter((item) => item.value !== value);

        return {
          updatedValueList: {
            ...state.updatedValueList,
            [group]: {
              category: group,
              data: updatedValues,
            },
          },
          // shouldAddToSelectedValues 가 true라면 새로 들어온 값을 추가한다.
          // false라면 필터링된 새로운 배열을 반환한다.
          selectedValues: shouldAddToSelectedValues
            ? [...state.selectedValues, { group, value, label, isChecked }]
            : filteredSelectedValues,
        };
      });
    },
    // 선택된 값 배열에서 제거
    removeSelectedValue: (group, value) => {
      set((state) => {
        // 1. selectedValues map돌려서 selectedValues value값이랑 받아온 value값이랑 같은지 체크
        // 같으면 true 아니면 false 반환.
        const isValueExist = state.selectedValues.map((item) => item.value === value);

        // 2. 같다면 selectedValues에서 삭제 -> 여기까지는 문제 없이 해결 완료.
        const filterSelectedValue = state.selectedValues.filter((item) => item.value !== value);

        // 3.  initialValueList에서 group, value일치하는 부분 isChecked false로 해제시키자.
        const updatedValues = state.updatedValueList[group].data.map((item) =>
          item.value === value ? { ...item, isChecked: false } : item,
        );

        return {
          updatedValueList: {
            ...state.updatedValueList,
            [group]: {
              category: group,
              data: updatedValues,
            },
          },
          selectedValues: isValueExist ? filterSelectedValue : undefined,
        };
      });
    },

    // 선택된 값 모두 초기화
    clearSelectedValues: () => {
      set({ updatedValueList: initialValueList });
    },

    // sorting value 값 변경하기
    changeSelectedSortingValue: (value: SortingValueType) => {
      set({ sorting: value });
    },
  })),
);
