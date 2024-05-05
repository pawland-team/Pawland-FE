import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// 어차피 post 보낼때는 value값만 파라미터 추가되는거 아님..? 아 region=** 이렇게 가야하넹

export type CategoryItemList = {
  category: string;
  data: {
    value: string;
    isChecked: boolean;
  }[];
};

export interface CheckedCategoryState {
  /**
   * region/species/상품별 한꺼번에 관리
   */
  initialValueList: {
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
  sorting: '최신순' | '조회순' | '인기순' | '낮은 가격순' | '높은 가격순';

  /**
   * 선택된 값 배열에 추가 및 중복되는 값은 추가하지 않도록
   */
  addSelectedValue: (group: string, value: string, isChecked: boolean) => void;
  // addGiveAwayValue: (group: string, value: string, isChecked: boolean) => void;
  removeSelectedValue: (group: string, value: string) => void;
}

const initialValueList = {
  region: {
    category: 'region',
    data: [
      { value: '서울', isChecked: false },
      { value: '대구', isChecked: false },
      { value: '인천', isChecked: false },
      { value: '광주', isChecked: false },
      { value: '대전', isChecked: false },
      { value: '울산', isChecked: false },
      { value: '세종', isChecked: false },
      { value: '경기', isChecked: false },
      { value: '강원', isChecked: false },
      { value: '충북', isChecked: false },
      { value: '충남', isChecked: false },
      { value: '전북', isChecked: false },
      { value: '전남', isChecked: false },
      { value: '경북', isChecked: false },
      { value: '경남', isChecked: false },
      { value: '제주', isChecked: false },
      { value: '해외', isChecked: false },
    ],
  },
  species: {
    category: 'species',
    data: [
      { value: '강아지', isChecked: false },
      { value: '고양이', isChecked: false },
      { value: '그 외 동물', isChecked: false },
    ],
  },
  product: {
    category: 'product',
    data: [
      { value: '사료', isChecked: false },
      { value: '장난감', isChecked: false },
      { value: '옷', isChecked: false },
      { value: '악세사리', isChecked: false },
      { value: '그 외 상품', isChecked: false },
    ],
  },
  giveAway: {
    category: 'giveAway',
    data: [
      {
        value: '무료나눔',
        isChecked: false,
      },
    ],
  },
};

const initialSorting = '최신순';

export const useCheckedCategoryStore = create<CheckedCategoryState>()(
  devtools((set) => ({
    initialValueList,
    selectedValues: [],
    sorting: initialSorting,

    addSelectedValue: (group, value, isChecked) => {
      set((state) => {
        const updatedValues = state.initialValueList[group].data.map((item) =>
          item.value === value ? { ...item, isChecked } : item,
        );
        // 현재 selectedValues 안에 value와 중복된 값이 있으면 true, 그렇지 않으면 false 반환
        const isDuplicated = state.selectedValues.some((item) => item.value === value);
        // checked가 true이며, isDuplicated가 false일 경우 = true 반환(즉, 중복된거도 없고 checked도 true인 상태)
        const shouldAddToSelectedValues = isChecked && !isDuplicated;

        // 지금 현재 selectedValues 배열의 값과 들어온 값을 비교해서, 중복되지 않는 값만 새로운 배열에 담아 반환
        const filteredSelectedValues = state.selectedValues.filter((item) => item.value !== value);

        return {
          initialValueList: {
            ...state.initialValueList,
            [group]: {
              category: group,
              data: updatedValues,
            },
          },
          // shouldAddToSelectedValues 가 true라면 새로 들어온 값을 추가한다.
          // false라면 필터링된 새로운 배열을 반환한다.
          selectedValues: shouldAddToSelectedValues
            ? [...state.selectedValues, { group, value, isChecked }]
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

        // TODO: 3.  initialValueList에서 group, value일치하는 부분 isChecked false로 해제시키자. (이.제.진.짜.된.다.)
        const updatedValues = state.initialValueList[group].data.map((item) =>
          item.value === value ? { ...item, isChecked: false } : item,
        );

        return {
          initialValueList: {
            ...state.initialValueList,
            [group]: {
              category: group,
              data: updatedValues,
            },
          },
          selectedValues: isValueExist ? filterSelectedValue : null,
        };
      });
    },

    // 선택된 값 모두 초기화
    clearSelectedValues: () => set({ initialValueList }),
  })),
);
