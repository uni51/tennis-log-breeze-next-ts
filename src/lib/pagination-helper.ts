// See: https://kiyobl.com/nextjs-routing/#toc4
export const getPublicMemosListPageLink = (page: number) => {
  return { pathname: '/memos/', query: { page: `${page}` } }
}

export type getPublicMemosListPageLinkType = (
  page: number,
) => {
  pathname: string
  query: { page: string }
}

export const getPublicMemosListByCategoryPageLink = (category: number, page: number) => {
  return { pathname: '/memos/', query: { category: `${category}`, page: `${page}` } }
}

export type getPublicMemosListByCategoryPageLinkType = (
  category: number,
  page: number,
) => {
  pathname: string
  query: { category: string; page: string }
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
