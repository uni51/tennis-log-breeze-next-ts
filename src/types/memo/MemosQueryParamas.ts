// ベースとなるクエリパラメータの型定義
export type BaseQueryParams = {
  page?: number
  category?: number
  tag?: string
}

// BaseQueryParamsからpageプロパティを除外
type BaseQueryParamsWithoutPage = Omit<BaseQueryParams, 'page'>

// NicknameMemosQueryParamsはBaseQueryParamsにnicknameを追加
export type NicknameMemosQueryParams = BaseQueryParamsWithoutPage & {
  page: number // pageを必須とする
  nickname: string
}

// MemoQueryParamsはBaseQueryParamsをそのまま使用
export type MemoQueryParams = BaseQueryParamsWithoutPage & {
  page: number // pageを必須とする
}

// UseMemoListHookPropsでpageを必須とする
export type UseMemoListHookProps = BaseQueryParamsWithoutPage & {
  page: number // pageを必須とする
  preApiUrl: string
}

export type MemoListsPaginationProps = UseMemoListHookProps
