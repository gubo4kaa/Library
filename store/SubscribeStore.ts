import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";

type popapState = {
  popapState: null | "subscribe" | "addForm" | "report" | "search";
};

type Action = {
  setPopapState: (
    state: null | "subscribe" | "addForm" | "report" | "search",
  ) => void;
};

// Create your store, which includes both state and (optionally) actions
export const useSubscribeStore = createWithEqualityFn<popapState & Action>(
  (set) => ({
    popapState: null,
    setPopapState: (
      state: null | "subscribe" | "addForm" | "report" | "search",
    ) => {
      set(() => ({ popapState: state }));
    },
  }),
  shallow,
);
