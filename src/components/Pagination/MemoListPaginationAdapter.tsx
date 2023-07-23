import MemoListPaginationLong from '@/components/Pagination/MemoListPaginationLong'
import {
  getMemosListPageLink,
  getMemosListPageLinkType,
  getMemosListByCategoryPageLinkType,
  getMemosListByCategoryPageLink,
} from '@/lib/pagination-helper'

export type PaginationProps = {
  baseUrl: string
  totalItems: number
  currentPage: number
  renderPagerLinkFunc: getMemosListPageLinkType | getMemosListByCategoryPageLinkType
  category?: number | null
}

const MemoListPaginationAdapter = ({
  baseUrl,
  totalItems,
  currentPage,
  renderPagerLinkFunc,
  category,
}: PaginationProps) => {
  // メモ一覧ページで、カテゴリーでの絞り込みが行われている場合
  if (renderPagerLinkFunc === getMemosListByCategoryPageLink && category) {
    return (
      <MemoListPaginationLong
        baseUrl={baseUrl}
        totalItems={totalItems}
        currentPage={currentPage}
        renderPagerLinkFunc={getMemosListByCategoryPageLink}
        category={category}
      />
    )
  } else {
    return (
      <MemoListPaginationLong
        baseUrl={baseUrl}
        totalItems={totalItems}
        currentPage={currentPage}
        renderPagerLinkFunc={getMemosListPageLink}
      />
    )
  }
}

export default MemoListPaginationAdapter
