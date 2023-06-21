export const getPublicMemosListPageLink = (page: number, tag?: string) => {
  return tag ? `/memos/tag/${tag}/page/${page}` : `/memos/page/${page}`
}

export const getDashboardMemosListPageLink = (page: number, tag?: string) => {
  return tag ? `/dashboard/memos/tag/${tag}/page/${page}` : `/dashboard/memos/page/${page}`
}

export const getNicknameMemosListPageLink = (page: number, nickname: string, tag?: string) => {
  return tag ? `/${nickname}/memos/tag/${tag}/page/${page}` : `/${nickname}/memos/page/${page}`
}
