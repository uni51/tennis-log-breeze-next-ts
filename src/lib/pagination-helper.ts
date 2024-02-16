import { MemoListsPaginationProps } from '@/types/memo/MemosQueryParams'

// 共通の型定義ファイルなどに移動
export type PagerLink = { pathname: string; query: Record<string, string> }

// 共通のクエリパラメータ生成関数
const createQueryParams = (
  page: number,
  category?: number,
  tag?: string,
  q?: string,
): Record<string, string> => ({
  ...(category && { category: `${category}` }),
  ...(tag && { tag }),
  ...(q && { q }),
  page: `${page}`,
})

export type RenderPagerLinkFuncType = (
  baseUrl: string,
  page: number,
  category?: number,
  tag?: string,
) => PagerLink

export const createPagerLink: RenderPagerLinkFuncType = (
  baseUrl,
  page,
  category,
  tag,
): PagerLink => ({
  pathname: baseUrl,
  query: createQueryParams(page, category, tag),
})

export const getMemoListApiUrl = ({
  preApiUrl,
  page,
  category,
  tag,
  keyword,
}: MemoListsPaginationProps): string => {
  const queryParams = createQueryParams(page, category, tag, keyword)
  let apiUrl = `${preApiUrl}?${new URLSearchParams(queryParams).toString()}`

  if (category) {
    apiUrl = `${preApiUrl}/category/${category}${tag ? `/tag/${tag}` : ''}?page=${page}`
  } else if (tag) {
    apiUrl = `${preApiUrl}/tag/${tag}?page=${page}`
  } else if (keyword) {
    apiUrl = `${preApiUrl}/search?q=${keyword}&page=${page}`
  }

  return apiUrl
}
