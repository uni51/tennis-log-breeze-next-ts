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

type ReturnType = DataWithPagination<Memo[]>

/* 公開記事のメモ一覧ページ TODO: SSR化 */
const PublicMemoList: NextPage = () => {
  const router = useRouter()

  const { page } = router.query

  const pageNumber = page === undefined ? 1 : Number(page)

  // state定義
  const [memos, setMemos] = useState<ReturnType>()
  const [isLoading, setIsLoading] = useState(true)

  // 初回レンダリング時にAPIリクエスト
  useEffect(() => {
    const init = async () => {
      apiClient
        .get(`/api/public/memos?page=${pageNumber}`)
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

  const headline = '公開中のメモ一覧'

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
            numberOfPage={Number(memos?.meta?.last_page)}
            tag={''}
            pageLink={'getPublicMemosListPageLink'}
          />
        </div>
      </div>
    </AppLayout>
  )
}

export default PublicMemoList
