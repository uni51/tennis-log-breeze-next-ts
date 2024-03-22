import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { apiClient } from '@/lib/utils/apiClient'
import { Memo } from '@/types/Memo'
import { useAdminMemoReviewList } from '@/hooks/admin/memos/useAdmiMemoReviewList'
import AdminMemoListPaginationLong from '@/components/admin/Pagination/AdminMemoListPaginationLong'
import AdminMemoCardForList from './templates/AdminMemoCardForList'

type Props = {
  page: number
  category?: number
  tag?: string
}

const AdminMemoReviewList: React.FC<Props> = ({ page, category, tag }: Props) => {
  const { data: memos, isLoading } = useAdminMemoReviewList()

  const handleDisable = (userId?: number) => async (event: React.MouseEvent<HTMLButtonElement>) => {
    // event.preventDefault()
    // // 非同期処理を行う
    // const response = await apiClient.post('/api/admin/users/disable', { userId })
    // console.log(`response: ${response}`)
    // if (response.status === 200 && response.data === 1) {
    //   // ユーザーを削除しましたの後、ユーザー一覧から該当のユーザーを除外
    //   const updatedUsers = users.filter((user) => user.id !== userId)
    //   // 更新後のユーザー一覧をセットする
    //   setUsers(updatedUsers)
    //   toast.success('ユーザーを削除しました')
    // }
  }

  console.log(memos)

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
              baseUrl='/admin/memos/review'
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

export default AdminMemoReviewList
