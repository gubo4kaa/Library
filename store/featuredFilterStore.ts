import { create } from "zustand";

type IFeaturedFilter = {
  featuredFilter: boolean;
};

type Action = {
  setFeaturedFilter: (state: boolean) => void;
};

// Create your store, which includes both state and (optionally) actions
export const FeaturedFilter = create<IFeaturedFilter & Action>((set) => ({
  featuredFilter: false,
  setFeaturedFilter: (state: boolean) => {
    set(() => ({ featuredFilter: state }));
  },
}));
