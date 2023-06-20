import Link from 'next/link'
import React from 'react'
import {
  getPublicMemosListPageLink,
  getDashboardMemosListPageLink,
  getNicknameMemosListPageLink,
} from '@/lib/pagination-helper'

interface Props {
  numberOfPage: number
  tag: string
  nickname?: string
  last_page: number
  current_page: number
  pageLink:
    | 'getPublicMemosListPageLink'
    | 'getDashboardMemosListPageLink'
    | 'getNicknameMemosListPageLink'
}

const Pagination0621 = (props: Props) => {
  const { numberOfPage, tag, nickname, pageLink } = props

  // 取得した総post数
  // const total_count = props.pagination.total_count
  // 1ページあたりの表示件数
  // const limit_value = props.pagination.limit_value
  // 総ページ数
  const total_pages = props.last_page
  // 現在のページ
  const current_page = props.current_page
  // ページネーションの表示リンク数上限（3以上）
  const max_size = 10
  // 実際のページネーションの表示リンク数
  const pagination_size = total_pages > max_size ? max_size : total_pages
  // ページネーションの真ん中の基準ライン
  const center_border = Math.floor(max_size / 2)
  // センター時のスタートのポイント
  const centerd_start_point = current_page - center_border
  // ページネーションの右側の基準ライン
  const right_border = total_pages - center_border + 1
  // 右側時のスタートのポイント
  const righted_start_point = total_pages - pagination_size + 1

  let pages: number[] = []
  // for (let i = 1; i <= numberOfPage; i++) {
  //   pages.push(i)
  // }

  if (current_page <= center_border) {
    for (let i = 1; i <= max_size; i++) {
      pages.push(i)
    }
  }

  if (center_border < current_page && current_page < right_border) {
    //current_pageがcenter_borderより右、right_borderより左にいるとき
    for (let i = centerd_start_point; i <= centerd_start_point + max_size; i++) {
      pages.push(i)
    }
  }

  if (right_border <= current_page) {
    // current_pageがright_borderと同じもしくは右にいるとき
    for (let i = righted_start_point; i < righted_start_point + max_size; i++) {
      pages.push(i)
    }
  }

  return (
    <section className='mb-8 lg:w-1/2 mx-auto rounded-md p-5'>
      <ul className='flex items-center justify-center gap-4'>
        {pages.map((page) => (
          <li className='bg-sky-900 rounded-lg w-6 h-8 relative' key={page}>
            {pageLink === 'getPublicMemosListPageLink' && (
              <Link
                href={getPublicMemosListPageLink(tag, page)}
                className='absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 text-gray-100'
              >
                {page}
              </Link>
            )}
            {pageLink === 'getDashboardMemosListPageLink' && (
              <Link
                href={getDashboardMemosListPageLink(tag, page)}
                className='absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 text-gray-100'
              >
                {page}
              </Link>
            )}
            {pageLink === 'getNicknameMemosListPageLink' && (
              <Link
                href={getNicknameMemosListPageLink(nickname!, tag, page)}
                className='absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 text-gray-100'
              >
                {page}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Pagination0621
