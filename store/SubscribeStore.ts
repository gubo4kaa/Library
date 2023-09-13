import { create } from 'zustand';

type popapState = {
    popapState: null | 'subscribe' | 'addForm'
}
  
type Action = {
    setPopapState: (state: null | 'subscribe' | 'addForm') => void
}

// Create your store, which includes both state and (optionally) actions
export const useSubscribeStore = create<popapState & Action>((set) => ({
    popapState: null,
    setPopapState: (state: null | 'subscribe' | 'addForm') => {
        set(() => ({ popapState: state }))
    },
}))

