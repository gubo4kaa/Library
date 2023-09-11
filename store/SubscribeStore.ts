import { create } from 'zustand';

type SubscribeState = {
    subscribeState: boolean;
}
  
type Action = {
    setSubscribeState: (state: boolean) => void
}

// Create your store, which includes both state and (optionally) actions
export const useSubscribeStore = create<SubscribeState & Action>((set) => ({
    subscribeState: false,
    setSubscribeState: (state: boolean) => {
        set(() => ({ subscribeState: state }))
    },
}))

