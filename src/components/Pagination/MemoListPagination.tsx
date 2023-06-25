import Link from 'next/link'
import React from 'react'
import usePagination from '@/hooks/usePagination'
import { RenderPagerLinkFuncType, getRenderPagerLinkUrl } from '@/lib/pagination-helper'
import { DOTS_STRING, ITEMS_PER_PAGE } from '@/constants/PaginationConst'

export type PaginationProps = {
  baseUrl: string
  totalItems: number
  currentPage: number
  renderPagerLinkFunc: RenderPagerLinkFuncType
  itemsPerPage?: number
  category?: number
  nickname?: string
}

const MemoListPagination = ({
  baseUrl,
  totalItems,
  currentPage,
  renderPagerLinkFunc,
  itemsPerPage = ITEMS_PER_PAGE,
  category,
}: PaginationProps) => {
  const pages = usePagination(totalItems, currentPage, itemsPerPage)

  return (
    <div className='flex items-center justify-center my-8'>
      {pages.map((pageNumber, i) =>
        pageNumber === DOTS_STRING ? (
          <span key={i} className='px-4 py-2 rounded-full text-sm font-semibold text-black'>
            {pageNumber}
          </span>
        ) : (
          <Link
            key={i}
            href={getRenderPagerLinkUrl(renderPagerLinkFunc, baseUrl, Number(pageNumber), category)}
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
    </div>
  )
}

export default MemoListPagination
