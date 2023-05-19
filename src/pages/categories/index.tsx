import { AxiosError, AxiosResponse } from 'axios'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Loading } from '@/components/Loading'
import { apiClient } from '@/lib/utils/apiClient'

type Category = {
  name: string
}

const CatgeoryList: NextPage = () => {
  const router = useRouter()
  // state定義
  const [categories, setCatgeories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // 初回レンダリング時にAPIリクエスト
  useEffect(() => {
    const init = async () => {
      apiClient
        .get('/categories')
        .then((response: AxiosResponse) => {
          console.log(response.data)
          setCatgeories(response.data.data)
        })
        .catch((err: AxiosError) => console.log(err.response))
        .finally(() => setIsLoading(false))
    }
    init()
  }, [])

  if (isLoading) return <Loading />

  return (
    <div className='mx-auto mt-32'>
      <div className='w-1/2 mx-auto text-center'></div>
      <div className='mt-3'>
        {/* DBから取得したメモデータの一覧表示 */}
        <div className='grid w-4/5 mx-auto gap-4 grid-cols-2'>
          {categories.map((category: Category, index) => {
            return (
              <div className='bg-gray-100 shadow-lg mb-5 p-4' key={index}>
                <p className='text-lg font-bold mb-1'>{category.name}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default CatgeoryList
