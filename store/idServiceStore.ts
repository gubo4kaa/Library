import { create } from 'zustand';

type Report = {
    reportPopapState: boolean
}
  
type Action = {
    setReportPopapState: (state: boolean) => void
}

// Create your store, which includes both state and (optionally) actions
export const useReportStore = create<Report & Action>((set) => ({
    reportPopapState: false,
    setReportPopapState: (state: boolean) => {
        set(() => ({ reportPopapState: state }))
    },
}))

