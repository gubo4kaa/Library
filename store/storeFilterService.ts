import { create } from 'zustand'

type IFilterService = {
    filterService: IServiceInterface[];
}
  
type Action = {
    setFilterService: (state: IServiceInterface[]) => void
}

// Create your store, which includes both state and (optionally) actions
export const storeFilterService = create<IFilterService & Action>((set) => ({
    filterService: [],
    setFilterService: (state: IServiceInterface[]) => {
        set(() => ({ filterService: state }))
    },
}))

