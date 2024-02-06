// ベースとなるクエリパラメータの型定義
export type BaseQueryParams = {
  page?: number
  category?: number
  tag?: string
}

// NicknameMemosQueryParamsはBaseQueryParamsにnicknameを追加
export type NicknameMemosQueryParams = BaseQueryParams & {
  nickname: string
}

// MemoQueryParamsはBaseQueryParamsをそのまま使用
export type MemoQueryParams = BaseQueryParams

// PropsはBaseQueryParamsを拡張し、preApiUrlを追加
export type UseMemoListProps = BaseQueryParams & {
  preApiUrl: string
}
