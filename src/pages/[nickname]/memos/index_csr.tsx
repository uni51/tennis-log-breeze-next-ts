import { AxiosError, AxiosResponse } from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AppLayout from '@/components/Layouts/AppLayout'
import { Loading } from '@/components/Loading'
import MemoListPaginationAdapter from '@/components/Pagination/MemoListPaginationAdapter'
import SingleMemoBlockForList from '@/features/memos/common/components/templates/SingleMemoBlockForList'
import { getMemosListByCategoryHeadLineTitle } from '@/lib/headline-helper'
import { getMemosListByCategoryPageLink, getMemosListPageLink } from '@/lib/pagination-helper'
import { apiClient } from '@/lib/utils/apiClient'
import { Memo } from '@/types/Memo'
import { DataWithPagination } from '@/types/dataWithPagination'

type ReturnType = DataWithPagination<Memo[]>

/* ユーザー毎の公開メモ一覧ページ */
const PublicMemoListByNickname_CSR: NextPage = () => {
  const router = useRouter()

  const { nickname, category, page } = router.query

  const nickNameTypeCasted = nickname as string | undefined
  const categoryId = category === undefined ? undefined : Number(category)
  const pageNumber = page === undefined ? 1 : Number(page)

  // state定義
  const [memos, setMemos] = useState<ReturnType>()
  const [isLoading, setIsLoading] = useState(true)

  // 初回レンダリング時にAPIリクエスト
  useEffect(() => {
    if (router.isReady) {
      if (typeof nickNameTypeCasted === 'undefined') return
      if (categoryId === undefined) {
        apiClient
          .get(`/api/public/${nickNameTypeCasted}/memos?page=${pageNumber}`)
          .then((response: AxiosResponse) => {
            // console.log(response.data)
            setMemos(response.data)
          })
          .catch((err: AxiosError) => console.log(err.response))
          .finally(() => setIsLoading(false))
      } else {
        apiClient
          .get(`/api/public/${nickNameTypeCasted}/memos/category/${categoryId}?page=${pageNumber}`)
          .then((response: AxiosResponse) => {
            // console.log(response.data)
            setMemos(response.data)
          })
          .catch((err: AxiosError) => console.log(err.response))
          .finally(() => setIsLoading(false))
      }
    }
  }, [nickNameTypeCasted, categoryId, pageNumber])

  if (isLoading) return <Loading />

  const headline = `${nickNameTypeCasted}さんの公開中のメモ一覧${getMemosListByCategoryHeadLineTitle(
    categoryId,
  )}`

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
                  renderMemoDetailLink={`/${memo.user_nickname}/memos/${memo.id}`}
                  renderMemoListByCategoryLink={`/${memo.user_nickname}/memos?category=${memo.category_id}`}
                  renderMemoListByNickNameLink={`/${memo.user_nickname}/memos/`}
                  key={index}
                />
              )
            })}
          </div>
          <MemoListPaginationAdapter
            baseUrl={`/${nickname}/memos`}
            totalItems={Number(memos?.meta?.total)}
            currentPage={Number(memos?.meta?.current_page)}
            renderPagerLinkFunc={
              categoryId === undefined ? getMemosListPageLink : getMemosListByCategoryPageLink
            }
            category={categoryId}
          />
        </div>
      </div>
    </AppLayout>
  )
}

export default PublicMemoListByNickname_CSR
