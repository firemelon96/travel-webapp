import { create } from 'zustand';

type NewTourState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useNewTour = create<NewTourState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
