export const getPublicMemosListByCategoryHeadLineTitle = (categoryNumber: number) => {
  switch (categoryNumber) {
    case 1:
      return 'フォアハンドの公開中メモ一覧'
    case 2:
      return 'バックハンドの公開中メモ一覧'
    default:
      return '公開中メモ一覧'
  }
}
