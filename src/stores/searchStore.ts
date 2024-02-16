import { create } from 'zustand'

// インターフェースの定義
interface SearchStore {
  keyword?: string
  setKeywordData: (data: any) => void // setKeywordDataメソッドの引数と戻り値の型を適切なものに変更してください
  clearKeyword: () => void
}

// Zustandのストアを作成
const useSearchStore = create<SearchStore>((set) => ({
  keyword: undefined,
  setKeywordData: (data) => set((state) => ({ ...state, keyword: data })),
  clearKeyword: () => set((state) => ({ ...state, keyword: undefined })),
}))

export default useSearchStore
