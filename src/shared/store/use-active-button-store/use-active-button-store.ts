import { create, SetState } from 'zustand';

interface ActiveButtonState {
  activeButton: string;
  setActiveButton: (buttonName: string) => void;
}

export const useActiveButtonStore = create(
  (set: SetState<ActiveButtonState>): ActiveButtonState => ({
    activeButton: 'register',
    setActiveButton: (buttonName) => set({ activeButton: buttonName }),
  }),
);
