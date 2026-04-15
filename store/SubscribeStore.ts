import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";

type popapState = {
  popapState: null | "subscribe" | "addForm" | "report";
};

type Action = {
  setPopapState: (state: null | "subscribe" | "addForm" | "report") => void;
};

// Create your store, which includes both state and (optionally) actions
export const useSubscribeStore = createWithEqualityFn<popapState & Action>(
  (set) => ({
    popapState: null,
    setPopapState: (state: null | "subscribe" | "addForm" | "report") => {
      set(() => ({ popapState: state }));
    },
  }),
  shallow,
);
