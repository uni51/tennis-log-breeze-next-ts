import { Memo } from '@/types/Memo'
import AdminMemoCardForList from './templates/AdminMemoCardForList'
import SimplePaginationLong from '@/components/Pagination/SimplePaginationLong'
import { useAdminMemoList } from '@/hooks/admin/memos/useAdminMemoList'
import { useErrorBoundary } from 'react-error-boundary'

type Props = {
  page: number
  category?: number
  tag?: string
}

const AdminMemoFixList: React.FC<Props> = ({ page, category }: Props) => {
  const { showBoundary } = useErrorBoundary()
  const preApiUrl = '/api/admin/memos/waiting_fix'
  const { data: memos, error, isLoading } = useAdminMemoList({
    preApiUrl,
    page,
  })

  if (error) {
    showBoundary(error)
  }

  if (isLoading) return <div>Loading...</div>

  console.log('memos', memos)

  if (memos?.data.length === 0) {
    return (
      <div className='mx-auto mt-20'>
        <div className='w-1/2 mx-auto text-center'>管理者レビュー待ちのメモはありません</div>
      </div>
    )
  }

  const renderMemoList = () => {
    return memos?.data?.map((memo: Memo, index: number) => (
      <AdminMemoCardForList
        memo={memo}
        renderMemoDetailLink={`/admin/memos/${memo.user_nickname}/${memo.id}`}
        renderMemoListByNickNameLink={`/admin/memos/${memo.user_nickname}`}
        renderMemoListByTagLink={
          category ? `/admin/memos?category=${memo.category_id}&tag=` : `/admin/memos?tag=`
        }
        key={index}
      />
    ))
  }

  return (
    <div className='mx-auto mt-20'>
      <div className='mt-8 flow-root'>
        <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='grid w-4/5 mx-auto gap-16 lg:grid-cols-2'>{renderMemoList()}</div>
          <div className='hidden sm:hidden md:block lg:block xl:block'>
            <SimplePaginationLong
              baseUrl={`/admin/memos/waiting_fix`}
              totalItems={Number(memos?.meta?.total)}
              currentPage={Number(memos?.meta?.current_page)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminMemoFixList
