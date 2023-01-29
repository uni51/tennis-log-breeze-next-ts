import AppLayout from '../../components/Layouts/AppLayout'
import Head from 'next/head'
import { AxiosError, AxiosResponse } from 'axios'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useState } from 'react'
import { RequiredMark } from '../../components/RequiredMark'
import { useAuth } from '../../hooks/useAuth'
import axios from '../../lib/axios'

// POSTデータの型
type MemoForm = {
  title: string
  body: string
  category_id: any
}

// バリデーションメッセージの型
type Validation = {
  title?: string
  body?: string
  category_id?: string
}

const Post: NextPage = () => {
  // ルーター定義
  const router = useRouter()
  // state定義
  const [memoForm, setMemoForm] = useState<MemoForm>({
    title: '',
    body: '',
    category_id: '1', // 初期値はフォアハンド
  })
  const [validation, setValidation] = useState<Validation>({})
  const { checkLoggedIn } = useAuth()
  const [category, setCategory] = useState([])

  // // React-Hook-Form
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<MemoForm>()

  // const category = [
  //   { category_id: '1', category_name: 'フォアハンド' },
  //   { category_id: '2', category_name: 'バックハンド' },
  //   { category_id: '3', category_name: 'サーブ' },
  //   { category_id: '4', category_name: 'リターン' },
  //   { category_id: '5', category_name: 'ボレー' },
  //   { category_id: '6', category_name: 'スマッシュ' },
  //   { category_id: '7', category_name: 'ゲーム' },
  //   { category_id: '8', category_name: 'その他' },
  // ]

  useEffect(() => {
    const init = async () => {
      // ログイン中か判定
      const res: boolean = await checkLoggedIn()
      if (!res) {
        router.push('/')
      }
      const responseCategories = await axios.get('api/categories')
      const objectResponseCategories = responseCategories.data.data
      const arrayResponseCategories = Object.keys(objectResponseCategories).map(
        function (key) {
          return objectResponseCategories[key]
        },
      )
      setCategory(arrayResponseCategories)
    }
    init()
  }, [])

  // POSTデータの更新
  const updateMemoForm = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setMemoForm({ ...memoForm, [e.target.name]: e.target.value })
  }

  // メモの登録
  const createMemo = () => {
    // バリデーションメッセージの初期化
    setValidation({})

    axios
      // CSRF保護の初期化
      .get('/sanctum/csrf-cookie')
      .then(res => {
        // APIへのリクエスト
        axios
          .post('/api/memos', memoForm)
          .then((response: AxiosResponse) => {
            console.log(response.data)
            router.push('/memos')
          })
          .catch((err: AxiosError) => {
            // バリデーションエラー
            if (err.response?.status === 422) {
              const errors = err.response?.data.errors
              // state更新用のオブジェクトを別で定義
              const validationMessages: {
                [index: string]: string
              } = {} as Validation
              Object.keys(errors).map((key: string) => {
                validationMessages[key] = errors[key][0]
              })
              // state更新用オブジェクトに更新
              setValidation(validationMessages)
            }
            if (err.response?.status === 500) {
              alert('システムエラーです！！')
            }
          })
      })
  }

  return (
    <AppLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Dashboard - メモの登録
        </h2>
      }>
      <Head>
        <title>Dashboard - メモの登録</title>
      </Head>
      <div className="w-2/3 mx-auto">
        <div className="w-1/2 mx-auto mt-32 border-2 px-12 py-16 rounded-2xl">
          <h3 className="mb-10 text-2xl text-center">メモの登録</h3>
          <div className="mb-5">
            <div className="flex justify-start my-2">
              <p>タイトル</p>
              <RequiredMark />
            </div>
            <input
              className="p-2 border rounded-md w-full outline-none"
              name="title"
              value={memoForm.title}
              onChange={updateMemoForm}
            />
            {validation.title && (
              <p className="py-3 text-red-500">{validation.title}</p>
            )}
          </div>
          <div className="mb-5">
            <div className="flex justify-start my-2">
              <p>メモの内容</p>
              <RequiredMark />
            </div>
            <textarea
              className="p-2 border rounded-md w-full outline-none"
              name="body"
              cols={30}
              rows={4}
              value={memoForm.body}
              onChange={updateMemoForm}
            />
            {validation.body && (
              <p className="py-3 text-red-500">{validation.body}</p>
            )}
          </div>
          <select name="category_id" onChange={updateMemoForm}>
            {category.map((item, i) => (
              <option value={item.id} key={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <div className="text-center">
            <button
              className="bg-gray-700 text-gray-50 py-3 sm:px-20 px-10 mt-8 rounded-xl cursor-pointer drop-shadow-md hover:bg-gray-600"
              onClick={createMemo}>
              登録する
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default Post
