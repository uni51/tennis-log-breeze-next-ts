export type RenderPagerLinkFuncType = getMemosListPageLinkType | getMemosListByCategoryPageLinkType
// export type RenderPagerLinkFuncType = getMemosListByCategoryPageLinkType

export const getRenderPagerLinkUrl = (
  renderPagerLinkFunc: RenderPagerLinkFuncType,
  baseUrl: string,
  pageNumber: number,
  category?: number | null,
) => {
  switch (renderPagerLinkFunc) {
    // case getMemosListPageLink:
    //   return getMemosListPageLink(baseUrl, pageNumber)
    case getMemosListByCategoryPageLink:
      return getMemosListByCategoryPageLink(baseUrl, pageNumber, category!)
    default:
      return '/memos/'
  }
}

// TODO：最終的に削除
// See: https://kiyobl.com/nextjs-routing/#toc4
export const getMemosListPageLink = (baseUrl: string, page: number) => {
  return { pathname: baseUrl, query: { page: `${page}` } }
}

// TODO：最終的に削除
export type getMemosListPageLinkType = (
  baseUrl: string,
  page: number,
) => {
  pathname: string
  query: { page: string }
}

// See: https://kiyobl.com/nextjs-routing/#toc4
export const getMemosListByCategoryPageLink = (
  baseUrl: string,
  page: number,
  category?: number,
) => {
  return category
    ? { pathname: baseUrl, query: { category: `${category}`, page: `${page}` } }
    : { pathname: baseUrl, query: { page: `${page}` } }
}

export type getMemosListByCategoryPageLinkType = (
  baseUrl: string,
  page: number,
  category?: number,
) => {
  pathname: string
  query: { category?: string; page: string }
}

export type MemoListsPaginationProps = {
  preApiUrl: string
  pageIndex: number
  categoryNumber: number | null
}

export const getMemoListApiUrl = ({
  preApiUrl,
  pageIndex,
  categoryNumber,
}: MemoListsPaginationProps) => {
  const apiUrl = categoryNumber
    ? preApiUrl + `/category/${categoryNumber}?page=${pageIndex}`
    : preApiUrl + `?page=${pageIndex}`

  return apiUrl
}
