// hooks/useMemoEdit.ts
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { MemoForm } from '@/types/MemoForm'
import { Tag } from '@/types/memo/Tag'
import { postEditMemo } from '@/features/memos/dashboard/lib/postEditMemo'
import { postEditMemoForModify } from '@/features/memos/dashboard/lib/postEditMemoForModify'
import { Memo } from '@/types/Memo'
import { memoPostSchema } from '@/lib/schema/memoPostSchema'

// 編集中のメモデータを管理するカスタムフック
export const useMemoEdit = (memo: Memo) => {
  // フォームの初期値を設定
  const defaultValues = {
    title: memo.title,
    body: memo.body,
    category_id: String(memo.category_id),
    status: String(memo.status),
    tags: memo.tag_list.tags ?? [],
  }

  // エラーメッセージを管理するステート
  const [errorMessage, setErrorMessage] = useState<string>('')

  // useFormフックを用いてフォーム処理を行う
  const useFormMethods = useForm<MemoForm>({
    defaultValues,
    resolver: zodResolver(memoPostSchema),
    mode: 'onChange',
  })

  // タグのデフォルト値を設定
  const defaultTags = memo.tag_list.tags.map((tag) => ({
    id: tag,
    text: tag,
  }))

  // タグを管理するステート
  const [tags, setTags] = useState<Tag[]>(defaultTags)
  // 本文を管理するステート
  const [body, setBody] = useState(memo.body)

  const {
    setValue,
    formState: { errors },
  } = useFormMethods

  const queryClient = useQueryClient()

  // メモの本文が更新されたときに反映させる
  useEffect(() => {
    setValue('body', memo.body)
  }, [memo.body, setValue])

  // タグの削除処理
  const handleDelete = (i: number) => {
    setTags((prevTags) => {
      const newTags = prevTags.filter((tag, index) => index !== i)
      setValue(
        'tags',
        newTags.map((tag) => tag.text),
      )
      return newTags
    })
  }

  // タグの追加処理
  const handleAddition = (tag: Tag) => {
    setTags([...tags, tag])
    setValue(
      'tags',
      [...tags, tag].map((tag) => tag.text),
    )
  }

  // 本文の変更処理
  const handleBodyChange = (content: string) => {
    setBody(content)
    setValue('body', content, { shouldValidate: true })
  }

  // フォームの送信処理
  const onSubmit = (data: MemoForm) => {
    if (data.status === '4') {
      postEditMemoForModify(data, useFormMethods.setError, memo.id, queryClient)
    } else {
      postEditMemo(data, useFormMethods.setError, memo.id, queryClient)
    }
  }

  // フックから返される各種メソッドとステートをエクスポート
  return {
    useFormMethods,
    tags,
    body,
    errorMessage,
    errors,
    handleDelete,
    handleAddition,
    handleBodyChange,
    onSubmit,
  }
}
