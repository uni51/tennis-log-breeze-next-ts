import Link from 'next/link'
import React from 'react'
import usePagination from '@/hooks/usePagination'
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
    | getDashboardMemosListByCategoryPageLinkType
  itemsPerPage?: number
  nickname?: string
  category?: number
}

export const dotts = '...'

const Pagination = ({
  totalItems,
  currentPage,
  renderPagerLink,
  itemsPerPage = ITEMS_PER_PAGE,
  nickname,
  category,
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
              href={getNicknameMemosListPageLink(Number(pageNumber), nickname)}
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
              href={getNicknameMemosListByCategoryPageLink(Number(pageNumber), nickname, category)}
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
    // マイページ（Dashboard）の記事一覧ページで、カテゴリーでの絞り込みが行われていない場合
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
              href={getDashboardMemosListPageLink(Number(pageNumber))}
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
    // マイページ（Dashboard）の記事一覧ページで、カテゴリーでの絞り込みが行われている場合
  } else if (renderPagerLink === getDashboardMemosListByCategoryPageLink && category) {
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
              href={getDashboardMemosListByCategoryPageLink(Number(pageNumber), category)}
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
              href={getPublicMemosListByCategoryPageLink(Number(pageNumber), category)}
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
