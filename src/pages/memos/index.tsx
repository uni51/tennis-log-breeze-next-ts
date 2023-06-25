import { AxiosError, AxiosResponse } from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Key, useEffect, useState } from 'react'
import AppLayout from '@/components/Layouts/AppLayout'
import { Loading } from '@/components/Loading'
import MemoListPaginationAdapter from '@/components/Pagination/MemoListPaginationAdapter'
import SingleMemoBlockForList from '@/components/templates/SingleMemoBlockForList'
import { apiClient } from '@/lib/utils/apiClient'
import { Memo } from '@/types/Memo'
import { DataWithPagination } from '@/types/dataWithPagination'
import { getMemosListByCategoryPageLink, getMemosListPageLink } from '@/lib/pagination-helper'
import { getMemosListByCategoryHeadLineTitle } from '@/lib/headline-helper'
import { apiServer } from '@/lib/utils/apiServer'

type ReturnType = DataWithPagination<Memo[]>

//サーバーサイドレンダリング
export async function getServerSideProps(context: { query: { category?: string; page?: string } }) {
  const { category, page } = context.query

  const categoryNumber = category === undefined ? null : Number(category)
  const pageNumber = page === undefined ? 1 : Number(page)

  const response: ReturnType =
    categoryNumber !== null
      ? await apiServer
          .get(`/api/public/memos/category/${categoryNumber}?page=${pageNumber}`)
          .then((response: AxiosResponse) => {
            return response.data
          })
      : await apiServer
          .get(`/api/public/memos?page=${pageNumber}`)
          .then((response: AxiosResponse) => {
            return response.data
          })

  return {
    props: {
      memos: JSON.stringify(response),
      category: categoryNumber,
      // page: pageNumber,
    },
  }
}

/* みんなの公開中のメモ一覧ページ TODO: SSR or ISR化 */
export default function PublicMemoList(props: { memos: string; category: number | null }) {
  // const router = useRouter()

  const { memos, category } = props

  const memosData = (JSON.parse(memos) as unknown) as ReturnType

  // state定義
  // const [memos, setMemos] = useState<ReturnType>()
  // const [isLoading, setIsLoading] = useState(true)

  // // 初回レンダリング時にAPIリクエスト
  // useEffect(() => {
  //   const init = async () => {
  //     if (categoryNumber === undefined) {
  //       apiClient
  //         .get(`/api/public/memos?page=${pageNumber}`)
  //         .then((response: AxiosResponse) => {
  //           // console.log(response.data)
  //           setMemos(response.data)
  //         })
  //         .catch((err: AxiosError) => console.log(err.response))
  //         .finally(() => setIsLoading(false))
  //     } else {
  //       apiClient
  //         .get(`/api/public/memos/category/${categoryNumber}?page=${pageNumber}`)
  //         .then((response: AxiosResponse) => {
  //           // console.log(response.data)
  //           setMemos(response.data)
  //         })
  //         .catch((err: AxiosError) => console.log(err.response))
  //         .finally(() => setIsLoading(false))
  //     }
  //     setIsLoading(false)
  //   }
  //   init()
  // }, [categoryNumber, pageNumber])

  // if (isLoading) return <Loading />

  const headline = `みんなの公開中のメモ一覧${getMemosListByCategoryHeadLineTitle(category)}`

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
            {memosData?.data?.map((memo: Memo, index: Key | null | undefined) => {
              return (
                <SingleMemoBlockForList
                  memo={memo}
                  renderMemoDetailLink={`/${memo.user_nickname}/memos/${memo.id}`}
                  renderMemoListByCategoryLink={`/memos?category=${memo.category_id}`}
                  renderMemoListByNickNameLink={`/${memo.user_nickname}/memos/`}
                  key={index}
                />
              )
            })}
          </div>
          <MemoListPaginationAdapter
            baseUrl={'/memos/'}
            totalItems={Number(memosData?.meta?.total)}
            currentPage={Number(memosData?.meta?.current_page)}
            renderPagerLinkFunc={
              category === null ? getMemosListPageLink : getMemosListByCategoryPageLink
            }
            category={category}
          />
        </div>
      </div>
    </AppLayout>
  )
}
