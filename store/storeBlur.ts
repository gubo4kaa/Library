import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";

type StateBlur = {
  blur: boolean;
};

type Action = {
  setBlur: (state: boolean) => void;
};

// Create your store, which includes both state and (optionally) actions
export const useBlurStore = createWithEqualityFn<StateBlur & Action>(
  (set) => ({
    blur: false,
    setBlur: (state: boolean) => {
      set(() => ({ blur: state }));
    },
  }),
  shallow,
);
