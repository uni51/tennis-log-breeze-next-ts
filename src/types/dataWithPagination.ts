export type DataWithPagination<T> = {
  data: T //　本体データの型をジェネリックスで渡す
  // 以下はページネーションを実装するのに必要な情報たち
  links: {
    first: string
    last: string
    prev: string
    next: string
  }
  meta: {
    current_page: number
    last_page: number
    path: string // apiのpath(http://example.com/api/postなど)
    per_page: number
    from: number // 何番目のデータから始まるか
    to: number // 何番目のデータまでか
    total: number
    links: {
      url: string
      label: string
      active: boolean
    }[]
  }
}
