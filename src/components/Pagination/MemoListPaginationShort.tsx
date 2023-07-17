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

const MemoListPaginationShort = ({
  baseUrl,
  totalItems,
  currentPage,
  itemsPerPage = ITEMS_PER_PAGE,
  category,
  renderPagerLinkFunc,
}: PaginationProps) => {
  const pages = usePagination(totalItems, currentPage, itemsPerPage)
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  return (
    <div className='flex items-center justify-center my-8'>
      {pages.map((pageNumber, i) => {
        if (
          pageNumber !== currentPage &&
          pageNumber !== currentPage - 1 &&
          pageNumber !== currentPage + 1
        ) {
          return <></>
        } else {
          return (
            <Link
              key={i}
              href={getRenderPagerLinkUrl(
                renderPagerLinkFunc,
                baseUrl,
                Number(pageNumber),
                category,
              )}
              className={`${
                pageNumber === currentPage
                  ? `z-10 inline-flex relative items-center px-4 py-2 text-sm font-semibold focus:z-20`
                  : `text-gray-900 md:inline-flex relative items-center px-4 py-2 text-sm font-semibold`
              }`}
            >
              {pageNumber === currentPage - 1 && '< 前へ'}
              {pageNumber === currentPage && `${pageNumber} / ${totalPages}`}
              {pageNumber === currentPage + 1 && '次へ >'}
            </Link>
          )
        }
      })}
    </div>
  )
}

export default MemoListPaginationShort
