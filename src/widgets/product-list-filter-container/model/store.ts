import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface CheckedCategoryState {
  // TODO: 지역별/동물별/상품별/무료나눔/소팅(최신순...) 다 한꺼번에 관리
  selectedValues: string[];
  selectedDropDownValue: '최신순' | '조회순' | '인기순' | '낮은 가격순' | '높은 가격순';
  addSelectedValue: (value: string) => void;
  removeSelectedValue: (value: string) => void;
}

export const useCheckedCategoryStore = create<CheckedCategoryState>()(
  devtools((set) => ({
    // 선택된 값이 저장되는 배열 checkbox 선택만 저장됨
    selectedValues: [],
    selectedDropDownValue: '최신순',

    // 선택된 값 배열에 추가
    // addSelectedValue: (value) => set((state) => ({ selectedValues: [...state.selectedValues, value] })),

    // 중복 value 선택 막기
    addSelectedValue: (value) =>
      set((state) => ({
        selectedValues: state.selectedValues.includes(value) ? state.selectedValues : [...state.selectedValues, value],
      })),

    // 선택된 값 배열에서 제거
    removeSelectedValue: (value) =>
      set((state) => ({
        selectedValues: state.selectedValues.filter((val) => val !== value),
      })),

    // 선택된 값 모두 초기화
    clearSelectedValues: () => set({ selectedValues: [] }),
  })),
);
