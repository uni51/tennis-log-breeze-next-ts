import { useErrorBoundary } from 'react-error-boundary'
import AdminMemoListPaginationLong from '@/components/admin/Pagination/AdminMemoListPaginationLong'
import AdminMemoCardForList from './templates/AdminMemoCardForList'
import { useAdminMemoList } from '@/hooks/admin/memos/useAdminMemoList'
import { Memo } from '@/types/Memo'

type Props = {
  page: number
  category?: number
  tag?: string
}

const AdminMemoList: React.FC<Props> = ({ page, category, tag }: Props) => {
  const { showBoundary } = useErrorBoundary()
  const preApiUrl = '/api/admin/memos'
  const { data: memos, error, isLoading } = useAdminMemoList({
    preApiUrl,
    page,
    category,
    tag,
  })

  if (error) {
    showBoundary(error)
  }

  if (isLoading) return <div>Loading...</div>

  if (!memos) {
    return (
      <div className='mx-auto mt-20'>
        <div className='w-1/2 mx-auto text-center'>メモがありません</div>
      </div>
    )
  }

  const renderMemoList = () => {
    return memos?.data?.map((memo: Memo, index: number) => (
      <AdminMemoCardForList
        memo={memo}
        renderMemoDetailLink={`/admin/memos/${memo.user_nickname}/${memo.id}`}
        renderMemoListByCategoryLink={`/admin/memos?category=${memo.category_id}`}
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
            <AdminMemoListPaginationLong
              baseUrl='/admin/memos/'
              totalItems={Number(memos.meta.total)}
              currentPage={Number(memos.meta.current_page)}
              category={category}
              tag={tag}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminMemoList
