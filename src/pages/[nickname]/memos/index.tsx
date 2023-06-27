import { AxiosResponse } from 'axios'
import Head from 'next/head'
import AppLayout from '@/components/Layouts/AppLayout'
import MemoListPaginationAdapter from '@/components/Pagination/MemoListPaginationAdapter'
import SingleMemoBlockForList from '@/components/templates/SingleMemoBlockForList'
import { getMemosListByCategoryHeadLineTitle } from '@/lib/headline-helper'
import { getMemosListByCategoryPageLink, getMemosListPageLink } from '@/lib/pagination-helper'
import { apiServer } from '@/lib/utils/apiServer'
import { Memo } from '@/types/Memo'
import { DataWithPagination } from '@/types/dataWithPagination'

type ReturnType = DataWithPagination<Memo[]>

//サーバーサイドレンダリング
export async function getServerSideProps(context: {
  query: { nickname: string; category?: string; page?: string }
}) {
  const { nickname, category, page } = context.query

  const categoryNumber = category === undefined ? null : Number(category)
  const pageNumber = page === undefined ? 1 : Number(page)

  const response: ReturnType =
    categoryNumber !== null
      ? await apiServer
          .get(`/api/public/${nickname}/memos/category/${categoryNumber}?page=${pageNumber}`)
          .then((response: AxiosResponse) => {
            return response.data
          })
      : await apiServer
          .get(`/api/public/${nickname}/memos?page=${pageNumber}`)
          .then((response: AxiosResponse) => {
            return response.data
          })

  return {
    props: {
      memos: JSON.stringify(response),
      nickname: nickname,
      category: categoryNumber,
      // page: pageNumber,
    },
  }
}

/* ユーザー毎の公開メモ一覧ページ */
export default function PublicMemoListByNickname(props: {
  memos: string
  nickname: string
  category: number | null
}) {
  // const router = useRouter()
  const { memos, nickname, category } = props

  const memosData = (JSON.parse(memos) as unknown) as ReturnType

  // // state定義
  // const [memos, setMemos] = useState<ReturnType>()
  // const [isLoading, setIsLoading] = useState(true)

  // // 初回レンダリング時にAPIリクエスト
  // useEffect(() => {
  //   if (router.isReady) {
  //     if (typeof nickNameTypeCasted === 'undefined') return
  //     if (categoryNumber === undefined) {
  //       apiClient
  //         .get(`/api/public/${nickNameTypeCasted}/memos?page=${pageNumber}`)
  //         .then((response: AxiosResponse) => {
  //           // console.log(response.data)
  //           setMemos(response.data)
  //         })
  //         .catch((err: AxiosError) => console.log(err.response))
  //         .finally(() => setIsLoading(false))
  //     } else {
  //       apiClient
  //         .get(
  //           `/api/public/${nickNameTypeCasted}/memos/category/${categoryNumber}?page=${pageNumber}`,
  //         )
  //         .then((response: AxiosResponse) => {
  //           // console.log(response.data)
  //           setMemos(response.data)
  //         })
  //         .catch((err: AxiosError) => console.log(err.response))
  //         .finally(() => setIsLoading(false))
  //     }
  //   }
  // }, [nickNameTypeCasted, categoryNumber, pageNumber])

  // if (isLoading) return <Loading />

  const headline = `${nickname}さんの公開中のメモ一覧${getMemosListByCategoryHeadLineTitle(
    category,
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
            {memosData?.data?.map((memo: Memo, index) => {
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
            totalItems={Number(memosData?.meta?.total)}
            currentPage={Number(memosData?.meta?.current_page)}
            renderPagerLinkFunc={
              category === undefined ? getMemosListPageLink : getMemosListByCategoryPageLink
            }
            category={category}
          />
        </div>
      </div>
    </AppLayout>
  )
}
