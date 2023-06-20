export const getPublicMemosListPageLink = (page: number, tag?: string) => {
  return tag ? `/memos/tag/${tag}/page/${page}` : `/memos/page/${page}`
}

export const getDashboardMemosListPageLink = (tag: string, page: number) => {
  return tag ? `/dashboard/memos/tag/${tag}/page/${page}` : `/dashboard/memos/page/${page}`
}

export const getNicknameMemosListPageLink = (nickname: string, tag: string, page: number) => {
  return tag ? `/${nickname}/memos/tag/${tag}/page/${page}` : `/${nickname}/memos/page/${page}`
}
