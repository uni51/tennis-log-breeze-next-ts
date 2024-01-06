import { useAdminUserList } from '@/hooks/admin/users/useAdminUserList'
import { apiClient } from '@/lib/utils/apiClient'
import { useEffect, useState } from 'react'
import { simpleUser } from '@/types/User'
import { toast } from 'react-toastify'

const UserList = () => {
  const [users, setUsers] = useState<simpleUser[]>([])
  const { data: initialUsers, isLoading } = useAdminUserList()

  useEffect(() => {
    if (initialUsers) {
      setUsers(initialUsers)
    }
  }, [initialUsers])

  const handleDisable = (userId?: number) => async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    // 非同期処理を行う
    const response = await apiClient.post('/api/admin/users/disable', { userId })
    console.log(`response: ${response}`)

    if (response.status === 200 && response.data === 1) {
      // ユーザーを削除しましたの後、ユーザー一覧から該当のユーザーを除外
      const updatedUsers = users.filter((user) => user.id !== userId)
      // 更新後のユーザー一覧をセットする
      setUsers(updatedUsers)
      toast.success('ユーザーを削除しました')
    }
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <div className='px-4 sm:px-6 lg:px-8'>
      <div className='sm:flex sm:items-center'>
        <div className='sm:flex-auto'>
          <h1 className='text-base font-semibold leading-6 text-gray-900'>Users</h1>
          <p className='mt-2 text-sm text-gray-700'>
            A list of all the users in your account including their name, title, email and role.
          </p>
        </div>
        <div className='mt-4 sm:ml-16 sm:mt-0 sm:flex-none'>
          <button
            type='button'
            className='block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          >
            Add user
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
                    user ID
                  </th>
                  <th
                    scope='col'
                    className='whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900'
                  >
                    firebase_uid
                  </th>
                  <th
                    scope='col'
                    className='whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900'
                  >
                    name
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
                    email
                  </th>
                  <th
                    scope='col'
                    className='whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900'
                  >
                    最終ログイン日時
                  </th>
                  <th scope='col' className='relative whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-0'>
                    <span className='sr-only'>Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200 bg-white'>
                {users &&
                  users.map((user) => (
                    <tr key={user.id}>
                      <td className='whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0'>
                        {user.id}
                      </td>
                      <td className='whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900'>
                        {user.firebase_uid}
                      </td>
                      <td className='whitespace-nowrap px-2 py-2 text-sm text-gray-900'>
                        {user.name}
                      </td>
                      <td className='whitespace-nowrap px-2 py-2 text-sm text-gray-500'>
                        {user.nickname}
                      </td>
                      <td className='whitespace-nowrap px-2 py-2 text-sm text-gray-500'>
                        {user.email}
                      </td>
                      <td className='whitespace-nowrap px-2 py-2 text-sm text-gray-500'>---</td>
                      <td className='relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-0'>
                        <button
                          className='text-indigo-600 hover:text-indigo-900'
                          onClick={handleDisable(user.id)}
                        >
                          Disable
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserList
