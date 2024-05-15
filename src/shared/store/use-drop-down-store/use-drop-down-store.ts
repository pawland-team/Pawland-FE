import create from 'zustand';

interface DropdownStore {
  selectedMenu: string;
  setSelectedMenu: (menu: string) => void;
}

export const useDropdownStore = create<DropdownStore>((set) => ({
  selectedMenu: '전체보기',
  setSelectedMenu: (menu: string) => set({ selectedMenu: menu }),
}));
