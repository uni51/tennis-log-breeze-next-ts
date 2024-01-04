import { create } from 'zustand'

// Zustandのストアを作成
const useSearchStore = create((set) => ({
  responseData: null,
  setSearchData: (data) => set({ responseData: data }),
  clearSearchData: () => set({ searchData: null }),
}))

export default useSearchStore
