export const getPublicMemosListPageLink = (page: number, tag?: string) => {
  return tag ? `/memos/tag/${tag}/page/${page}` : `/memos/page/${page}`
}

export const getDashboardMemosListPageLink = (page: number, tag?: string) => {
  return tag ? `/dashboard/memos/tag/${tag}/page/${page}` : `/dashboard/memos/page/${page}`
}

export type getDashboardMemosListPageLinkType = (page: number, tag?: string) => string

export const getNicknameMemosListPageLink = (page: number, nickname: string, tag?: string) => {
  return tag ? `/${nickname}/memos/tag/${tag}/page/${page}` : `/${nickname}/memos/page/${page}`
}

export type getNicknameMemosListPageLinkType = (
  page: number,
  nickname: string,
  tag?: string,
) => string

// export const getNicknameMemosListPageLink = (nickname: string) => {
//   return (page: number, tag?: string) => {
//     return tag ? `/${nickname}/memos/tag/${tag}/page/${page}` : `/${nickname}/memos/page/${page}`
//   }
// }
