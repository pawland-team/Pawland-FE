import create from 'zustand';

interface RatingState {
  selectedRating: number;
  setSelectedRating: (rating: number) => void;
}

export const useRatingStore = create<RatingState>((set) => ({
  selectedRating: 0,
  setSelectedRating: (rating) => set({ selectedRating: rating }),
}));
