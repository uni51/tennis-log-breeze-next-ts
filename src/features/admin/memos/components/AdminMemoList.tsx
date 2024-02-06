import Link from 'next/link'
import { useErrorBoundary } from 'react-error-boundary'
import ClipLoader from 'react-spinners/ClipLoader'
import AdminMemoListPaginationLong from '@/components/admin/Pagination/AdminMemoListPaginationLong'
import { useAdminMemoList } from '@/hooks/admin/memos/useAdminMemoList'
import { createPagerLink } from '@/lib/pagination-helper'

type Props = {
  page: number
  category?: number
}

const AdminMemoList: React.FC<Props> = ({ page, category }: Props) => {
  const { showBoundary } = useErrorBoundary()
  const preApiUrl = '/api/admin/memos'
  const { data: memos, error, isLoading } = useAdminMemoList({
    preApiUrl,
    page,
    category,
  })

  console.log('memos', memos)

  if (error) {
    showBoundary(error)
  }

  // const { data: memos, isLoading } = useAdminMemoList()

  if (isLoading) return <div>Loading...</div>

  if (!memos) {
    return (
      <div className='mx-auto mt-20'>
        <div className='w-1/2 mx-auto text-center'>
          <ClipLoader />
        </div>
      </div>
    )
  }

  return (
    <div className='px-4 sm:px-6 lg:px-8'>
      <div className='sm:flex sm:items-center'>
        <div className='sm:flex-auto'>
          <h1 className='text-base font-semibold leading-6 text-gray-900'>memos</h1>
          <p className='mt-2 text-sm text-gray-700'>
            A list of all the memos in your account including their name, title, email and role.
          </p>
        </div>
        <div className='mt-4 sm:ml-16 sm:mt-0 sm:flex-none'>
          <button
            type='button'
            className='block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          >
            Add memo
          </button>
        </div>
      </div>
      <div className='mt-8 flow-root'>
        <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
            <table className='min-w-full divide-y divide-gray-300'>
              <thead>
                <tr>
                  <th
                    scope='col'
                    className='whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0'
                  >
                    ID
                  </th>
                  <th
                    scope='col'
                    className='whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900'
                  >
                    title
                  </th>
                  <th
                    scope='col'
                    className='whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900'
                  >
                    nickname
                  </th>
                  <th
                    scope='col'
                    className='whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900'
                  >
                    カテゴリー
                  </th>
                  <th
                    scope='col'
                    className='whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900'
                  >
                    ステータス
                  </th>
                  <th
                    scope='col'
                    className='whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900'
                  >
                    最終更新日時
                  </th>
                  <th scope='col' className='relative whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-0'>
                    <span className='sr-only'>Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200 bg-white'>
                {memos &&
                  memos.data.map((memo) => (
                    <tr key={memo.id}>
                      <td className='whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0'>
                        {memo.id}
                      </td>
                      <td className='whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900'>
                        {memo.title.substring(0, 15)}...
                      </td>
                      <td className='whitespace-nowrap px-2 py-2 text-sm text-gray-500'>
                        {memo.user_nickname.substring(0, 10)}
                      </td>
                      <td className='whitespace-nowrap px-2 py-2 text-sm text-gray-900'>
                        {memo.category_name}
                      </td>
                      <td className='whitespace-nowrap px-2 py-2 text-sm text-gray-500'>
                        {memo.status === 0 && '下書き'}
                        {memo.status === 1 && '公開中'}
                        {memo.status === 2 && 'シェア'}
                        {memo.status === 3 && '非公開'}
                      </td>
                      <td className='whitespace-nowrap px-2 py-2 text-sm text-gray-500'>
                        {memo.updated_at}
                      </td>
                      <td className='relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-0'>
                        <Link
                          href={`/admin/memos/${memo.id}`}
                          className='text-indigo-600 hover:text-indigo-900'
                        >
                          詳細
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className='hidden sm:hidden md:block lg:block xl:block'>
            <AdminMemoListPaginationLong
              baseUrl='/admin/memos/'
              totalItems={Number(memos.meta.total)}
              currentPage={Number(memos.meta.current_page)}
              category={category}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminMemoList
