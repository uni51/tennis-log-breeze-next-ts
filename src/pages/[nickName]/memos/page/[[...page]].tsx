import { AxiosError, AxiosResponse } from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
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

type ReturnType = DataWithPagination<Memo[]>

/* ユーザー毎の公開中の記事一覧ページ TODO: SSR or ISR化 */
const ByNicknameMemoList: NextPage = () => {
  const router = useRouter()
  const { nickName, page } = router.query

  const nickNameTypeCasted = nickName as string | undefined

  const pageNumber = page === undefined ? 1 : Number(page)

  // state定義
  const [memos, setMemos] = useState<ReturnType>()
  const [isLoading, setIsLoading] = useState(true)

  // 初回レンダリング時にAPIリクエスト
  useEffect(() => {
    if (typeof nickNameTypeCasted === 'undefined') return
    const init = async () => {
      apiClient
        .get(`/api/public/${nickName}/memos?page=${pageNumber}`)
        .then((response: AxiosResponse) => {
          console.log(response.data)
          setMemos(response.data)
        })
        .catch((err: AxiosError) => console.log(err.response))
        .finally(() => setIsLoading(false))
      setIsLoading(false)
    }
    init()
  }, [pageNumber])

  if (isLoading) return <Loading />

  const headline = `${nickNameTypeCasted}さんの公開メモ一覧`

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
                <Link href={`/memos/${memo.id}`} key={index}>
                  <SingleMemoBlockForList memo={memo} />
                </Link>
              )
            })}
          </div>
          <Pagination
            totalItems={Number(memos?.meta?.total)}
            currentPage={Number(memos?.meta?.current_page)}
            itemsPerPage={ITEMS_PER_PAGE}
            renderPageLink={'getNicknameMemosListPageLink'}
            nickname={nickNameTypeCasted}
          />
        </div>
      </div>
    </AppLayout>
  )
}

export default ByNicknameMemoList