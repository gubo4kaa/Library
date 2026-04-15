import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";

type IFilterService = {
  filterService: IServiceInterface[] | null;
};

type Action = {
  setFilterService: (state: IServiceInterface[] | null) => void;
};

// Create your store, which includes both state and (optionally) actions
export const storeFilterService = createWithEqualityFn<IFilterService & Action>(
  (set) => ({
    filterService: [],
    setFilterService: (state: IServiceInterface[] | null) => {
      set(() => ({ filterService: state }));
    },
  }),
  shallow,
);
