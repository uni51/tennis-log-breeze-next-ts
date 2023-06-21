import Link from 'next/link'
import React from 'react'
import usePagination from '@/hooks/usePagination'
import { getNicknameMemosListPageLink, getPublicMemosListPageLink } from '@/lib/pagination-helper'
import { ITEMS_PER_PAGE } from '@/constants/PaginationConst'

export type PaginationProps = {
  totalItems: number
  currentPage: number
  renderPageLink: 'getPublicMemosListPageLink' | 'getNicknameMemosListPageLink'
  itemsPerPage?: number
  nickname?: string
}

export const dotts = '...'

const Pagination = ({
  totalItems,
  currentPage,
  renderPageLink,
  itemsPerPage = ITEMS_PER_PAGE,
  nickname,
}: PaginationProps) => {
  const pages = usePagination(totalItems, currentPage, itemsPerPage)

  if (renderPageLink === 'getNicknameMemosListPageLink' && nickname) {
    return (
      <div className='flex items-center justify-center my-8'>
        {pages.map((pageNumber, i) =>
          pageNumber === dotts ? (
            <span key={i} className='px-4 py-2 rounded-full text-sm font-semibold text-black'>
              {pageNumber}
            </span>
          ) : (
            <Link
              key={i}
              href={getNicknameMemosListPageLink(Number(pageNumber), nickname)}
              className={`${
                pageNumber === currentPage ? 'text-success-dark' : 'text-black'
              } px-4 py-2 mx-1 rounded-full text-sm font-semibold no-underline`}
            >
              {pageNumber}
            </Link>
          ),
        )}
      </div>
    )
  } else {
    return (
      <div className='flex items-center justify-center my-8'>
        {pages.map((pageNumber, i) =>
          pageNumber === dotts ? (
            <span key={i} className='px-4 py-2 rounded-full text-sm font-semibold text-black'>
              {pageNumber}
            </span>
          ) : (
            <Link
              key={i}
              href={getPublicMemosListPageLink(Number(pageNumber))}
              className={`${
                pageNumber === currentPage ? 'text-success-dark' : 'text-black'
              } px-4 py-2 mx-1 rounded-full text-sm font-semibold no-underline`}
            >
              {pageNumber}
            </Link>
          ),
        )}
      </div>
    )
  }
}

export default Pagination
