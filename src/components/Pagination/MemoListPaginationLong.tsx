import Link from 'next/link'
import React from 'react'
import { DOTS_STRING, ITEMS_PER_PAGE } from '@/constants/PaginationConst'
import usePagination from '@/hooks/usePagination'
import { RenderPagerLinkFuncType, getRenderPagerLinkUrl } from '@/lib/pagination-helper'

export type PaginationProps = {
  baseUrl: string
  totalItems: number
  currentPage: number
  itemsPerPage?: number
  category?: number | null
  renderPagerLinkFunc: RenderPagerLinkFuncType
}

const MemoListPaginationLong = ({
  baseUrl,
  totalItems,
  currentPage,
  itemsPerPage = ITEMS_PER_PAGE,
  category,
  renderPagerLinkFunc,
}: PaginationProps) => {
  const pages = usePagination(totalItems, currentPage, itemsPerPage)
  const totalPage = Math.ceil(totalItems / itemsPerPage)

  return (
    <div className='flex items-center justify-center my-8'>
      {currentPage - 1 >= 1 && (
        <Link
          href={getRenderPagerLinkUrl(
            renderPagerLinkFunc,
            baseUrl,
            Number(currentPage - 1),
            category,
          )}
        >
          &lt; 前へ
        </Link>
      )}
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
      {currentPage < totalPage && (
        <Link
          href={getRenderPagerLinkUrl(
            renderPagerLinkFunc,
            baseUrl,
            Number(currentPage + 1),
            category,
          )}
        >
          次へ &gt;
        </Link>
      )}
    </div>
  )
}

export default MemoListPaginationLong
