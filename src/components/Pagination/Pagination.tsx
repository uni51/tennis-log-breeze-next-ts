import Link from 'next/link'
import React from 'react'
import usePagination from '@/hooks/usePagination'
import {
  getDashboardMemosListPageLink,
  getDashboardMemosListPageLinkType,
  getNicknameMemosListPageLink,
  getNicknameMemosListPageLinkType,
  getNicknameMemosListByCategoryPageLink,
  getNicknameMemosListByCategoryPageLinkType,
  getPublicMemosListByCategoryPageLink,
  getPublicMemosListByCategoryPageLinkType,
  getPublicMemosListPageLink,
  getPublicMemosListPageLinkType,
} from '@/lib/pagination-helper'
import { ITEMS_PER_PAGE } from '@/constants/PaginationConst'

export type PaginationProps = {
  totalItems: number
  currentPage: number
  renderPagerLink:
    | getPublicMemosListPageLinkType
    | getPublicMemosListByCategoryPageLinkType
    | getNicknameMemosListPageLinkType
    | getNicknameMemosListByCategoryPageLinkType
    | getDashboardMemosListPageLinkType
  itemsPerPage?: number
  nickname?: string
  category?: number
  tag?: string
}

export const dotts = '...'

const Pagination = ({
  totalItems,
  currentPage,
  renderPagerLink,
  itemsPerPage = ITEMS_PER_PAGE,
  nickname,
  category,
  tag,
}: PaginationProps) => {
  const pages = usePagination(totalItems, currentPage, itemsPerPage)

  // ユーザー毎の記事一覧ページで、カテゴリーでの絞り込みが行われていない場合
  if (renderPagerLink === getNicknameMemosListPageLink && nickname) {
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
              href={getNicknameMemosListPageLink(nickname, Number(pageNumber))}
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
    // ユーザー毎の記事一覧ページで、カテゴリーでの絞り込みが行われている場合
  } else if (renderPagerLink === getNicknameMemosListByCategoryPageLink && nickname && category) {
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
              href={getNicknameMemosListByCategoryPageLink(nickname, category, Number(pageNumber))}
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
    // みんなの記事一覧ページで、カテゴリーでの絞り込みが行われている場合
  } else if (renderPagerLink === getPublicMemosListByCategoryPageLink && category) {
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
              href={getPublicMemosListByCategoryPageLink(category, Number(pageNumber))}
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
  } else if (renderPagerLink === getDashboardMemosListPageLink) {
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
              href={getDashboardMemosListPageLink(Number(pageNumber), tag)}
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
    // みんなの記事一覧ページで、カテゴリーでの絞り込みが行われていない場合
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
}

export default Pagination
