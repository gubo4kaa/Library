import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";

type StateCopy = {
  copyState: boolean;
};

type Action = {
  setCopyState: (state: boolean) => void;
};

// Create your store, which includes both state and (optionally) actions
export const useStateCopy = createWithEqualityFn<StateCopy & Action>(
  (set) => ({
    copyState: false,
    setCopyState: (state: boolean) => {
      set(() => ({ copyState: state }));
    },
  }),
  shallow,
);
