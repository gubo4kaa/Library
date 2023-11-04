import { create } from 'zustand';

type popapState = {
    popapState: null | 'subscribe' | 'addForm' | 'report'
}
  
type Action = {
    setPopapState: (state: null | 'subscribe' | 'addForm' | 'report') => void
}

// Create your store, which includes both state and (optionally) actions
export const useSubscribeStore = create<popapState & Action>((set) => ({
    popapState: null,
    setPopapState: (state: null | 'subscribe' | 'addForm' | 'report') => {
        set(() => ({ popapState: state }))
    },
}))

