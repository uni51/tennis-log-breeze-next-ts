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

export const getPublicMemosListByCategoryPageLink = (page: number, category: number) => {
  return { pathname: '/memos/', query: { category: `${category}`, page: `${page}` } }
}

export type getPublicMemosListByCategoryPageLinkType = (
  page: number,
  category: number,
) => {
  pathname: string
  query: { category: string; page: string }
}

export const getNicknameMemosListPageLink = (page: number, nickname: string) => {
  return { pathname: `/${nickname}/memos/`, query: { page: `${page}` } }
}

export type getNicknameMemosListPageLinkType = (
  page: number,
  nickname: string,
) => {
  pathname: string
  query: { page: string }
}

export const getNicknameMemosListByCategoryPageLink = (
  page: number,
  nickname: string,
  category: number,
) => {
  return { pathname: `/${nickname}/memos/`, query: { category: `${category}`, page: `${page}` } }
}

export type getNicknameMemosListByCategoryPageLinkType = (
  page: number,
  nickname: string,
  category: number,
) => {
  pathname: string
  query: { category: string; page: string }
}

export const getDashboardMemosListPageLink = (page: number, tag?: string) => {
  return tag ? `/dashboard/memos/tag/${tag}/page/${page}` : `/dashboard/memos/page/${page}`
}

export type getDashboardMemosListPageLinkType = (page: number, tag?: string) => string
