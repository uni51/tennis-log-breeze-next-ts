import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AppLayout from '@/components/Layouts/AppLayout'
import NickNameMemoDetail from '@/features/memos/nickname/components/NickNameMemoDetail'
import { Memo } from '@/types/Memo'
import { Loading } from '@/components/Loading'
import { ErrorBoundary } from 'react-error-boundary'
import { onError } from '@/lib/error-helper'
import { CsrErrorFallback } from '@/components/functional/error/csr/errorFallBack/CsrErrorFallBack'

/* ユーザー毎の公開中のメモ詳細ページ */
const MemoByNickNameDetail: NextPage<Memo> = () => {
  const router = useRouter()
  const { nickname, id, category, tag } = router.query
  const [apiUrl, setApiUrl] = useState('')
  const [titleText, setTitleText] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const categoryId = category === undefined ? null : Number(category)

  useEffect(() => {
    // Fetch用URL組み立て
    if (router.isReady) {
      const apiUri = `api/public/${nickname}/memos/${id}`
      setApiUrl(apiUri)
    }
    setIsLoading(false)
  }, [router.isReady])

  if (isLoading) return <Loading />

  const headline = `${nickname}さんの公開メモ詳細`

  return (
    <>
      <Head>
        <title>{titleText}</title>
      </Head>
      <AppLayout
        header={<h2 className='font-semibold text-xl text-gray-800 leading-tight'>{headline}</h2>}
      >
        <ErrorBoundary FallbackComponent={CsrErrorFallback} onError={onError}>
          <NickNameMemoDetail
            apiUrl={apiUrl}
            nickname={nickname as string}
            setTitleText={setTitleText}
            categoryId={categoryId}
          />
        </ErrorBoundary>
      </AppLayout>
    </>
  )
}

export default MemoByNickNameDetail
