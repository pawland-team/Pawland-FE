import { create } from 'zustand';

interface CheckedCategoryState {
  selectedValues: string[];
  addSelectedValue: (value: string) => void;
  removeSelectedValue: (value: string) => void;
}

export const useCheckedCategoryStore = create<CheckedCategoryState>((set) => ({
  // 선택된 값이 저장되는 배열
  selectedValues: [],

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
}));
