type PagerLink = { pathname: string; query: Record<string, string> }

export type RenderPagerLinkFuncType = (
  baseUrl: string,
  page: number,
  category?: number | null,
  tag?: string | null,
) => PagerLink

export const getRenderPagerLinkUrl = (
  renderPagerLinkFunc: RenderPagerLinkFuncType,
  baseUrl: string,
  pageNumber: number,
  category?: number | null,
  tag?: string | null,
): PagerLink =>
  renderPagerLinkFunc(baseUrl, pageNumber, category, tag) || { pathname: '/memos/', query: {} }

export const getMemosListByCategoryPageLink: RenderPagerLinkFuncType = (
  baseUrl,
  page,
  category,
  tag,
): PagerLink => ({
  pathname: baseUrl,
  query: {
    ...(category && { category: `${category}` }),
    ...(tag && { tag }),
    page: `${page}`,
  },
})

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
    apiUrl = `${preApiUrl}/category/${categoryNumber}${tag ? `/tag/${tag}` : ''}?page=${pageIndex}`
  } else if (tag) {
    apiUrl = `${preApiUrl}/tag/${tag}?page=${pageIndex}`
  }

  return apiUrl
}
