import { create, SetState } from 'zustand';

interface ActiveMenuState {
  activeMenu: string;
  setActiveMenu: (menuName: string) => void;
}

export const useActiveMenuStore = create(
  (set: SetState<ActiveMenuState>): ActiveMenuState => ({
    activeMenu: 'buy',
    setActiveMenu: (menuName) => set({ activeMenu: menuName }),
  }),
);
