// メモのPOSTデータの型
export type MemoForm = {
  title: string
  body: string
  category_id: string
  status_id: string
}

// バリデーションメッセージの型
export type MemoFormValidation = {
  title?: string
  body?: string
  category_id?: string
  status_id?: string
}
