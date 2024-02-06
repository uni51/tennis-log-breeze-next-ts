type PagerLink = { pathname: string; query: Record<string, string> }

export type RenderPagerLinkFuncType = (
  baseUrl: string,
  pageNumber?: number,
  categoryId?: number,
  tag?: string,
) => PagerLink

export const getRenderPagerLinkUrl = (
  renderPagerLinkFunc: RenderPagerLinkFuncType,
  baseUrl: string,
  pageNumber?: number,
  category?: number,
  tag?: string,
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
  pageNumber?: number
  categoryId?: number
  tag?: string
}

export const getMemoListApiUrl = ({
  preApiUrl,
  pageNumber,
  categoryId,
  tag,
}: MemoListsPaginationProps): string => {
  let apiUrl = `${preApiUrl}?page=${pageNumber}` // デフォルトのAPI URL

  if (categoryId) {
    apiUrl = `${preApiUrl}/category/${categoryId}${tag ? `/tag/${tag}` : ''}?page=${pageNumber}`
  } else if (tag) {
    apiUrl = `${preApiUrl}/tag/${tag}?page=${pageNumber}`
  }

  return apiUrl
}
