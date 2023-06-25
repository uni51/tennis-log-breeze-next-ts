import {
  getMemosListPageLink,
  getMemosListPageLinkType,
  getMemosListByCategoryPageLinkType,
  getMemosListByCategoryPageLink,
} from '@/lib/pagination-helper'
import MemoListPagination from '@/components/Pagination/MemoListPagination'

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
      <MemoListPagination
        baseUrl={baseUrl}
        totalItems={totalItems}
        currentPage={currentPage}
        renderPagerLinkFunc={getMemosListByCategoryPageLink}
        category={category}
      />
    )
  } else {
    return (
      <MemoListPagination
        baseUrl={baseUrl}
        totalItems={totalItems}
        currentPage={currentPage}
        renderPagerLinkFunc={getMemosListPageLink}
      />
    )
  }
}

export default MemoListPaginationAdapter
