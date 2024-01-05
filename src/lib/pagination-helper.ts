type PagerLink = { pathname: string; query: Record<string, string> }

export type RenderPagerLinkFuncType = (
  baseUrl: string,
  page: number,
  category?: number | null,
) => PagerLink

export const getRenderPagerLinkUrl = (
  renderPagerLinkFunc: RenderPagerLinkFuncType,
  baseUrl: string,
  pageNumber: number,
  category?: number | null,
): PagerLink => {
  return renderPagerLinkFunc(baseUrl, pageNumber, category) || { pathname: '/memos/', query: {} }
}

export const getMemosListByCategoryPageLink: RenderPagerLinkFuncType = (
  baseUrl,
  page,
  category,
): PagerLink => {
  return {
    pathname: baseUrl,
    query: category ? { category: `${category}`, page: `${page}` } : { page: `${page}` },
  }
}

export type MemoListsPaginationProps = {
  preApiUrl: string
  pageIndex: number
  categoryNumber: number | null
  tag: string | null
}

export const getMemoListApiUrl = ({
  preApiUrl,
  pageIndex,
  categoryNumber,
  tag,
}: MemoListsPaginationProps): string => {
  let apiUrl = `${preApiUrl}?page=${pageIndex}` // デフォルトのAPI URL

  if (categoryNumber) {
    if (tag) {
      apiUrl = `${preApiUrl}/category/${categoryNumber}/tag/${tag}?page=${pageIndex}`
    } else {
      apiUrl = `${preApiUrl}/category/${categoryNumber}?page=${pageIndex}`
    }
  } else if (tag) {
    apiUrl = `${preApiUrl}/tag/${tag}?page=${pageIndex}`
  }

  return apiUrl
}
