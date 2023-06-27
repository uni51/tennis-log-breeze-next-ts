export type RenderPagerLinkFuncType = getMemosListPageLinkType | getMemosListByCategoryPageLinkType

export const getRenderPagerLinkUrl = (
  renderPagerLinkFunc: RenderPagerLinkFuncType,
  baseUrl: string,
  pageNumber: number,
  category?: number,
) => {
  switch (renderPagerLinkFunc) {
    case getMemosListPageLink:
      return getMemosListPageLink(baseUrl, pageNumber)
    case getMemosListByCategoryPageLink:
      return getMemosListByCategoryPageLink(baseUrl, pageNumber, category!)
    default:
      return '/memos/'
  }
}

// See: https://kiyobl.com/nextjs-routing/#toc4
export const getMemosListPageLink = (baseUrl: string, page: number) => {
  return { pathname: baseUrl, query: { page: `${page}` } }
}

export type getMemosListPageLinkType = (
  baseUrl: string,
  page: number,
) => {
  pathname: string
  query: { page: string }
}

export const getMemosListByCategoryPageLink = (baseUrl: string, page: number, category: number) => {
  return { pathname: baseUrl, query: { category: `${category}`, page: `${page}` } }
}

export type getMemosListByCategoryPageLinkType = (
  baseUrl: string,
  page: number,
  category: number,
) => {
  pathname: string
  query: { category: string; page: string }
}
