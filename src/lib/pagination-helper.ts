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

export const getNicknameMemosListPageLink = (nickname: string, page: number) => {
  return { pathname: `/${nickname}/memos/`, query: { page: `${page}` } }
}

export type getNicknameMemosListPageLinkType = (
  nickname: string,
  page: number,
) => {
  pathname: string
  query: { page: string }
}

export const getNicknameMemosListByCategoryPageLink = (
  nickname: string,
  category: number,
  page: number,
) => {
  return { pathname: `/${nickname}/memos/`, query: { category: `${category}`, page: `${page}` } }
}

export type getNicknameMemosListByCategoryPageLinkType = (
  nickname: string,
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
