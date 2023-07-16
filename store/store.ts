import { create } from 'zustand'

type State = {
    menuOpen: boolean;
}
  
type Action = {
    setOpenMenu: (state: boolean) => void
}

// Create your store, which includes both state and (optionally) actions
export const useOpenMenuStore = create<State & Action>((set) => ({
    menuOpen: false,
    setOpenMenu: (state: boolean) => {
        set(() => ({ menuOpen: state }))
    },
}))