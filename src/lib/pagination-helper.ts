export type RenderPagerLinkFcType =
  | getPublicMemosListPageLinkType
  | getPublicMemosListByCategoryPageLinkType
  | getNicknameMemosListPageLinkType
  | getNicknameMemosListByCategoryPageLinkType
  | getDashboardMemosListPageLinkType
  | getDashboardMemosListByCategoryPageLinkType

export const getRenderPagerLinkUrl = (
  renderPagerLinkFc: RenderPagerLinkFcType,
  baseUrl: string,
  pageNumber: number,
  category?: number,
) => {
  switch (renderPagerLinkFc) {
    case getPublicMemosListPageLink:
      return getPublicMemosListPageLink(baseUrl, pageNumber)
    case getPublicMemosListByCategoryPageLink:
      return getPublicMemosListByCategoryPageLink(baseUrl, pageNumber, category!)
    case getNicknameMemosListPageLink:
      return getNicknameMemosListPageLink(baseUrl, pageNumber)
    case getNicknameMemosListByCategoryPageLink:
      return getNicknameMemosListByCategoryPageLink(baseUrl, pageNumber, category!)
    case getDashboardMemosListPageLink:
      return getDashboardMemosListPageLink(baseUrl, pageNumber)
    case getDashboardMemosListByCategoryPageLink:
      return getDashboardMemosListByCategoryPageLink(baseUrl, pageNumber, category!)
    default:
      return '/memos/'
  }
}

// See: https://kiyobl.com/nextjs-routing/#toc4
export const getPublicMemosListPageLink = (baseUrl: string, page: number) => {
  return { pathname: baseUrl, query: { page: `${page}` } }
}

export type getPublicMemosListPageLinkType = (
  baseUrl: string,
  page: number,
) => {
  pathname: string
  query: { page: string }
}

export const getPublicMemosListByCategoryPageLink = (
  baseUrl: string,
  page: number,
  category: number,
) => {
  return { pathname: baseUrl, query: { category: `${category}`, page: `${page}` } }
}

export type getPublicMemosListByCategoryPageLinkType = (
  baseUrl: string,
  page: number,
  category: number,
) => {
  pathname: string
  query: { category: string; page: string }
}

export const getNicknameMemosListPageLink = (baseUrl: string, page: number) => {
  return { pathname: baseUrl, query: { page: `${page}` } }
}

export type getNicknameMemosListPageLinkType = (
  baseUrl: string,
  page: number,
) => {
  pathname: string
  query: { page: string }
}

export const getNicknameMemosListByCategoryPageLink = (
  baseUrl: string,
  page: number,
  category: number,
) => {
  return { pathname: baseUrl, query: { category: `${category}`, page: `${page}` } }
}

export type getNicknameMemosListByCategoryPageLinkType = (
  baseUrl: string,
  page: number,
  category: number,
) => {
  pathname: string
  query: { category: string; page: string }
}

export const getDashboardMemosListPageLink = (baseUrl: string, page: number) => {
  return { pathname: baseUrl, query: { page: `${page}` } }
}

export type getDashboardMemosListPageLinkType = (
  page: number,
) => {
  pathname: string
  query: { page: string }
}

export const getDashboardMemosListByCategoryPageLink = (
  baseUrl: string,
  page: number,
  category: number,
) => {
  return { pathname: baseUrl, query: { category: `${category}`, page: `${page}` } }
}

export type getDashboardMemosListByCategoryPageLinkType = (
  baseUrl: string,
  page: number,
  category: number,
) => {
  pathname: string
  query: { category: string; page: string }
}
