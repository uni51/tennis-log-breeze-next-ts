export const getPublicMemosListPageLink = (tag: string, page: number) => {
  return tag ? `/memos/tag/${tag}/page/${page}` : `/memos/page/${page}`
}

export const getDashboardMemosListPageLink = (tag: string, page: number) => {
  return tag ? `/dashboard/memos/tag/${tag}/page/${page}` : `/dashboard/memos/page/${page}`
}
