import Link from 'next/link'
import React from 'react'
import { DOTS_STRING, ITEMS_PER_PAGE } from '@/constants/admin/AdminPaginationConst'
import usePagination from '@/hooks/usePagination'
import { createPagerLink, RenderPagerLinkFuncType } from '@/lib/pagination-helper'

export type PaginationProps = {
  baseUrl: string
  totalItems: number
  currentPage: number
  itemsPerPage?: number
  category?: number
  tag?: string
}

const AdminMemoListPaginationLong = ({
  baseUrl,
  totalItems,
  currentPage,
  itemsPerPage = ITEMS_PER_PAGE,
  category,
  tag,
}: PaginationProps) => {
  const pages = usePagination(totalItems, currentPage, itemsPerPage)
  const totalPage = Math.ceil(totalItems / itemsPerPage)

  const createLink = (page: number) => {
    const pagerLink = createPagerLink(baseUrl, page, category, tag)
    return `${pagerLink.pathname}?${new URLSearchParams(pagerLink.query).toString()}`
  }

  return (
    <div className='flex items-center justify-center my-8'>
      {currentPage - 1 >= 1 && <Link href={createLink(currentPage - 1)}>&lt; 前へ</Link>}
      {pages.map((pageNumber, i) =>
        pageNumber === DOTS_STRING ? (
          <span key={i} className='px-4 py-2 rounded-full text-sm font-semibold text-black'>
            {pageNumber}
          </span>
        ) : (
          <Link
            key={i}
            href={createLink(Number(pageNumber))}
            className={`${
              pageNumber === currentPage
                ? `z-10 inline-flex bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`
                : `hidden text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0 md:inline-flex`
            } relative items-center px-4 py-2 text-sm font-semibold focus:z-20`}
          >
            {pageNumber || '-'}
          </Link>
        ),
      )}
      {currentPage < totalPage && <Link href={createLink(currentPage + 1)}>次へ &gt;</Link>}
    </div>
  )
}

export default AdminMemoListPaginationLong
