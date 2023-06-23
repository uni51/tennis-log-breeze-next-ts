import React from 'react'
import { AxiosError, AxiosResponse } from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AppLayout from '@/components/Layouts/AppLayout'
import { Loading } from '@/components/Loading'
import Pagination from '@/components/Pagination/Pagination'
import SingleMemoBlockForList from '@/components/templates/SingleMemoBlockForList'
import { apiClient } from '@/lib/utils/apiClient'
import { Memo } from '@/types/Memo'
import { DataWithPagination } from '@/types/dataWithPagination'
import { ITEMS_PER_PAGE } from '@/constants/PaginationConst'
import {
  getPublicMemosListByCategoryPageLink,
  getPublicMemosListPageLink,
} from '@/lib/pagination-helper'
import { getPublicMemosListByCategoryHeadLineTitle } from '@/lib/headline-helper'

type ReturnType = DataWithPagination<Memo[]>

/* 公開記事のメモ一覧ページ TODO: SSR or ISR化 */
const PublicMemoListByCategory: NextPage = () => {
  const router = useRouter()
  const { categoryId, page } = router.query

  const pageNumber = page === undefined ? 1 : Number(page)
  const categoryNumber = categoryId === undefined ? 1 : Number(categoryId)

  // state定義
  const [memos, setMemos] = useState<ReturnType>()
  const [isLoading, setIsLoading] = useState(true)

  // 初回レンダリング時にAPIリクエスト
  useEffect(() => {
    const init = async () => {
      apiClient
        .get(`/api/public/memos/category/${categoryNumber}?page=${pageNumber}`)
        .then((response: AxiosResponse) => {
          // console.log(response.data)
          setMemos(response.data)
        })
        .catch((err: AxiosError) => console.log(err.response))
        .finally(() => setIsLoading(false))
      setIsLoading(false)
    }
    init()
  }, [categoryNumber, pageNumber])

  if (isLoading) return <Loading />

  const headline = getPublicMemosListByCategoryHeadLineTitle(categoryNumber)

  // const headline = '公開中のメモ一覧'

  return (
    <AppLayout
      header={<h2 className='font-semibold text-xl text-gray-800 leading-tight'>{headline}</h2>}
    >
      <Head>
        <title>{headline}</title>
      </Head>
      <div className='mx-auto mt-32'>
        <div className='mt-3'>
          {/* DBから取得したメモデータの一覧表示 */}
          <div className='grid w-4/5 mx-auto gap-16 grid-cols-2'>
            {memos?.data?.map((memo: Memo, index) => {
              return (
                <SingleMemoBlockForList
                  memo={memo}
                  renderMemoDetailLink={`/memos/${memo.id}`}
                  key={index}
                />
              )
            })}
          </div>
          <Pagination
            totalItems={Number(memos?.meta?.total)}
            currentPage={Number(memos?.meta?.current_page)}
            itemsPerPage={ITEMS_PER_PAGE}
            renderPagerLink={getPublicMemosListByCategoryPageLink}
            categoryNumber={categoryNumber}
          />
        </div>
      </div>
    </AppLayout>
  )
}

export default PublicMemoListByCategory
