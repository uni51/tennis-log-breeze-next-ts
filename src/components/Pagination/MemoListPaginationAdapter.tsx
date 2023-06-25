import {
  getPublicMemosListPageLink,
  getPublicMemosListPageLinkType,
  getPublicMemosListByCategoryPageLink,
  getPublicMemosListByCategoryPageLinkType,
  getNicknameMemosListPageLink,
  getNicknameMemosListPageLinkType,
  getNicknameMemosListByCategoryPageLink,
  getNicknameMemosListByCategoryPageLinkType,
  getDashboardMemosListPageLink,
  getDashboardMemosListPageLinkType,
  getDashboardMemosListByCategoryPageLink,
  getDashboardMemosListByCategoryPageLinkType,
} from '@/lib/pagination-helper'
import MemoListPagination from '@/components/Pagination/MemoListPagination'

export type PaginationProps = {
  baseUrl: string
  totalItems: number
  currentPage: number
  renderPagerLink:
    | getPublicMemosListPageLinkType
    | getPublicMemosListByCategoryPageLinkType
    | getNicknameMemosListPageLinkType
    | getNicknameMemosListByCategoryPageLinkType
    | getDashboardMemosListPageLinkType
    | getDashboardMemosListByCategoryPageLinkType
  category?: number
}

const MemoListPaginationAdapter = ({
  baseUrl,
  totalItems,
  currentPage,
  renderPagerLink,
  category,
}: PaginationProps) => {
  // ユーザー毎の記事一覧ページで、カテゴリーでの絞り込みが行われていない場合
  if (renderPagerLink === getNicknameMemosListPageLink) {
    return (
      <MemoListPagination
        baseUrl={baseUrl}
        totalItems={totalItems}
        currentPage={currentPage}
        renderPagerLinkFc={getNicknameMemosListPageLink}
      />
    )
    // ユーザー毎の記事一覧ページで、カテゴリーでの絞り込みが行われている場合
  } else if (renderPagerLink === getNicknameMemosListByCategoryPageLink && category) {
    return (
      <MemoListPagination
        baseUrl={baseUrl}
        totalItems={totalItems}
        currentPage={currentPage}
        renderPagerLinkFc={getNicknameMemosListByCategoryPageLink}
        category={category}
      />
    )
    // マイページ（Dashboard）の記事一覧ページで、カテゴリーでの絞り込みが行われていない場合
  } else if (renderPagerLink === getDashboardMemosListPageLink) {
    return (
      <MemoListPagination
        baseUrl={baseUrl}
        totalItems={totalItems}
        currentPage={currentPage}
        renderPagerLinkFc={getDashboardMemosListPageLink}
      />
    )
    // マイページ（Dashboard）の記事一覧ページで、カテゴリーでの絞り込みが行われている場合
  } else if (renderPagerLink === getDashboardMemosListByCategoryPageLink && category) {
    return (
      <MemoListPagination
        baseUrl={baseUrl}
        totalItems={totalItems}
        currentPage={currentPage}
        renderPagerLinkFc={getDashboardMemosListByCategoryPageLink}
        category={category}
      />
    )
    // みんなの記事一覧ページで、カテゴリーでの絞り込みが行われている場合
  } else if (renderPagerLink === getPublicMemosListByCategoryPageLink && category) {
    return (
      <MemoListPagination
        baseUrl={baseUrl}
        totalItems={totalItems}
        currentPage={currentPage}
        renderPagerLinkFc={getPublicMemosListByCategoryPageLink}
        category={category}
      />
    )
    // みんなの記事一覧ページで、カテゴリーでの絞り込みが行われていない場合
  } else {
    return (
      <MemoListPagination
        baseUrl={baseUrl}
        totalItems={totalItems}
        currentPage={currentPage}
        renderPagerLinkFc={getPublicMemosListPageLink}
      />
    )
  }
}

export default MemoListPaginationAdapter
