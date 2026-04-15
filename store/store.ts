import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";

type StateMenu = {
  menuOpen: boolean;
};

type Action = {
  setOpenMenu: (state: boolean) => void;
};

// Create your store, which includes both state and (optionally) actions
export const useOpenMenuStore = createWithEqualityFn<StateMenu & Action>(
  (set) => ({
    menuOpen: false,
    setOpenMenu: (state: boolean) => {
      set(() => ({ menuOpen: state }));
    },
  }),
  shallow,
);
