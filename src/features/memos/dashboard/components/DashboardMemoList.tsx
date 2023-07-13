import SingleMemoBlockForList from '@/components/templates/SingleMemoBlockForList'
import { Memo } from '@/types/Memo'
import { useErrorBoundary } from 'react-error-boundary'
import { getDashBoardMemoList } from '../api/getDashBoardMemos'

const DashboardMemoList = () => {
  const { showBoundary } = useErrorBoundary()
  const { data: memos, error } = getDashBoardMemoList()

  if (error) showBoundary(error)

  if (!memos) return <div>Loading...</div>

  return (
    <div className='mt-3'>
      {/* DBから取得したメモデータの一覧表示 */}
      <div className='grid w-4/5 mx-auto gap-16 lg:grid-cols-2'>
        {memos?.data?.map((memo: Memo, index) => {
          return (
            <SingleMemoBlockForList
              memo={memo}
              renderMemoDetailLink={`/dashboard/memos/${memo.id}`}
              renderMemoListByCategoryLink={`/dashboard/memos?category=${memo.category_id}`}
              renderMemoListByNickNameLink={`/dashboard/memos/`}
              key={index}
            />
          )
        })}
      </div>
    </div>
  )
}

export default DashboardMemoList
