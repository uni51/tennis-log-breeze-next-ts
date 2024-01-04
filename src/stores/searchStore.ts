import { create, SetState } from 'zustand'
import { MemoListReturnType } from '@/types/memoList'

// インターフェースの定義
interface SearchStore {
  responseData: MemoListReturnType | null
  setSearchData: (data: any) => void // setSearchDataメソッドの引数と戻り値の型を適切なものに変更してください
  clearSearchData: () => void
}

// Zustandのストアを作成
const useSearchStore = create<SearchStore>((set) => ({
  responseData: null,
  setSearchData: (data) => set((state) => ({ ...state, responseData: data })),
  clearSearchData: () => set((state) => ({ ...state, responseData: null })),
}))

export default useSearchStore
