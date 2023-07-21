import { create } from 'zustand'

type StateBlur = {
    blur: boolean;
}
  
type Action = {
    setBlur: (state: boolean) => void
}

// Create your store, which includes both state and (optionally) actions
export const useBlurStore = create<StateBlur & Action>((set) => ({
    blur: false,
    setBlur: (state: boolean) => {
        set(() => ({ blur: state }))
    },
}))

