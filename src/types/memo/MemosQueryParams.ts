// ベースとなるクエリパラメータの型定義
export type BaseQueryParams = {
  page?: number
  category?: number
  tag?: string
}

// NicknameMemosQueryParamsはBaseQueryParamsにnicknameを追加
export type NicknameMemosQueryParams = {
  page: number // pageを必須とする
  nickname: string
  category?: number
  tag?: string
}

// MemoQueryParamsはBaseQueryParamsをそのまま使用
export type MemoQueryParams = {
  page: number // pageを必須とする
  category?: number
  tag?: string
}

// UseMemoListHookPropsでpageを必須とする
export type UseMemoListHookProps = {
  page: number // pageを必須とする
  preApiUrl: string
  category?: number
  tag?: string
}

export type UseMemoListHookPropsWithoutPreApiUrl = Omit<UseMemoListHookProps, 'preApiUrl'>

export type DashboardMemoQueryParams = {
  page: number // pageを必須とする
  preApiUrl?: string // preApiUrlを任意とする
  category?: number
  tag?: string
}

export type MemoListsPaginationProps = UseMemoListHookProps
