import Head from 'next/head'
import { Key } from 'react'
import AppLayout from '@/components/Layouts/AppLayout'
import SingleMemoBlockForList from '@/features/memos/common/components/templates/SingleMemoBlockForList'
import { Memo } from '@/types/Memo'
import getInitialPublishedMemoList from '@/features/memos/published/api/getInitialPublishedMemoList'
import useSWR, { SWRConfig } from 'swr'
import { apiClient } from '@/lib/utils/apiClient'
import PublishedMemoList from '@/features/memos/published/components/PublishedMemoList'

//サーバーサイドレンダリング
export async function getServerSideProps(context: { query: { category?: string; page?: string } }) {
  const { category, page } = context.query

  const categoryNumber = category === undefined ? null : Number(category)
  const pageNumber = page === undefined ? 1 : Number(page)

  const apiUrl = categoryNumber
    ? `/api/public/memos/category/${categoryNumber}?page=${pageNumber}`
    : `/api/public/memos?page=${pageNumber}`

  const initialMemos = await getInitialPublishedMemoList()

  return {
    props: {
      apiUrl: apiUrl,
      fallback: {
        '/api/public/memos': initialMemos,
      },
    },
  }
}

type Props = {
  apiUrl: string
}

/* みんなの公開中のメモ一覧ページ */
export default function PublishedMemoIndex({ apiUrl, fallback }: any) {
  return (
    <>
      <AppLayout
        header={<h2 className='font-semibold text-xl text-gray-800 leading-tight'>{''}</h2>}
      >
        <SWRConfig value={{ fallback }}>
          <PublishedMemoList apiUrl={apiUrl} />
        </SWRConfig>
      </AppLayout>
    </>
  )
}
